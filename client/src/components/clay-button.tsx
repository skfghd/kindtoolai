import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ClayButtonProps {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
  href?: string;
}

export function ClayButton({ title, description, onClick, className, href }: ClayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 향상된 프리로딩 기능
  useEffect(() => {
    if (href) {
      // DNS 프리로딩
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = new URL(href).origin;
      document.head.appendChild(dnsLink);
      
      // 프리커넥트로 연결 최적화
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = new URL(href).origin;
      document.head.appendChild(preconnectLink);
      
      // 페이지 프리로딩
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'prefetch';
      preloadLink.href = href;
      document.head.appendChild(preloadLink);
      
      // 2초 후 프리로딩 완료로 표시 (더 빠르게)
      const timer = setTimeout(() => setIsPreloaded(true), 2000);
      
      return () => {
        clearTimeout(timer);
        // 클린업
        [dnsLink, preconnectLink, preloadLink].forEach(link => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        });
      };
    }
  }, [href]);

  const handleClick = () => {
    // Google Analytics 이벤트 추적
    trackEvent('tool_click', 'navigation', title, 1);
    
    setIsLoading(true);
    
    // 즉시 새 창 열기 (더 빠른 반응)
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      onClick();
    }
    
    // 1초 후 로딩 상태 해제 (더 빠르게)
    setTimeout(() => setIsLoading(false), 1000);
  };

  // 마우스 호버 시 추가 프리로딩
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (href && !isPreloaded) {
      // 호버 시 즉시 프리로딩 시작
      const priorityLink = document.createElement('link');
      priorityLink.rel = 'preload';
      priorityLink.as = 'document';
      priorityLink.href = href;
      document.head.appendChild(priorityLink);
    }
  };

  return (
    <motion.div
      className={cn(
        "clay-button rounded-3xl p-6 md:p-8 cursor-pointer group relative overflow-hidden",
        isLoading && "pointer-events-none opacity-75",
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-clay-600" />
            <span className="text-sm text-clay-600 font-medium">새 창으로 이동 중...</span>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold clay-text mb-3">
            {title}
          </h2>
          <p className="text-lg md:text-xl clay-text opacity-80 font-medium">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 ml-4">
          <ExternalLink className="h-6 w-6 text-clay-500 group-hover:text-clay-700 transition-colors" />
          {isPreloaded && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="프리로딩 완료" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
