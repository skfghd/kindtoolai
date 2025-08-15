import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mainMenuItems = [
    { href: "/", icon: "🏠", label: "홈", color: "#FF8C42" },
    { href: "/about", icon: "ℹ️", label: "사이트소개", color: "#FFD166" },
    { href: "/contact", icon: "💬", label: "Q & A", color: "#06D6A0" }
  ];

  const toolItems = [
    { href: "https://KindWhisper.replit.app", icon: "💖", label: "다정한 번역기", external: true, color: "#FF1493" },
    { href: "https://teto-vs-egen-hongeunlee.replit.app", icon: "🎯", label: "테토vs에겐 성향분석", external: true, color: "#F4845F" },
    { href: "https://threelinepoem.replit.app", icon: "✍️", label: "삼행시 만들기", external: true, color: "#FEC564" },
    { href: "https://mandalat-canvas.replit.app", icon: "🧩", label: "만다라트 캔버스", external: true, color: "#45B7D1" },
    { href: "https://catchup-meeting.replit.app", icon: "📹", label: "캐치업 미팅 MBTI", external: true, color: "#96CEB4" },
    { href: "https://WhatTheyMeant.replit.app", icon: "🧪", label: "속뜻 번역기", external: true, color: "#FFEAA7" },
    { href: "https://feeltoon.replit.app", icon: "⭐", label: "Tales of Me", external: true, color: "#DDA0DD" }
  ];

  const handleLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/95 transition-all duration-200"
        aria-label="메뉴 열기"
      >
        <Menu className="w-6 h-6 text-amber-700" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed left-4 top-4 bottom-4 w-80 bg-gradient-to-br from-[#FFFCEE] to-[#FFF8E1] shadow-2xl z-50 overflow-y-auto"
            style={{ borderRadius: "32px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">K</span>
                </div>
                <h2 className="text-xl font-bold text-[#5B3926]">KINDTOOLAI</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="메뉴 닫기"
              >
                <X className="w-5 h-5 text-[#5B3926]" />
              </button>
            </div>

            {/* Main Menu Items */}
            <nav className="px-6 pb-4">
              <ul className="space-y-2">
                {mainMenuItems.map((item, index) => (
                  <li key={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href}>
                        <a
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-white/50 transition-all duration-200 group"
                        >
                          <div 
                            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-sm"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.icon}
                          </div>
                          <span className="text-[#5B3926] font-semibold text-base">{item.label}</span>
                        </a>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Tools Section */}
            <div className="px-6 pt-2">
              <h3 className="text-[#8B6F47] font-medium text-sm mb-3 px-3">도구들</h3>
              <ul className="space-y-2">
                {toolItems.map((item, index) => (
                  <li key={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (mainMenuItems.length + index) * 0.1 }}
                    >
                      <button
                        onClick={() => handleLinkClick(item.href, true)}
                        className="w-full flex items-center space-x-4 p-3 rounded-2xl hover:bg-white/50 transition-all duration-200 text-left group"
                      >
                        <div 
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-sm"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.icon}
                        </div>
                        <span className="text-[#5B3926] font-semibold text-base">{item.label}</span>
                      </button>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};