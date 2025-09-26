/**
 * ナビゲーションメニューの開閉を制御します。
 */
const initializeNavToggle = () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('#global-nav-list');

  if (!navToggle || !navList) {
    console.error('Navigation elements not found.');
    return;
  }

  const toggleNav = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    
    // トランスフォームを使ってメニューを表示/非表示
    navList.style.transform = isExpanded ? 'translateX(100%)' : 'translateX(0%)';
    
    // メニューが開いているときは背景をスクロールさせない
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  };

  navToggle.addEventListener('click', toggleNav);

  // メニュー内のリンクをクリックしたときにメニューを閉じる
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle.getAttribute('aria-expanded') === 'true') {
        toggleNav();
      }
    });
  });
};

/**
 * お問い合わせフォームの送信を非同期で処理します。
 */
const initializeContactForm = () => {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form || !status) {
        // お問い合わせフォームがないページでは何もしない
        return;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        status.innerText = '送信中...';
        status.style.color = 'var(--color-text)';

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerText = "お問い合わせありがとうございます。メッセージは正常に送信されました。";
                status.style.color = 'var(--color-primary-dark)';
                form.reset();
            } else {
                 const responseData = await response.json();
                 if (Object.prototype.hasOwnProperty.call(responseData, 'errors')) {
                    status.innerText = responseData.errors.map(error => error.message).join(", ");
                 } else {
                    status.innerText = "エラーが発生しました。メッセージを送信できませんでした。";
                 }
                 status.style.color = 'var(--color-error)';
            }
        } catch (error) {
            status.innerText = "エラーが発生しました。メッセージを送信できませんでした。";
            status.style.color = 'var(--color-error)';
        }
    }
    
    form.addEventListener("submit", handleSubmit);
};


// DOMコンテンツが読み込まれたらすべての初期化処理を実行
document.addEventListener('DOMContentLoaded', () => {
  initializeNavToggle();
  initializeContactForm();
});

