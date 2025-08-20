// Simple form handler for demo (shows a success message)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      success.textContent = "Thank you for contacting us! We'll get back to you soon.";
      success.style.display = 'block';
      form.reset();
      setTimeout(() => {
        success.style.display = 'none';
      }, 4000);
    });
  }
});