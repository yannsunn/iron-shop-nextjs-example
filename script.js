// スムーズスクロール機能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// お問い合わせフォームの処理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.submit-button');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 簡単なバリデーション
            if (!name || !email || !message) {
                showMessage('すべての項目を入力してください。', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('有効なメールアドレスを入力してください。', 'error');
                return;
            }
            
            // 送信中の状態表示
            submitButton.disabled = true;
            submitButton.textContent = '送信中...';
            
            // 実際の送信処理（ここではダミー）
            setTimeout(() => {
                showMessage('お問い合わせありがとうございます。後日担当者からご連絡いたします。', 'success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = '送信する';
            }, 1500);
        });
    }
});

// メールアドレス形式チェック
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// メッセージ表示機能
function showMessage(message, type) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 新しいメッセージを作成
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // フォームの前に挿入
    const contactForm = document.querySelector('.contact-form');
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // 3秒後に自動削除
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// ナビゲーションのアクティブ状態管理
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 購入ボタンのクリック処理
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            alert(`${productName}（${productPrice}）のお問い合わせを承ります。\n\nお問い合わせフォームからご連絡ください。`);
            
            // お問い合わせセクションにスクロール
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});