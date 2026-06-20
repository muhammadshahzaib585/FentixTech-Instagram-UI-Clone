document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const updateIcon = () => {
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleBtns.forEach(btn => {
            const icon = btn.tagName === 'I' ? btn : btn.querySelector('i.ph-moon, i.ph-sun');
            if (icon) {
                if (isDark) {
                    icon.classList.replace('ph-moon', 'ph-sun');
                } else {
                    icon.classList.replace('ph-sun', 'ph-moon');
                }
            }
        });
    };

    updateIcon();

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('dark-theme');
            let theme = 'light';
            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
            updateIcon();
        });
    });

    // 2. Like Toggle Logic
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const isLiked = this.classList.contains('ph-fill');
            const likesCountElem = this.closest('.post, .reel-action-item')?.querySelector('.likes-count');
            let currentLikes = likesCountElem ? parseInt(likesCountElem.textContent.replace(/,/g, '')) : 0;

            if (isLiked) {
                this.classList.remove('ph-fill');
                this.classList.add('ph');
                this.style.color = '';
                currentLikes--;
            } else {
                this.classList.remove('ph');
                this.classList.add('ph-fill');
                this.style.color = '#ed4956'; // Instagram red
                currentLikes++;
            }
            if (likesCountElem) {
                likesCountElem.textContent = currentLikes.toLocaleString();
            }
        });
    });

    // 3. Comment Box Logic
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('.comment-input');
            const commentText = input.value.trim();
            if (commentText) {
                const commentSection = this.closest('.post').querySelector('.post-comments-list');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `<strong>muhammadshahzaib</strong> ${commentText}`;
                commentSection.appendChild(newComment);
                input.value = '';
            }
        });
    });

    // 4. Create Modal Logic
    const createModalHTML = `
        <div class="modal-overlay" id="createModal">
            <div class="create-modal">
                <div class="modal-header">
                    Create new post
                    <i class="ph ph-x modal-close" id="closeModal"></i>
                </div>
                <div class="modal-body">
                    <i class="ph ph-images" style="font-size: 80px;"></i>
                    <h2>Drag photos and videos here</h2>
                    <button>Select from computer</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', createModalHTML);
    const createModal = document.getElementById('createModal');
    const closeModal = document.getElementById('closeModal');
    const createBtns = document.querySelectorAll('.create-btn');

    createBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            createModal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        createModal.classList.remove('active');
    });

    createModal.addEventListener('click', (e) => {
        if (e.target === createModal) {
            createModal.classList.remove('active');
        }
    });

    // 5. Messages Chat Logic
    const chatForm = document.getElementById('chatForm');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const message = input.value.trim();
            if (message) {
                const chatMessages = document.querySelector('.chat-messages');
                const newBubble = document.createElement('div');
                newBubble.className = 'chat-bubble sent';
                newBubble.textContent = message;
                chatMessages.appendChild(newBubble);
                input.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    }

    // 6. Prevent default for dummy links (only # links without specific classes)
    const dummyLinks = document.querySelectorAll('a[href="#"]:not(.theme-toggle):not(.create-btn)');
    dummyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});
