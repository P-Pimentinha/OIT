const API_ENDPOINT = '/api/v1/auth';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  //   const loadButton = document.getElementById('loadProtectedPage');

  const registerForm = document.getElementById('registerForm');
  const registerName = document.getElementById('registerName');
  const registerEmail = document.getElementById('registerEmail');
  const registerPassword = document.getElementById('registerPassword');

  //   loadButton.addEventListener('click', loadProtectedPage);

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
      // Handle the successful response here (e.g., show a success message or save the token).
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      console.log('Login successful!', response.data);

      axios
        .get(`/timer`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        })
        .then((response) => {
          document.open();
          document.write(response.data);
          document.close();
        })
        .catch((error) => {
          console.error('Error fetching protected page:', error);
        });
    })
    .catch((error) => {
      // Handle errors here (e.g., display an error message).
      console.error('Login failed:', error);
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
      // Handle the successful response here (e.g., show a success message or redirect to the login page).
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      // console.log('Registration successful!', response.data);

      axios
        .get(`/timer`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        })
        .then((response) => {
          document.open();
          document.write(response.data);
          document.close();
        })
        .catch((error) => {
          console.error('Error fetching protected page:', error);
        });
    })
    .catch((error) => {
      // Handle errors here (e.g., display an error message).
      console.error('Registration failed:', error);
    });
}

// // Function to handle the click event on the link
// function handleTimerLinkClick(event) {
//   event.preventDefault(); // Prevent the default link behavior (navigating to the href)
//   const token = 'Bearer ' + localStorage.getItem('token');
//   axios.defaults.headers.common['Authorization'] = token;

//   // Fetch the /timer endpoint with the Bearer token in the Authorization header
//   axios
//     .get('/timer')
//     .then((response) => {})
//     .catch((error) => {
//       console.error('Error fetching /timer:', error);
//     });
// }

function loadProtectedPage() {
  const token = localStorage.getItem('token');

  axios
    .get(`/timer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      document.open();
      document.write(response.data);
      document.close();
    })
    .catch((error) => {
      console.error('Error fetching protected page:', error);
    });
}
