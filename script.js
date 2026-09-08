const toggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'dark') document.body.classList.add('dark');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
