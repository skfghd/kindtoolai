#!/bin/bash

# KINDTOOLAI Firebase 자동 배포 스크립트

echo "🔥 KINDTOOLAI Firebase 배포 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 오류 시 스크립트 중단
set -e

# Firebase CLI 설치 확인
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI가 설치되지 않았습니다.${NC}"
    echo -e "${YELLOW}다음 명령으로 설치하세요: npm install -g firebase-tools${NC}"
    exit 1
fi

# Firebase 로그인 확인
if ! firebase projects:list &> /dev/null; then
    echo -e "${YELLOW}⚠️ Firebase에 로그인이 필요합니다.${NC}"
    firebase login
fi

# 프로젝트 확인
echo -e "${BLUE}📋 현재 Firebase 프로젝트:${NC}"
firebase use

# 환경 변수 확인
echo -e "${BLUE}🔧 환경 변수 확인...${NC}"
firebase functions:config:get || echo -e "${YELLOW}⚠️ 환경 변수가 설정되지 않았습니다. 배포 후 설정하세요.${NC}"

# 빌드
echo -e "${BLUE}📦 프로젝트 빌드 중...${NC}"
node build-firebase.js

# Functions 의존성 설치
echo -e "${BLUE}📦 Functions 의존성 설치 중...${NC}"
cd functions
npm install
cd ..

# 배포 선택
echo -e "${BLUE}🚀 배포 옵션을 선택하세요:${NC}"
echo "1) 전체 배포 (hosting + functions + firestore)"
echo "2) 호스팅만 배포"
echo "3) Functions만 배포"
echo "4) Firestore 규칙만 배포"
read -p "선택 (1-4): " choice

case $choice in
    1)
        echo -e "${GREEN}🔥 전체 배포 시작...${NC}"
        firebase deploy
        ;;
    2)
        echo -e "${GREEN}🌐 호스팅 배포 시작...${NC}"
        firebase deploy --only hosting
        ;;
    3)
        echo -e "${GREEN}⚡ Functions 배포 시작...${NC}"
        firebase deploy --only functions
        ;;
    4)
        echo -e "${GREEN}🔒 Firestore 규칙 배포 시작...${NC}"
        firebase deploy --only firestore:rules
        ;;
    *)
        echo -e "${RED}❌ 잘못된 선택입니다.${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}✅ 배포 완료!${NC}"

# 배포 후 정보 표시
PROJECT_ID=$(firebase use | grep "Active Project" | cut -d'(' -f2 | cut -d')' -f1)
if [ -n "$PROJECT_ID" ]; then
    echo -e "${BLUE}📱 배포된 앱 URL:${NC}"
    echo "   https://$PROJECT_ID.web.app"
    echo "   https://$PROJECT_ID.firebaseapp.com"
    
    echo -e "${BLUE}🔧 관리 콘솔:${NC}"
    echo "   https://console.firebase.google.com/project/$PROJECT_ID"
    
    echo -e "${BLUE}📊 Functions 로그:${NC}"
    echo "   firebase functions:log --project=$PROJECT_ID"
fi

echo -e "${BLUE}💡 다음 단계:${NC}"
echo "1. 환경 변수 설정 (아직 안했다면):"
echo "   firebase functions:config:set analytics.measurement_id=\"G-XXXXXXXXXX\""
echo "2. Google AdSense 설정"
echo "3. 커스텀 도메인 연결 (선택사항)"
echo "4. 모니터링 및 분석 설정"

echo -e "${GREEN}🎉 KINDTOOLAI가 성공적으로 배포되었습니다!${NC}"