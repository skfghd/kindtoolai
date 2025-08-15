import { useLocation } from "wouter";
import { ClayButton } from "@/components/clay-button";
import { ClayCharacter } from "@/components/clay-character";
import { ClayFooter } from "@/components/clay-footer";
import { SideMenu } from "@/components/side-menu";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

// 지연 로딩으로 애니메이션 컴포넌트 최적화
const AnimatedClouds = lazy(() => import("@/components/animated-clouds").then(module => ({ default: module.AnimatedClouds })));
const AnimatedTrees = lazy(() => import("@/components/animated-trees").then(module => ({ default: module.AnimatedTrees })));

export default function Home() {
  const [, setLocation] = useLocation();

  const navigateToApp = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      {/* Side Menu */}
      <SideMenu />
      
      {/* Animated Clouds Background - 지연 로딩 */}
      <Suspense fallback={null}>
        <AnimatedClouds />
      </Suspense>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header with Logo */}
        <header className="text-center mb-12 relative">
          {/* Main Logo */}
          <motion.h1 
            className="text-4xl md:text-6xl font-black clay-text mb-4 relative z-10 gpu-accelerated"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            KINDTOOLAI
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl clay-text font-medium opacity-80 gpu-accelerated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            재미있고 유용한 아이스브레이킹 도구들
          </motion.p>
        </header>

        {/* Main Content Area */}
        <motion.main 
          className="space-y-6 md:space-y-8 relative gpu-accelerated"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ClayButton
            title="테토vs에겐, 나는 누구?!"
            description="사진 한 장으로 분석하는 나의 성향!"
            href="https://teto-vs-egen-hongeunlee.replit.app"
            onClick={() => window.open('https://teto-vs-egen-hongeunlee.replit.app', '_blank')}
          />

          <ClayButton
            title="삼행시 만들기"
            description="단어 하나면 끝! 오늘의 삼행시 장인은 나야 나!"
            href="https://threelinepoem.replit.app"
            onClick={() => window.open('https://threelinepoem.replit.app', '_blank')}
          />

          <ClayButton
            title="만다라트 캔버스"
            description="64칸 만다라트로 꿈을 구체적인 계획으로 바꿔보세요!"
            href="https://mandalat-canvas.replit.app"
            onClick={() => window.open('https://mandalat-canvas.replit.app', '_blank')}
          />

          <ClayButton
            title="캐치업 미팅 MBTI"
            description="팀원들의 소통 스타일을 이해하고 더 효과적인 회의를 만들어요"
            href="https://catch-up-meeting-hongeunlee.replit.app"
            onClick={() => window.open('https://catch-up-meeting-hongeunlee.replit.app', '_blank')}
          />

          <ClayButton
            title="속뜻 번역기"
            description="말 속의 진짜 의미를 알아보세요!"
            href="https://WhatTheyMeant.replit.app"
            onClick={() => window.open('https://WhatTheyMeant.replit.app', '_blank')}
          />

          <ClayButton
            title="다정한 번역기"
            description="말은 차가웠지만, 그 안의 마음은 따뜻했습니다."
            href="https://KindWhisper.replit.app"
            onClick={() => window.open('https://KindWhisper.replit.app', '_blank')}
          />

          <ClayButton
            title="Tales of Me"
            description="오늘의 기분으로 AI가 만들어주는 나만의 이야기 그림책"
            href="https://feeltoon.replit.app"
            onClick={() => window.open('https://feeltoon.replit.app', '_blank')}
          />
        </motion.main>

        {/* Footer */}
        <ClayFooter />
        
        {/* Bottom Trees and Characters - 지연 로딩 */}
        <div className="relative bottom-0 left-0 right-0 pointer-events-none z-20 mt-2">
          <Suspense fallback={<div className="w-full h-40" />}>
            <AnimatedTrees className="w-full h-40" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
