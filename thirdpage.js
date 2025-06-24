document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно для просмотра изображений (как в предыдущем коде)
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.48)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.flexDirection = 'column';
    modal.style.cursor = 'zoom-out';
    
    const modalImg = document.createElement('img');
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.objectFit = 'contain';
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '30px';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '35px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    function openModal(imgSrc) {
        modalImg.src = imgSrc;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    modal.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    const slideImages = document.querySelectorAll('.wrapper .slide img');
    slideImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(this.src);
        });
    });

    // Работа с комментариями
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    
    // Загрузка комментариев из localStorage при загрузке страницы
    function loadComments() {
        const savedComments = localStorage.getItem('comments');
        if (savedComments) {
            commentsList.innerHTML = savedComments;
            // Добавляем обработчики событий для кнопок удаления
            addDeleteHandlers();
        }
    }
    
    // Сохранение комментариев в localStorage
    function saveComments() {
        localStorage.setItem('comments', commentsList.innerHTML);
    }
    
    // Добавление обработчиков событий для кнопок удаления
    function addDeleteHandlers() {
        document.querySelectorAll('.delete-comment').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const comment = this.closest('.comment');
                comment.remove();
                saveComments();
            });
        });
    }
    
    // Инициализация при загрузке страницы
    if (commentForm && commentsList) {
        loadComments();
        
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('comment-name').value.trim();
            const text = document.getElementById('comment-text').value.trim();
            
            if (name && text) {
                const now = new Date();
                const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
                
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                
                commentDiv.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${name}</span>
                        <span class="comment-date">${dateStr}</span>
                        <button class="delete-comment" style="
                            background: #ff6b6b;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            padding: 2px 8px;
                            cursor: pointer;
                            margin-left: 10px;
                        ">Удалить</button>
                    </div>
                    <div class="comment-text">${text}</div>
                `;
                
                commentsList.prepend(commentDiv);
                commentForm.reset();
                
                // Добавляем обработчик для новой кнопки удаления
                commentDiv.querySelector('.delete-comment').addEventListener('click', function(e) {
                    e.stopPropagation();
                    commentDiv.remove();
                    saveComments();
                });
                
                saveComments();
            }
        });
    }
});