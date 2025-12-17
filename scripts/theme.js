// === ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ===

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const body = document.body;
    
    // Получаем сохраненную тему из localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    
    // Применяем сохраненную тему
    applyTheme(savedTheme);
    updateToggleButton(savedTheme);
    
    // Обработчик клика на кнопку переключения
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
            const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
            
            applyTheme(newTheme);
            updateToggleButton(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

/**
 * Применяет тему к странице
 * @param {string} theme - 'dark-theme' или 'light-theme'
 */
function applyTheme(theme) {
    const body = document.body;
    
    body.classList.remove('dark-theme', 'light-theme');
    
    if (theme === 'light-theme') {
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
    }
}

/**
 * Обновляет иконку кнопки переключения
 * @param {string} theme - текущая тема
 */
function updateToggleButton(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (theme === 'light-theme') {
            themeToggle.innerHTML = '🌙'; // Луна для переключения на темную тему
            themeToggle.setAttribute('title', 'Переключиться на темную тему');
        } else {
            themeToggle.innerHTML = '☀️'; // Солнце для переключения на светлую тему
            themeToggle.setAttribute('title', 'Переключиться на светлую тему');
        }
    }
}

// Поддержка системного предпочтения темы
function initSystemThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    // Если тема не была сохранена, проверяем системное предпочтение
    if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('theme', 'dark-theme');
    }
}

// Инициализируем системное предпочтение при загрузке
initSystemThemePreference();
