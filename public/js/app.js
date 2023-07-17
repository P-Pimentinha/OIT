const API_ENDPOINT = '/api/v1/auth';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');

  const registerForm = document.getElementById('registerForm');
  const registerName = document.getElementById('registerName');
  const registerEmail = document.getElementById('registerEmail');
  const registerPassword = document.getElementById('registerPassword');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    loginUser(email, password);
  });

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    registerUser(name, email, password);
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
      // Handle errors here (e.g., display an error message).

      console.log(error.code);
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
      console.error('Registration failed:', error);
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
