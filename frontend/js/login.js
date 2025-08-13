const loginForm = document.getElementById('loginForm');
const token = localStorage.getItem("token")
if (token) {
  Swal.fire('Error', 'user already regestered log out first', 'error');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
  
}
loginForm.addEventListener('submit',  function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  if (!email) {
    return Swal.fire('Error', 'Email is required.', 'error');
  }
  if (!validateEmail(email)) {
    return Swal.fire('Error', 'Please enter a valid email address.', 'error');
  }
  if (!password) {
    return Swal.fire('Error', 'Password is required.', 'error');
  }

    // Replace URL with your backend login endpoint
    axios.post('http://localhost:2005/api/v1/users/login', {
      email,
      password,
    }).then(res=>{
        console.log(res.data)
    Swal.fire('Success', 'Logged in successfully!', 'success').then(() => {
       loginForm.reset();
      const token = res.data.token;
      localStorage.setItem('token', token);
      window.location.href = 'index.html'; // Change as needed
    })
    }).catch(err=>{
         console.log(err);
         
            Swal.fire('Error',err.response.message, 'error');
    })
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}