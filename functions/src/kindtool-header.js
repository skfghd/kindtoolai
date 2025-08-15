// KindTool AI 공통 헤더 스크립트
(function() {
  'use strict';
  
  // 중복 실행 방지
  if (window.kindToolHeaderLoaded) {
    return;
  }
  window.kindToolHeaderLoaded = true;

  // 헤더 HTML 및 스타일 정의
  const headerHTML = `
    <div class="kindtool-header-container">
      <header class="kindtool-header">
        <div class="kindtool-nav">
          <div class="kindtool-logo">
            <a href="https://kindtool.ai/" class="kindtool-logo-link">
              <img src="https://kindtool.ai/kindtoolai-logo.png" alt="KINDTOOLAI" class="kindtool-logo-img">
            </a>
          </div>
          
          <nav class="kindtool-nav-desktop">
            <a href="https://kindtool.ai/" class="kindtool-nav-item">🏠 홈</a>
            <a href="https://kindtool.ai/about" class="kindtool-nav-item">ℹ️ 사이트소개</a>
            <div class="kindtool-dropdown">
              <button class="kindtool-dropdown-btn">🔧 도구들 ▼</button>
              <div class="kindtool-dropdown-content">
                <a href="https://teto-vs-egen-hongeunlee.replit.app/" class="kindtool-dropdown-item">👥 테토vs에겐 성향분석</a>
                <a href="https://threelinepoem.replit.app/" class="kindtool-dropdown-item">✏️ 삼행시 만들기</a>
                <a href="https://mandalat-canvas.replit.app/" class="kindtool-dropdown-item">⚏ 만다라트 캔버스</a>
                <a href="https://catch-up-meeting-hongeunlee.replit.app/" class="kindtool-dropdown-item">📹 캐치업 미팅 MBTI</a>
                <a href="https://whattheymeant.replit.app/" class="kindtool-dropdown-item">🎨 속뜻 번역기</a>
                <a href="https://feeltoon.replit.app/" class="kindtool-dropdown-item">📖 Tales of Me</a>
              </div>
            </div>
            <a href="https://kindtool.ai/contact" class="kindtool-nav-item">💬 Q & A</a>
          </nav>
          
          <button class="kindtool-mobile-menu-btn" id="kindToolMobileMenuBtn">☰</button>
        </div>
        
        <nav class="kindtool-nav-mobile" id="kindToolMobileNav">
          <a href="https://kindtool.ai/" class="kindtool-nav-item-mobile">🏠 홈</a>
          <a href="https://kindtool.ai/about" class="kindtool-nav-item-mobile">ℹ️ 사이트소개</a>
          <div class="kindtool-mobile-section">
            <div class="kindtool-mobile-section-title">🔧 도구들</div>
            <a href="https://teto-vs-egen-hongeunlee.replit.app/" class="kindtool-nav-item-mobile kindtool-indent">👥 테토vs에겐 성향분석</a>
            <a href="https://threelinepoem.replit.app/" class="kindtool-nav-item-mobile kindtool-indent">✏️ 삼행시 만들기</a>
            <a href="https://mandalat-canvas.replit.app/" class="kindtool-nav-item-mobile kindtool-indent">⚏ 만다라트 캔버스</a>
            <a href="https://catch-up-meeting-hongeunlee.replit.app/" class="kindtool-nav-item-mobile kindtool-indent">📹 캐치업 미팅 MBTI</a>
            <a href="https://whattheymeant.replit.app/" class="kindtool-nav-item-mobile kindtool-indent">🎨 속뜻 번역기</a>
            <a href="https://feeltoon.replit.app/" class="kindtool-nav-item-mobile kindtool-indent">📖 Tales of Me</a>
          </div>
          <a href="https://kindtool.ai/contact" class="kindtool-nav-item-mobile">💬 Q & A</a>
        </nav>
      </header>
    </div>
  `;

  const headerCSS = `
    .kindtool-header-container {
      position: relative;
      z-index: 9999;
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      box-sizing: border-box;
    }
    
    .kindtool-header-container *, 
    .kindtool-header-container *::before, 
    .kindtool-header-container *::after {
      box-sizing: border-box;
    }
    
    .kindtool-header {
      background: linear-gradient(135deg, #8B7355 0%, #A0956B 100%);
      box-shadow: 0 2px 20px rgba(139, 115, 85, 0.3);
      padding: 0 20px;
    }
    
    .kindtool-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 12px 0;
    }
    
    .kindtool-logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    
    .kindtool-logo-img {
      height: 40px;
      width: auto;
    }
    
    .kindtool-nav-desktop {
      display: none;
      align-items: center;
      gap: 24px;
    }
    
    @media (min-width: 768px) {
      .kindtool-nav-desktop {
        display: flex;
      }
    }
    
    .kindtool-nav-item {
      color: #F5F1E8;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 20px;
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 14px;
      white-space: nowrap;
    }
    
    .kindtool-nav-item:hover {
      background-color: rgba(245, 241, 232, 0.2);
      transform: translateY(-2px);
      color: #FFFFFF;
    }
    
    .kindtool-dropdown {
      position: relative;
    }
    
    .kindtool-dropdown-btn {
      background: none;
      border: none;
      color: #F5F1E8;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.3s ease;
      font-family: inherit;
    }
    
    .kindtool-dropdown-btn:hover {
      background-color: rgba(245, 241, 232, 0.2);
      transform: translateY(-2px);
      color: #FFFFFF;
    }
    
    .kindtool-dropdown-content {
      position: absolute;
      top: 100%;
      left: 0;
      background: #FFFFFF;
      min-width: 200px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
      margin-top: 8px;
    }
    
    .kindtool-dropdown:hover .kindtool-dropdown-content {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .kindtool-dropdown-item {
      display: block;
      padding: 12px 20px;
      color: #8B7355;
      text-decoration: none;
      transition: all 0.2s ease;
      font-size: 14px;
      border-radius: 8px;
      margin: 4px;
    }
    
    .kindtool-dropdown-item:first-child {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    
    .kindtool-dropdown-item:last-child {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
    
    .kindtool-dropdown-item:hover {
      background-color: #F5F1E8;
      color: #6B5B47;
      transform: translateX(4px);
    }
    
    .kindtool-mobile-menu-btn {
      display: block;
      background: none;
      border: none;
      color: #F5F1E8;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background-color 0.3s ease;
    }
    
    @media (min-width: 768px) {
      .kindtool-mobile-menu-btn {
        display: none;
      }
    }
    
    .kindtool-mobile-menu-btn:hover {
      background-color: rgba(245, 241, 232, 0.2);
    }
    
    .kindtool-nav-mobile {
      display: none;
      flex-direction: column;
      background: rgba(139, 115, 85, 0.95);
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      padding: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
    
    .kindtool-nav-mobile.active {
      display: flex;
    }
    
    .kindtool-nav-item-mobile {
      color: #F5F1E8;
      text-decoration: none;
      padding: 12px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-size: 16px;
      margin-bottom: 4px;
    }
    
    .kindtool-nav-item-mobile:hover {
      background-color: rgba(245, 241, 232, 0.2);
      color: #FFFFFF;
    }
    
    .kindtool-mobile-section {
      margin: 8px 0;
    }
    
    .kindtool-mobile-section-title {
      color: #F5F1E8;
      font-weight: 600;
      padding: 8px 16px;
      font-size: 16px;
      opacity: 0.9;
    }
    
    .kindtool-indent {
      padding-left: 32px !important;
      font-size: 15px !important;
    }
  `;

  // 헤더를 DOM에 추가하는 함수
  function insertHeader() {
    // 스타일 추가
    const style = document.createElement('style');
    style.textContent = headerCSS;
    document.head.appendChild(style);
    
    // 헤더 HTML을 body 맨 위에 추가
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = headerHTML;
    document.body.insertBefore(headerDiv, document.body.firstChild);
    
    // 모바일 메뉴 토글 이벤트
    const mobileMenuBtn = document.getElementById('kindToolMobileMenuBtn');
    const mobileNav = document.getElementById('kindToolMobileNav');
    
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
      });
      
      // 외부 클릭 시 모바일 메뉴 닫기
      document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
          mobileNav.classList.remove('active');
        }
      });
    }
    
    // 링크 클릭 시 Google Analytics 이벤트 추적 (있는 경우)
    const navLinks = document.querySelectorAll('.kindtool-nav-item, .kindtool-dropdown-item, .kindtool-nav-item-mobile');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            'event_category': 'kindtool_header',
            'event_label': this.href,
          });
        }
      });
    });
  }

  // DOM이 준비되면 헤더 삽입
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertHeader);
  } else {
    insertHeader();
  }
})();