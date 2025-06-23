
    document.addEventListener('DOMContentLoaded', function() {
        const nextBtn = document.querySelector('.slider-button.next');
        const prevBtn = document.querySelector('.slider-button.prev');
        const radioInputs = document.querySelectorAll('input[name="slider"]');
        let currentIndex = 0;
        
        // Функция для переключения слайда
        function goToSlide(index) {
            radioInputs[index].checked = true;
            currentIndex = index;
        }
        
        // Следующий слайд
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % radioInputs.length;
            goToSlide(currentIndex);
        });
        
        // Предыдущий слайд
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + radioInputs.length) % radioInputs.length;
            goToSlide(currentIndex);
        });
        
        // Автоматическое перелистывание
        let slideInterval = setInterval(function() {
            nextBtn.click();
        }, 5000);
        
        // Остановка авто-перелистывания при наведении
        const slider = document.querySelector('.image-slider');
        slider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                nextBtn.click();
            }, 5000);
        });
    });

// Анимация при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Функция для обработки появления элементов
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach((element, index) => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
                
                // Добавляем задержку для последовательного появления
                if (index % 2 === 0) {
                    element.classList.add(`delay-${(index % 4) + 1}`);
                }
            }
        });
    }

    // Запускаем при загрузке
    handleScrollAnimation();
    
    // И при прокрутке
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Также можно добавить для resize, так как размер окна может измениться
    window.addEventListener('resize', handleScrollAnimation);
});