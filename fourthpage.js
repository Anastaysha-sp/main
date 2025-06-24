document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    initMap();
    
    // Обработка формы
    const contactForm = document.getElementById('comment-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Здесь можно добавить AJAX-запрос для отправки формы
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Очистка формы (для демонстрации)
                contactForm.reset();
                
                // Через 5 секунд снова показываем форму
                setTimeout(function() {
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Функция валидации формы
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('comment-name');
        const email = document.getElementById('comment-email');
        const message = document.getElementById('comment-text');
        
        // Валидация имени
        if (name.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Пожалуйста, введите ваше имя';
            name.classList.add('error');
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = '';
            name.classList.remove('error');
        }
        
        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('email-error').textContent = 'Пожалуйста, введите корректный email';
            email.classList.add('error');
            isValid = false;
        } else {
            document.getElementById('email-error').textContent = '';
            email.classList.remove('error');
        }
        
        // Валидация сообщения
        if (message.value.trim() === '') {
            document.getElementById('message-error').textContent = 'Пожалуйста, введите ваше сообщение';
            message.classList.add('error');
            isValid = false;
        } else {
            document.getElementById('message-error').textContent = '';
            message.classList.remove('error');
        }
        
        return isValid;
    }
    
    // Инициализация Яндекс.Карты
    function initMap() {
        ymaps.ready(function() {
            const map = new ymaps.Map('map', {
                center: [55.76, 37.64], // Координаты Москвы
                zoom: 12
            });
            
            // Добавляем метку
            const placemark = new ymaps.Placemark([55.76, 37.64], {
                hintContent: 'Just Swim',
                balloonContent: 'ул. Пушкина, д. 36'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40]
            });
            
            map.geoObjects.add(placemark);
            
            // Добавляем элементы управления
            map.controls.remove('geolocationControl');
            map.controls.remove('searchControl');
            map.controls.remove('trafficControl');
            map.controls.remove('typeSelector');
            map.controls.remove('fullscreenControl');
            map.controls.remove('rulerControl');
        });
    }
});