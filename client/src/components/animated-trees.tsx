import { motion } from "framer-motion";
import { Leaf, Heart } from "lucide-react";
import { useMemo } from "react";
import charactersImage from "@assets/동물_투명배경_1754224292656.png";
import treesImage from "@assets/나무_투명배경_1754224888708.png";
import heartTreeImage from "@assets/나무_투명배경_1754230450191.png";
import newGrassFieldImage from "@assets/잔디_투명배경_1754228817483.png";
import tigerImage from "@assets/ChatGPT Image 2025년 8월 3일 오후 10_10_26_1754226633362.png";
import newDogImage from "@assets/dog_transparent_strict_1754302769552.png";
import newCatImage from "@assets/cat_transparent_1754293171270.png";

interface AnimatedTreesProps {
  className?: string;
}

export const AnimatedTrees = ({ className }: AnimatedTreesProps) => {
  // 흩날리는 애니메이션용 고정된 랜덤 값들
  const floatingItems = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: -50 - Math.random() * 100,
      endX: Math.random() * 40 - 20,
      itemSize: Math.random() * 8 + 10,
      isHeart: Math.random() < 0.25,
      leafType: Math.random(),
      color1: Math.random(),
      color2: Math.random(),
      rotation: Math.random() * 360,
      duration: 15 + Math.random() * 10,
      delay: i * 1.5,
      repeatDelay: Math.random() * 5
    })), []
  );

  // 캐릭터 배열 정의 - 곰 → 호랑이 → 노란곰 → 팬더 순서
  const animals = [
    {
      name: "갈색 곰",
      image: charactersImage,
      backgroundPosition: "0% 0%",
      backgroundSize: "300% 100%",
      animationDuration: 3.5,
      animationDelay: 0,
      yMovement: [-3, 0],
      rotation: [0, 0.8, -0.8, 0],
      heightScale: 1.0
    },
    {
      name: "호랑이",
      image: tigerImage,
      backgroundPosition: "center",
      backgroundSize: "cover",
      animationDuration: 3.8,
      animationDelay: 0.5,
      yMovement: [-2.5, 0],
      rotation: [0, -0.5, 0.5, 0],
      heightScale: 1.0
    },
    {
      name: "노란 곰",
      image: charactersImage,
      backgroundPosition: "50% 0%",
      backgroundSize: "300% 100%",
      animationDuration: 4.0,
      animationDelay: 1.3,
      yMovement: [-2, 0],
      rotation: [0, -1.2, 1.2, 0],
      heightScale: 1.0
    },
    {
      name: "팬더",
      image: charactersImage,
      backgroundPosition: "100% 0%",
      backgroundSize: "300% 100%",
      animationDuration: 3.2,
      animationDelay: 0.8,
      yMovement: [-4, 0],
      rotation: [0, 1.5, -1.5, 0],
      heightScale: 1.0
    },
    {
      name: "흰 강아지",
      image: newDogImage,
      backgroundPosition: "center",
      backgroundSize: "contain",
      animationDuration: 3.8,
      animationDelay: 1.6,
      yMovement: [-3, 0],
      rotation: [0, -1.0, 1.0, 0]
    },
    {
      name: "주황 고양이",
      image: newCatImage,
      backgroundPosition: "center",
      backgroundSize: "contain",
      animationDuration: 4.2,
      animationDelay: 2.1,
      yMovement: [-2, 0],
      rotation: [0, 1.3, -1.3, 0]
    }
  ];

  return (
    <div className={`relative w-full h-40 flex items-center justify-center pb-8 overflow-hidden ${className}`}>
      {/* 전체 화면 이파리와 하트 흩날리는 애니메이션 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {floatingItems.map((item) => (
          <motion.div
            key={`floating-item-${item.id}`}
            className="absolute pointer-events-none"
            style={{
              left: `${item.startX}%`,
              top: `${item.startY}px`
            }}
            initial={{
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 0
            }}
            animate={{
              y: [0, 150, 300, 500, 800],
              x: [0, item.endX * 0.3, item.endX * 0.7, item.endX, item.endX * 0.5],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0, 0.7, 1, 0.8, 0.3, 0],
              scale: [0.5, 1, 1.2, 1, 0.8]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
              repeatDelay: item.repeatDelay
            }}
          >
            {item.isHeart ? (
              <Heart 
                size={item.itemSize} 
                className={`drop-shadow-sm ${
                  item.color1 > 0.5 ? "text-pink-400" : "text-red-400"
                }`} 
                fill="currentColor"
              />
            ) : (
              // 이미지의 이파리들을 SVG로 재현
              <div 
                className="drop-shadow-sm"
                style={{
                  width: item.itemSize,
                  height: item.itemSize
                }}
              >
                {item.leafType > 0.5 ? (
                  // 둥근 이파리 (50% 확률)
                  <svg 
                    width={item.itemSize} 
                    height={item.itemSize} 
                    viewBox="0 0 24 24" 
                    className={item.color1 > 0.5 ? "text-green-400" : "text-yellow-400"}
                  >
                    <ellipse 
                      cx="12" 
                      cy="12" 
                      rx="8" 
                      ry="5" 
                      fill="currentColor"
                      transform={`rotate(${item.rotation} 12 12)`}
                    />
                  </svg>
                ) : (
                  // 기본 Lucide 이파리 (50% 확률)
                  <Leaf 
                    size={item.itemSize} 
                    className={`${
                      item.color1 > 0.5 ? "text-green-500" : "text-yellow-500"
                    }`} 
                  />
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 새로운 잔디 배경 - 가로 반복 (캐릭터들이 서있는 잔디밭) */}
      <div 
        className="absolute left-0 right-0 h-32"
        style={{
          bottom: "8px",
          backgroundImage: `url(${newGrassFieldImage})`,
          backgroundPosition: "center 85%",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 130%",
          zIndex: 15
        }}
      />
      
      {/* 맨 왼쪽 하트 나무 */}
      <motion.div
        className="absolute left-2 sm:left-4 md:left-6 bottom-8 flex-shrink-0"
        style={{ zIndex: 30 }}
        initial={{ x: -70, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        animate={{
          rotate: [0, 0.5, -0.3, 0.8, -0.5, 0],
          x: [0, 1, -0.5, 2, -1, 0],
          scale: [1, 1.01, 0.99, 1.02, 0.98, 1]
        }}
        transition={{
          x: { duration: 1.8, ease: "easeOut" },
          opacity: { duration: 1.8, ease: "easeOut" },
          rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
        }}
      >
        <div
          className="w-[58px] h-[77px] sm:w-[67px] sm:h-[86px] md:w-[77px] md:h-[96px] drop-shadow-lg"
          style={{
            backgroundImage: `url(${heartTreeImage})`,
            backgroundSize: "333.33% 100%",
            backgroundPosition: "50% 0%", // 가운데 하트 나무
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges"
          }}
        />
      </motion.div>

      {/* 왼쪽 나무 - 바람 애니메이션 */}
      <motion.div
        className="absolute left-8 sm:left-12 md:left-16 bottom-8 flex-shrink-0"
        style={{ zIndex: 30 }}
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        animate={{
          rotate: [0, 0.8, -0.5, 1.2, -0.8, 0],
          x: [0, 2, -1, 3, -2, 0],
          scale: [1, 1.02, 0.98, 1.01, 0.99, 1]
        }}
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
          opacity: { duration: 1.5, ease: "easeOut" },
          rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
      >
        <div
          className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 drop-shadow-lg"
          style={{
            background: `url(${treesImage})`,
            backgroundSize: "333.33% 100%",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges"
          }}
        />
      </motion.div>

      {/* 오른쪽 나무 - 바람 애니메이션 */}
      <motion.div
        className="absolute right-8 sm:right-12 md:right-16 bottom-8 flex-shrink-0"
        style={{ zIndex: 30 }}
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        animate={{
          rotate: [0, -0.9, 0.6, -1.1, 0.7, 0],
          x: [0, -2, 1, -3, 2, 0],
          scale: [1, 0.98, 1.03, 0.99, 1.02, 1]
        }}
        transition={{
          x: { duration: 1.5, ease: "easeOut", delay: 0.3 },
          opacity: { duration: 1.5, ease: "easeOut", delay: 0.3 },
          rotate: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
          scale: { duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
        }}
      >
        <div
          className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 drop-shadow-lg"
          style={{
            background: `url(${treesImage})`,
            backgroundSize: "333.33% 100%",
            backgroundPosition: "100% 0%",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges"
          }}
        />
      </motion.div>

      {/* 맨 오른쪽 하트 나무 */}
      <motion.div
        className="absolute right-0 sm:right-0 md:right-0 lg:right-0 bottom-8 flex-shrink-0"
        style={{ zIndex: 30 }}
        initial={{ x: 70, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        animate={{
          rotate: [0, -0.6, 0.4, -0.9, 0.6, 0],
          x: [0, -1, 0.5, -2, 1, 0],
          scale: [1, 0.99, 1.02, 0.98, 1.01, 1]
        }}
        transition={{
          x: { duration: 1.8, ease: "easeOut", delay: 0.4 },
          opacity: { duration: 1.8, ease: "easeOut", delay: 0.4 },
          rotate: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
          scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }
        }}
      >
        <div
          className="w-[87px] h-[115px] sm:w-[100px] sm:h-[129px] md:w-[115px] md:h-[144px] drop-shadow-lg"
          style={{
            backgroundImage: `url(${heartTreeImage})`,
            backgroundSize: "333.33% 100%",
            backgroundPosition: "50% 0%",
            backgroundRepeat: "no-repeat",
            imageRendering: "crisp-edges"
          }}
        />
      </motion.div>

      {/* 캐릭터 컨테이너 */}
      <motion.div
        className="flex items-end justify-between max-w-2xl min-w-[480px] mx-auto px-2 sm:px-4 md:px-6 z-20 relative"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ 
          marginBottom: "0px",
          transform: "translateY(36px)"
        }}
      >
        {animals.map((animal, index) => (
          <motion.div
            key={animal.name}
            className="flex-shrink-0 relative"
            animate={{
              y: [0, ...animal.yMovement],
              rotate: animal.rotation
            }}
            transition={{
              duration: animal.animationDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: animal.animationDelay
            }}
            style={{ 
              zIndex: 20 + index,
              transform: animal.name === "호랑이" ? "translateY(25px)" : "none"
            }}
          >
            <div 
              className="relative flex items-end justify-center"
              style={{ 
                height: "80px",
                width: "80px"
              }}
            >
              <div
                className="drop-shadow-lg gpu-accelerated lazy-load"
                style={{
                  height: "80px",
                  width: "80px",
                  backgroundImage: `url(${animal.image})`,
                  backgroundSize: animal.backgroundSize,
                  backgroundPosition: animal.backgroundPosition,
                  backgroundRepeat: "no-repeat",
                  imageRendering: "crisp-edges"
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};