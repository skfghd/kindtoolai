import { motion } from "framer-motion";

export const AnimatedClouds = () => {
  const cloudVariants = {
    float: {
      x: [0, 30, -20, 0],
      y: [0, -10, 5, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const cloudVariants2 = {
    float: {
      x: [0, -25, 15, 0],
      y: [0, 8, -12, 0],
      scale: [1, 0.9, 1.2, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }
    }
  };

  const cloudVariants3 = {
    float: {
      x: [0, 20, -30, 0],
      y: [0, -5, 10, 0],
      scale: [1, 1.15, 0.85, 1],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4
      }
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Cloud 1 */}
      <motion.div
        className="absolute top-4 left-8 md:left-16"
        variants={cloudVariants}
        animate="float"
      >
        <svg width="80" height="50" viewBox="0 0 80 50" className="text-white/60 drop-shadow-sm">
          <path
            d="M20 35c-8 0-15-7-15-15s7-15 15-15c2 0 4 0.5 5.5 1.5C27.5 2.5 32 0 37 0c8.5 0 15.5 7 15.5 15.5 0 1.5-0.2 3-0.7 4.4C54.8 21.2 58 24.8 58 30c0 6-5 10-11 10H20z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Cloud 2 */}
      <motion.div
        className="absolute top-12 right-8 md:right-20"
        variants={cloudVariants2}
        animate="float"
      >
        <svg width="100" height="60" viewBox="0 0 100 60" className="text-white/50 drop-shadow-sm">
          <path
            d="M25 42c-10 0-18-8-18-18s8-18 18-18c2.5 0 5 0.6 7 1.8C35 3.5 40.5 0 47 0c10.5 0 19 8.5 19 19 0 1.8-0.3 3.6-0.8 5.3C69.5 25.8 74 30.5 74 36c0 7.5-6 13.5-13.5 13.5H25z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Cloud 3 */}
      <motion.div
        className="absolute top-20 left-1/3"
        variants={cloudVariants3}
        animate="float"
      >
        <svg width="70" height="45" viewBox="0 0 70 45" className="text-white/40 drop-shadow-sm">
          <path
            d="M18 32c-7 0-13-6-13-13s6-13 13-13c1.8 0 3.5 0.4 5 1.2C25.5 3 29.8 0 35 0c7.5 0 13.5 6 13.5 13.5 0 1.3-0.2 2.5-0.6 3.7C50.8 18.5 54 21.8 54 26c0 5.5-4.5 10-10 10H18z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  );
};