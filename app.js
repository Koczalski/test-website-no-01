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

// DOMコンテンツが読み込まれたら初期化処理を実行
document.addEventListener('DOMContentLoaded', () => {
  initializeNavToggle();
});

