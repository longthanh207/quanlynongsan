const loginForm = document.getElementById('loginForm');
const quickfillButtons = document.querySelectorAll('[data-quickfill]');
const searchRedirectBtn = document.getElementById('searchRedirect');

quickfillButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const emailField = document.getElementById('email');
    emailField.value = btn.dataset.quickfill || '';
    emailField.focus();
  });
});

searchRedirectBtn?.addEventListener('click', () => {
  window.location.href = 'search.html';
});

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // Chuyển hướng nông dân sang trang Dashboard (index.html)
  window.location.href = 'index.html';
});
