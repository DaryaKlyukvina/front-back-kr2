// Функция для скачивания портфолио
function downloadPortfolio() {
    const btn = event.target;
    const originalText = btn.innerHTML;
    
    // Показываем состояние загрузки
    btn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Загрузка...';
    btn.disabled = true;
    
    try {
        const fileUrl = '../assets/portfolio.pdf';
        const fileName = 'Портфолио_Лихтина_Дарья.pdf';
        
        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showDownloadNotification('success', 'Портфолио начинает скачиваться!');
        
    } catch (error) {
        showDownloadNotification('error', 'Ошибка при скачивании файла');
        console.error('Download error:', error);
    } finally {
        // Восстанавливаем кнопку через 2 секунды
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

// Функция для показа уведомлений
function showDownloadNotification(type, message) {
    const icon = type === 'success' ? 
        'bi-check-circle-fill text-success' : 
        'bi-exclamation-circle-fill text-danger';
    
    const borderColor = type === 'success' ? 
        'var(--success-color)' : 
        'var(--accent-color)';
    
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${icon} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--dark-color);
        color: var(--text-color);
        padding: 15px 20px;
        border-radius: 8px;
        border-left: 4px solid ${borderColor};
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 4 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

//CSS анимации для уведомлений
function initDownloadStyles() {
    if (!document.getElementById('download-styles')) {
        const style = document.createElement('style');
        style.id = 'download-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                font-weight: 500;
            }
            
            /* Стили для состояния загрузки кнопки */
            .download-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .download-btn.loading {
                position: relative;
                color: transparent;
            }
            
            .download-btn.loading::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                top: 50%;
                left: 50%;
                margin: -10px 0 0 -10px;
                border: 2px solid transparent;
                border-top: 2px solid var(--text-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initDownloadStyles();
});