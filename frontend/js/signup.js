const form = document.getElementById('signupForm');
const token = localStorage.getItem("token")
if (token) {
  Swal.fire('Error', 'user already regestered log out first', 'error');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
  
}

form.addEventListener('submit',function (e) {
  e.preventDefault();

  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!username) {
    return Swal.fire('Error', 'Username is required.', 'error');
  }
  if (!email) {
    return Swal.fire('Error', 'Email is required.', 'error');
  }
  if (!validateEmail(email)) {
    return Swal.fire('Error', 'Please enter a valid email address.', 'error');
  }
  if (!password) {
    return Swal.fire('Error', 'Password is required.', 'error');
  }
  if (password.length < 12) {
    return Swal.fire(
      'Error',
      'Password must be at least 12 characters long.',
      'error'
    );
  }

  axios.post('http://localhost:2005/api/v1/users/signup', {
      username,
      email,
      password,
    }).then(
    res=>{
    console.log(res.data)
    Swal.fire('Success', 'Signed up successfully!', 'success').then(() => {
      form.reset();
      window.location.href = 'login.html';
    });
        }).catch(err=>{
            console.log(err);
            Swal.fire('Error', err.message , 'error');
        })
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}