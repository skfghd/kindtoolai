import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClayCharacterProps {
  type: "bear" | "dog" | "cow" | "tree" | "cloud" | "flower";
  className?: string;
  animationDelay?: number;
}

export function ClayCharacter({ type, className, animationDelay = 0 }: ClayCharacterProps) {
  const renderCharacter = () => {
    switch (type) {
      case "bear":
        return (
          <div className="relative">
            <div className="w-12 h-12 bg-amber-800 rounded-full clay-shadow"></div>
            <div className="absolute top-1 left-2 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-1 right-2 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-4 left-4 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-5 left-3 w-2 h-1 bg-black rounded-full"></div>
            <div className="absolute -top-2 left-1 w-3 h-3 bg-amber-800 rounded-full clay-shadow"></div>
            <div className="absolute -top-2 right-1 w-3 h-3 bg-amber-800 rounded-full clay-shadow"></div>
          </div>
        );
      case "dog":
        return (
          <div className="relative">
            <div className="w-10 h-10 bg-yellow-400 rounded-full clay-shadow"></div>
            <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute top-3 left-3 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-4 left-2 w-2 h-1 bg-black rounded-full"></div>
            <div className="absolute -top-1 left-0 w-4 h-6 bg-yellow-400 rounded-full clay-shadow transform -rotate-45"></div>
            <div className="absolute -top-1 right-0 w-4 h-6 bg-yellow-400 rounded-full clay-shadow transform rotate-45"></div>
          </div>
        );
      case "cow":
        return (
          <div className="relative">
            <div className="w-14 h-10 bg-white rounded-full clay-shadow"></div>
            <div className="absolute top-2 left-3 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-2 right-3 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-4 left-5 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-5 left-4 w-2 h-1 bg-black rounded-full"></div>
            <div className="absolute top-1 left-1 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute top-3 right-1 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute -top-2 left-3 w-1 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute -top-2 right-3 w-1 h-3 bg-gray-600 rounded-full"></div>
          </div>
        );
      case "tree":
        return (
          <div className="relative">
            <div className="w-8 h-16 bg-amber-800 rounded-t-full"></div>
            <div className="w-16 h-16 bg-green-500 rounded-full -mt-8 ml-[-16px] clay-shadow"></div>
            <div className="absolute top-2 left-3 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      case "cloud":
        return (
          <div className="relative">
            <div className="w-16 h-10 bg-white rounded-full clay-shadow opacity-90"></div>
            <div className="absolute top-0 left-2 w-12 h-8 bg-white rounded-full clay-shadow"></div>
          </div>
        );
      case "flower":
        return (
          <div className="relative">
            <div className="w-3 h-3 bg-yellow-400 rounded-full clay-shadow"></div>
            <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const animationClass = type === "cloud" || type === "tree" 
    ? animationDelay > 0 ? "float-delayed" : "float-animation"
    : animationDelay > 0 
      ? animationDelay === 1 ? "pulse-delayed-1" : "pulse-delayed-2"
      : "pulse-gentle";

  return (
    <motion.div
      className={cn(
        "drop-shadow-lg",
        animationClass,
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animationDelay * 0.2, duration: 0.5 }}
    >
      {renderCharacter()}
    </motion.div>
  );
}
