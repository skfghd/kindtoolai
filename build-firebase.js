const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔥 Firebase 배포용 빌드 시작...');

try {
  // 1. 클라이언트 빌드 (Vite)
  console.log('📦 클라이언트 빌드 중...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // 2. dist 디렉토리에 kindtool-header.js 복사
  console.log('📄 헤더 스크립트 복사 중...');
  const headerSource = path.join(__dirname, 'public', 'kindtool-header.js');
  const headerDest = path.join(__dirname, 'dist', 'kindtool-header.js');
  
  if (fs.existsSync(headerSource)) {
    fs.copyFileSync(headerSource, headerDest);
    console.log('✅ 헤더 스크립트 복사 완료');
  } else {
    // functions/src/kindtool-header.js에서 복사
    const functionsHeaderSource = path.join(__dirname, 'functions', 'src', 'kindtool-header.js');
    if (fs.existsSync(functionsHeaderSource)) {
      fs.copyFileSync(functionsHeaderSource, headerDest);
      console.log('✅ 헤더 스크립트 복사 완료 (functions에서)');
    }
  }
  
  // 3. Google AdSense 스크립트를 index.html에 추가
  console.log('📊 Google AdSense 스크립트 추가 중...');
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    
    // AdSense 스크립트가 없으면 추가
    if (!indexContent.includes('pagead2.googlesyndication.com')) {
      const adSenseScript = `
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
            crossorigin="anonymous"></script>
    <!-- Replace YOUR_PUBLISHER_ID with your actual AdSense publisher ID -->
`;
      
      indexContent = indexContent.replace('</head>', adSenseScript + '</head>');
      fs.writeFileSync(indexPath, indexContent);
      console.log('✅ Google AdSense 스크립트 추가 완료');
    }
  }
  
  // 4. robots.txt와 sitemap.xml 복사
  console.log('🤖 SEO 파일 복사 중...');
  const seoFiles = ['robots.txt', 'sitemap.xml'];
  
  seoFiles.forEach(file => {
    const source = path.join(__dirname, file);
    const dest = path.join(__dirname, 'dist', file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✅ ${file} 복사 완료`);
    }
  });
  
  console.log('🎉 Firebase 배포용 빌드 완료!');
  console.log('');
  console.log('다음 단계:');
  console.log('1. Firebase CLI 설치: npm install -g firebase-tools');
  console.log('2. Firebase 로그인: firebase login');
  console.log('3. Firebase 프로젝트 생성 및 설정');
  console.log('4. 환경 변수 설정: firebase functions:config:set');
  console.log('5. 배포: firebase deploy');
  
} catch (error) {
  console.error('❌ 빌드 중 오류 발생:', error.message);
  process.exit(1);
}