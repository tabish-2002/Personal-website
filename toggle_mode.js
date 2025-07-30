// theme-toggle.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
    toggleBtn.textContent = savedTheme === 'dark-mode' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    const newTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    toggleBtn.textContent = newTheme === 'dark-mode' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    localStorage.setItem('theme', newTheme);
  });
});
