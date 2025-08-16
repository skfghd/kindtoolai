(function() {
  'use strict';
  
  // 이미 헤더가 있는지 확인
  if (document.getElementById('kindtool-header')) {
    return;
  }

  // CSS 스타일 정의
  const styles = `
    #kindtool-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999999;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #e2d5c7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    #kindtool-header * {
      box-sizing: border-box;
    }
    
    .kindtool-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
    
    .kindtool-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #8B4513;
      font-weight: bold;
      font-size: 18px;
    }
    
    .kindtool-logo img {
      height: 24px;
      width: auto;
    }
    
    .kindtool-nav {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .kindtool-nav-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: #8B4513;
      text-decoration: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .kindtool-nav-btn:hover {
      background: #f5f1eb;
      color: #654321;
    }
    
    .kindtool-dropdown {
      position: relative;
      display: inline-block;
    }
    
    .kindtool-dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background: white;
      min-width: 200px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
      border-radius: 8px;
      border: 1px solid #e2d5c7;
      z-index: 1000000;
      overflow: hidden;
    }
    
    .kindtool-dropdown:hover .kindtool-dropdown-content {
      display: block;
    }
    
    .kindtool-dropdown-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      color: #8B4513;
      text-decoration: none;
      font-size: 14px;
      border-bottom: 1px solid #f5f1eb;
      transition: background 0.2s;
    }
    
    .kindtool-dropdown-item:hover {
      background: #f5f1eb;
    }
    
    .kindtool-dropdown-item:last-child {
      border-bottom: none;
    }
    
    .kindtool-mobile-menu {
      display: none;
    }
    
    .kindtool-mobile-toggle {
      display: none;
      background: transparent;
      border: none;
      color: #8B4513;
      font-size: 24px;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .kindtool-nav {
        display: none;
      }
      
      .kindtool-mobile-toggle {
        display: block;
      }
      
      .kindtool-mobile-menu {
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        background: white;
        border-bottom: 1px solid #e2d5c7;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        z-index: 999998;
      }
      
      .kindtool-mobile-menu a {
        display: block;
        padding: 16px;
        color: #8B4513;
        text-decoration: none;
        border-bottom: 1px solid #f5f1eb;
      }
      
      .kindtool-mobile-menu a:hover {
        background: #f5f1eb;
      }
    }
    
    /* 기존 페이지 콘텐츠를 아래로 밀어내기 */
    body {
      padding-top: 64px !important;
    }
  `;

  // 스타일 시트 추가
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // 헤더 HTML 생성
  const headerHTML = `
    <div id="kindtool-header">
      <div class="kindtool-container">
        <a href="https://kindtool.ai" class="kindtool-logo">
          <img src="https://kindtool.ai/kindtoolai-logo.png" alt="KINDTOOLAI 로고">
          <span>KINDTOOLAI</span>
        </a>
        
        <nav class="kindtool-nav">
          <a href="https://kindtool.ai" class="kindtool-nav-btn">🏠 홈</a>
          <a href="https://kindtool.ai/about" class="kindtool-nav-btn">ℹ️ 사이트소개</a>
          <div class="kindtool-dropdown">
            <button class="kindtool-nav-btn">⚡ 도구들 ▼</button>
            <div class="kindtool-dropdown-content">
              <a href="https://teto-vs-egen-hongeunlee.replit.app" target="_blank" class="kindtool-dropdown-item">👥 테토vs에겐 성향분석</a>
              <a href="https://threelinepoem.replit.app" target="_blank" class="kindtool-dropdown-item">✏️ 삼행시 만들기</a>
              <a href="https://mandalat-canvas.replit.app" target="_blank" class="kindtool-dropdown-item">⚏ 만다라트 캔버스</a>
              <a href="https://catch-up-meeting-hongeunlee.replit.app" target="_blank" class="kindtool-dropdown-item">📹 캐치업 미팅 MBTI</a>
              <a href="https://WhatTheyMeant.replit.app" target="_blank" class="kindtool-dropdown-item">🎨 속뜻 번역기</a>
              <a href="https://feeltoon.replit.app" target="_blank" class="kindtool-dropdown-item">📖 Tales of Me</a>
            </div>
          </div>
          <a href="https://kindtool.ai/contact" class="kindtool-nav-btn">💬 Q & A</a>
        </nav>
        
        <button class="kindtool-mobile-toggle" onclick="toggleKindtoolMobileMenu()">☰</button>
      </div>
      
      <div id="kindtool-mobile-menu" class="kindtool-mobile-menu" style="display: none;">
        <a href="https://kindtool.ai">🏠 홈</a>
        <a href="https://kindtool.ai/about">ℹ️ 사이트소개</a>
        <a href="https://teto-vs-egen-hongeunlee.replit.app" target="_blank">👥 테토vs에겐 성향분석</a>
        <a href="https://threelinepoem.replit.app" target="_blank">✏️ 삼행시 만들기</a>
        <a href="https://mandalat-canvas.replit.app" target="_blank">⚏ 만다라트 캔버스</a>
        <a href="https://catch-up-meeting-hongeunlee.replit.app" target="_blank">📹 캐치업 미팅 MBTI</a>
        <a href="https://WhatTheyMeant.replit.app" target="_blank">🎨 속뜻 번역기</a>
        <a href="https://feeltoon.replit.app" target="_blank">📖 Tales of Me</a>
        <a href="https://kindtool.ai/contact">💬 Q & A</a>
      </div>
    </div>
  `;

  // 모바일 메뉴 토글 함수
  window.toggleKindtoolMobileMenu = function() {
    const menu = document.getElementById('kindtool-mobile-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  };

  // DOM이 로드되면 헤더 추가
  function addHeader() {
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = headerHTML;
    document.body.insertBefore(headerDiv.firstElementChild, document.body.firstChild);
  }

  // DOM 로드 상태 확인
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHeader);
  } else {
    addHeader();
  }

  // 구글 애널리틱스 이벤트 추적
  function trackHeaderClick(label) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'header_click', {
        event_category: 'external_header',
        event_label: label,
        value: 1
      });
    }
  }

  // 모든 링크에 클릭 이벤트 추가
  setTimeout(() => {
    const links = document.querySelectorAll('#kindtool-header a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        trackHeaderClick(link.textContent.trim());
      });
    });
  }, 100);

})();