import { motion } from "framer-motion";
import { Link } from "wouter";

export function ClayFooter() {
  return (
    <motion.footer
      className="mt-4 py-4 px-4 text-center relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Decorative Line */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-clay-400 to-transparent rounded-full mb-6 opacity-60"></div>
        
        {/* Main Footer Content */}
        <div className="space-y-4">
          <div className="text-clay-700 text-sm font-medium">
            재미있고 유용한 아이스브레이킹 도구들
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-clay-500 mt-4">
            <Link 
              href="/about"
              className="hover:text-clay-700 transition-colors duration-200"
            >
              사이트 소개
            </Link>
            <span className="text-clay-400">•</span>
            <Link 
              href="/disclaimer"
              className="hover:text-clay-700 transition-colors duration-200"
            >
              면책조항
            </Link>
            <span className="text-clay-400">•</span>
            <Link 
              href="/privacy-policy"
              className="hover:text-clay-700 transition-colors duration-200"
            >
              개인정보처리방침
            </Link>
            <span className="text-clay-400">•</span>
            <Link 
              href="/terms-of-service"
              className="hover:text-clay-700 transition-colors duration-200"
            >
              이용약관
            </Link>
            <span className="text-clay-400">•</span>
            <Link 
              href="/contact"
              className="hover:text-clay-700 transition-colors duration-200"
            >
              문의하기
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-clay-300 border-opacity-30">
          <p className="text-xs text-clay-500">
            © 2025 KindTool.ai - All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}