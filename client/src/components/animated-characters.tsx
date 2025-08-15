import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedCharactersProps {
  className?: string;
}

// Enhanced Bear Character with kawaii style
const BearCharacter = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="relative w-20 h-20 md:w-24 md:h-24"
    initial={{ y: 100, opacity: 0, scale: 0.8 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.8, 
      delay,
      type: "spring", 
      stiffness: 100 
    }}
    whileHover={{ 
      scale: 1.1, 
      y: -8,
      transition: { duration: 0.3 }
    }}
  >
    <motion.div
      animate={{
        y: [0, -3, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{
        duration: 4,
        delay: delay + 1,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Bear body with soft gradient */}
        <defs>
          <radialGradient id="bearBody" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#D2691E" />
            <stop offset="100%" stopColor="#8B4513" />
          </radialGradient>
          <radialGradient id="bearBelly" cx="0.5" cy="0.3">
            <stop offset="0%" stopColor="#F4E4BC" />
            <stop offset="100%" stopColor="#DEB887" />
          </radialGradient>
        </defs>
        
        {/* Main body */}
        <circle cx="50" cy="60" r="32" fill="url(#bearBody)" stroke="#654321" strokeWidth="1.5"/>
        
        {/* Head */}
        <circle cx="50" cy="35" r="24" fill="url(#bearBody)" stroke="#654321" strokeWidth="1.5"/>
        
        {/* Ears */}
        <circle cx="35" cy="20" r="7" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
        <circle cx="65" cy="20" r="7" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
        <circle cx="35" cy="20" r="4" fill="#DEB887"/>
        <circle cx="65" cy="20" r="4" fill="#DEB887"/>
        
        {/* Snout area */}
        <ellipse cx="50" cy="42" rx="8" ry="6" fill="url(#bearBelly)" stroke="#654321" strokeWidth="0.5"/>
        
        {/* Eyes with blink animation */}
        <motion.g
          animate={{
            scaleY: [1, 0.1, 1]
          }}
          transition={{
            duration: 0.2,
            delay: delay + 3,
            repeat: Infinity,
            repeatDelay: 4
          }}
        >
          <circle cx="43" cy="31" r="2.5" fill="#000"/>
          <circle cx="57" cy="31" r="2.5" fill="#000"/>
        </motion.g>
        
        {/* Eye highlights */}
        <circle cx="44" cy="30" r="1" fill="#FFF"/>
        <circle cx="58" cy="30" r="1" fill="#FFF"/>
        
        {/* Nose */}
        <ellipse cx="50" cy="39" rx="2" ry="1.5" fill="#000"/>
        
        {/* Mouth */}
        <path d="M46 43 Q50 47 54 43" stroke="#000" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        
        {/* Belly */}
        <ellipse cx="50" cy="65" rx="12" ry="18" fill="url(#bearBelly)"/>
        
        {/* Arms */}
        <circle cx="25" cy="52" r="6" fill="url(#bearBody)" stroke="#654321" strokeWidth="1"/>
        <circle cx="75" cy="52" r="6" fill="url(#bearBody)" stroke="#654321" strokeWidth="1"/>
      </svg>
    </motion.div>
  </motion.div>
);

// Enhanced Panda Character with kawaii style
const PandaCharacter = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="relative w-24 h-24 md:w-28 md:h-28"
    initial={{ y: 100, opacity: 0, scale: 0.8 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.8, 
      delay,
      type: "spring", 
      stiffness: 100 
    }}
    whileHover={{ 
      scale: 1.1, 
      y: -8,
      transition: { duration: 0.3 }
    }}
  >
    <motion.div
      animate={{
        y: [0, -4, 0],
        rotate: [0, -1, 1, 0]
      }}
      transition={{
        duration: 3.5,
        delay: delay + 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
          <radialGradient id="pandaBody" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#FFFAF0" />
            <stop offset="100%" stopColor="#F5F5DC" />
          </radialGradient>
        </defs>
        
        {/* Main body */}
        <circle cx="50" cy="60" r="32" fill="url(#pandaBody)" stroke="#333" strokeWidth="1.5"/>
        
        {/* Head */}
        <circle cx="50" cy="35" r="24" fill="url(#pandaBody)" stroke="#333" strokeWidth="1.5"/>
        
        {/* Black ears */}
        <circle cx="35" cy="18" r="9" fill="#000"/>
        <circle cx="65" cy="18" r="9" fill="#000"/>
        <circle cx="35" cy="18" r="5" fill="#333"/>
        <circle cx="65" cy="18" r="5" fill="#333"/>
        
        {/* Eye patches */}
        <ellipse cx="42" cy="32" rx="7" ry="9" fill="#000"/>
        <ellipse cx="58" cy="32" rx="7" ry="9" fill="#000"/>
        
        {/* Eyes with blink */}
        <motion.g
          animate={{
            scaleY: [1, 0.1, 1]
          }}
          transition={{
            duration: 0.2,
            delay: delay + 4,
            repeat: Infinity,
            repeatDelay: 5
          }}
        >
          <circle cx="42" cy="30" r="3" fill="#FFF"/>
          <circle cx="58" cy="30" r="3" fill="#FFF"/>
        </motion.g>
        
        {/* Pupils */}
        <circle cx="42" cy="30" r="2" fill="#000"/>
        <circle cx="58" cy="30" r="2" fill="#000"/>
        
        {/* Eye highlights */}
        <circle cx="43" cy="29" r="0.8" fill="#FFF"/>
        <circle cx="59" cy="29" r="0.8" fill="#FFF"/>
        
        {/* Nose */}
        <ellipse cx="50" cy="40" rx="2" ry="1.5" fill="#000"/>
        
        {/* Mouth */}
        <path d="M46 44 Q50 48 54 44" stroke="#000" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        
        {/* Panda belly */}
        <ellipse cx="50" cy="65" rx="14" ry="20" fill="#FFF"/>
        
        {/* Arms */}
        <circle cx="22" cy="50" r="7" fill="#000"/>
        <circle cx="78" cy="50" r="7" fill="#000"/>
        <circle cx="22" cy="50" r="4" fill="#333"/>
        <circle cx="78" cy="50" r="4" fill="#333"/>
      </svg>
    </motion.div>
  </motion.div>
);

// Enhanced Rabbit Character with kawaii style  
const RabbitCharacter = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="relative w-20 h-20 md:w-24 md:h-24"
    initial={{ y: 100, opacity: 0, scale: 0.8 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.8, 
      delay,
      type: "spring", 
      stiffness: 100 
    }}
    whileHover={{ 
      scale: 1.1, 
      y: -8,
      transition: { duration: 0.3 }
    }}
  >
    <motion.div
      animate={{
        y: [0, -2, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: 3,
        delay: delay + 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
          <radialGradient id="rabbitBody" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#FFFAF0" />
            <stop offset="100%" stopColor="#F0F0F0" />
          </radialGradient>
        </defs>
        
        {/* Main body */}
        <ellipse cx="50" cy="65" rx="28" ry="24" fill="url(#rabbitBody)" stroke="#D3D3D3" strokeWidth="1.5"/>
        
        {/* Head */}
        <circle cx="50" cy="40" r="20" fill="url(#rabbitBody)" stroke="#D3D3D3" strokeWidth="1.5"/>
        
        {/* Long ears with movement */}
        <motion.g
          animate={{
            rotate: [0, -2, 2, 0]
          }}
          transition={{
            duration: 2,
            delay: delay + 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "40px 25px" }}
        >
          <ellipse cx="40" cy="18" rx="5" ry="16" fill="url(#rabbitBody)" stroke="#D3D3D3" strokeWidth="1"/>
          <ellipse cx="40" cy="20" rx="2.5" ry="10" fill="#FFB6C1"/>
        </motion.g>
        
        <motion.g
          animate={{
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 2,
            delay: delay + 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "60px 25px" }}
        >
          <ellipse cx="60" cy="18" rx="5" ry="16" fill="url(#rabbitBody)" stroke="#D3D3D3" strokeWidth="1"/>
          <ellipse cx="60" cy="20" rx="2.5" ry="10" fill="#FFB6C1"/>
        </motion.g>
        
        {/* Eyes with blink */}
        <motion.g
          animate={{
            scaleY: [1, 0.1, 1]
          }}
          transition={{
            duration: 0.2,
            delay: delay + 2.5,
            repeat: Infinity,
            repeatDelay: 3.5
          }}
        >
          <circle cx="44" cy="36" r="2.5" fill="#000"/>
          <circle cx="56" cy="36" r="2.5" fill="#000"/>
        </motion.g>
        
        {/* Eye highlights */}
        <circle cx="45" cy="35" r="1" fill="#FFF"/>
        <circle cx="57" cy="35" r="1" fill="#FFF"/>
        
        {/* Cute triangular nose */}
        <path d="M50 42 L48 44 L52 44 Z" fill="#FFB6C1"/>
        
        {/* Mouth */}
        <path d="M46 46 Q50 49 54 46" stroke="#000" strokeWidth="1" fill="none" strokeLinecap="round"/>
        
        {/* Cheeks */}
        <circle cx="35" cy="42" r="3" fill="#FFB6C1" opacity="0.4"/>
        <circle cx="65" cy="42" r="3" fill="#FFB6C1" opacity="0.4"/>
        
        {/* Whiskers */}
        <line x1="30" y1="40" x2="38" y2="41" stroke="#000" strokeWidth="0.8"/>
        <line x1="30" y1="44" x2="38" y2="44" stroke="#000" strokeWidth="0.8"/>
        <line x1="62" y1="41" x2="70" y2="40" stroke="#000" strokeWidth="0.8"/>
        <line x1="62" y1="44" x2="70" y2="44" stroke="#000" strokeWidth="0.8"/>
        
        {/* Fluffy tail */}
        <circle cx="50" cy="85" r="5" fill="#FFF" stroke="#D3D3D3" strokeWidth="1"/>
      </svg>
    </motion.div>
  </motion.div>
);

export const AnimatedCharacters = ({ className }: AnimatedCharactersProps) => {
  // 이제 AnimatedTrees 컴포넌트가 캐릭터들도 포함하므로 이 컴포넌트는 단순화
  return null;
};