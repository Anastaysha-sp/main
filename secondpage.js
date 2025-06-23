document.addEventListener('DOMContentLoaded', () => {
    const trainersContainer = document.getElementById('trainersContainer');
    const searchInput = document.getElementById('searchInput');
    const sortButtons = document.querySelectorAll('.sort-btn');
    const pageButtons = document.querySelectorAll('.page-btn');
    
    // Сохраняем все карточки тренеров
    let allTrainers = Array.from(trainersContainer.children);
    const trainersPerPage = 3;
    let currentPage = 1;
    let filteredTrainers = [...allTrainers]; // Копия для фильтрации
    
    // Функция для отображения карточек на текущей странице
    function showPage(page) {
        const startIndex = (page - 1) * trainersPerPage;
        const endIndex = startIndex + trainersPerPage;
        
        // Сначала скрываем все карточки
        allTrainers.forEach(trainer => {
            trainer.style.display = 'none';
        });
        
        // Показываем только карточки для текущей страницы из отфильтрованного списка
        const visibleTrainers = filteredTrainers.slice(startIndex, endIndex);
        visibleTrainers.forEach(trainer => {
            trainer.style.display = '';
        });
        
        // Обновляем активную кнопку пагинации
        pageButtons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.dataset.page) === page) {
                button.classList.add('active');
            }
        });
        
        currentPage = page;
        
        // Обновляем видимость кнопок пагинации
        updatePaginationButtons();
    }
    
    // Обновление видимости кнопок пагинации
    function updatePaginationButtons() {
        const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);
        pageButtons.forEach(button => {
            const pageNum = parseInt(button.dataset.page);
            button.style.display = pageNum <= totalPages ? 'block' : 'none';
        });
    }
    
    // Инициализация - показываем первую страницу
    showPage(1);
    
    // Обработчики событий для кнопок пагинации
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.dataset.page);
            showPage(page);
        });
    });

    // Функция сортировки
    function sortTrainers(criteria) {
        filteredTrainers.sort((a, b) => {
            if (criteria === 'name') {
                return a.dataset.name.localeCompare(b.dataset.name, 'ru', { sensitivity: 'base' });
            } else if (criteria === 'experience' || criteria === 'rating') {
                return parseFloat(b.dataset[criteria]) - parseFloat(a.dataset[criteria]);
            }
            return 0;
        });

        // Очищаем контейнер и добавляем отсортированные элементы
        trainersContainer.innerHTML = '';
        filteredTrainers.forEach(trainer => trainersContainer.appendChild(trainer));
        
        // Показываем текущую страницу после сортировки
        showPage(1);
    }

    // Функция фильтрации по поиску
    function filterTrainers() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            // Если поиск пустой, показываем все карточки
            filteredTrainers = [...allTrainers];
        } else {
            // Фильтруем карточки по запросу
            filteredTrainers = allTrainers.filter(trainer => {
                const name = trainer.dataset.name.toLowerCase();
                return name.includes(query);
            });
        }
        
        // Обновляем контейнер с отфильтрованными карточками
        trainersContainer.innerHTML = '';
        filteredTrainers.forEach(trainer => trainersContainer.appendChild(trainer));
        
        // Показываем первую страницу после фильтрации
        showPage(1);
    }

    // Обработчики событий для кнопок сортировки
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const criteria = button.dataset.sort;
            sortTrainers(criteria);
        });
    });

    // Обработчик события для поиска
    searchInput.addEventListener('input', filterTrainers);
});