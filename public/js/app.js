const API_ENDPOINT = '/api/v1/auth';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const registerForm = document.getElementById('registerForm');
  const registerName = document.getElementById('registerName');
  const registerEmail = document.getElementById('registerEmail');
  const registerPassword = document.getElementById('registerPassword');
  const registerOption = document.getElementById('registerOption');
  const loginOption = document.getElementById('loginOption');

  let test = localStorage.getItem('token');

  if (localStorage.getItem('token')) {
    axios
      .get(`/timer`, {
        headers: {
          Authorization: `Bearer ${test}`,
        },
      })
      .then((res) => {
        document.open();
        document.write(res.data);
        document.close();
      })
      .catch((error) => {
        console.error('Error fetching protected page:', error);
      });
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    loginUser(email, password);
  });

  // registerForm.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   const name = registerName.value;
  //   const email = registerEmail.value;
  //   const password = registerPassword.value;
  //   registerUser(name, email, password);
  // });

  registerOption.addEventListener('click', (event) => {
    loginOption.removeAttribute('hidden', '');
    registerForm.removeAttribute('hidden', '');

    registerOption.setAttribute('hidden', '');
    loginForm.setAttribute('hidden', '');
  });

  loginOption.addEventListener('click', (event) => {
    loginOption.setAttribute('hidden', '');
    registerForm.setAttribute('hidden', '');

    registerOption.removeAttribute('hidden', '');
    loginForm.removeAttribute('hidden', '');
  });
});

function loginUser(email, password) {
  // Make a POST request to the server to login the user using Axios.
  axios
    .post(API_ENDPOINT + '/login', {
      email: email,
      password: password,
    })
    .then((response) => {
      // saves the response to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      timerPageLoad(response);
    })
    .catch((error) => {
      const errorMessage = document.getElementById('errorMessage');
      if (error.request.status === 401) {
        erreMessage('Incorrect Email or Password');
      } else {
        erreMessage('Try again later.');
      }
    });
}

function registerUser(name, email, password) {
  // Make a POST request to the server to register the user using Axios.
  axios
    .post(API_ENDPOINT + '/register', {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => {
      // saves the response to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      timerPageLoad(response);
    })
    .catch((error) => {
      erreMessage('Something went wrong.');
    });
}

function timerPageLoad(res) {
  axios
    .get(`/timer`, {
      headers: {
        Authorization: `Bearer ${res.data.token}`,
      },
    })
    .then((res) => {
      document.open();
      document.write(res.data);
      document.close();
    })
    .catch((error) => {
      console.error('Error fetching protected page:', error);
    });
}

function erreMessage(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.removeAttribute('hidden', '');
  errorMessage.innerText = message;
  setTimeout(function () {
    errorMessage.setAttribute('hidden', '');
  }, 4000);
}
