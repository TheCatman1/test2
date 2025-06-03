// Применяем тему сразу при загрузке скрипта (до DOMContentLoaded)
(function applyThemeImmediately() {
  // Проверяем сохраненную тему или системные настройки
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
})();

// Основная функция инициализации темы
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  // Получаем текущую тему (уже установленную в data-theme)
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  // Устанавливаем правильную иконку
  const updateIcon = () => {
    themeIcon.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  };
  updateIcon();
  
  // Обработчик клика с анимацией
  themeToggle.addEventListener('click', () => {
    // Добавляем класс для плавного перехода
    document.body.classList.add('theme-transition');
    
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    
    // Меняем тему
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
    
    // Убираем класс после завершения анимации
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  });
  
  // Следим за изменением системных настроек
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) { // Только если пользователь не выбирал тему вручную
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateIcon();
    }
  });
}

// Инициализация после полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Плавно показываем контент
  document.body.style.opacity = '1';
  initTheme();
});

// Для переключения языка (если нужно)
document.querySelectorAll('.language-option, .language-switcher select').forEach(element => {
  element.addEventListener('click', function(e) {
    if (this.tagName === 'SELECT') return;
    
    e.preventDefault();
    document.body.style.opacity = '0';
    
    setTimeout(() => {
      window.location.href = this.href || this.value;
    }, 300);
  });
});