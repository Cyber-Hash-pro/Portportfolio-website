import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Check if element has data-cursor attribute
      if (e.target.dataset.cursor) {
        setCursorText(e.target.dataset.cursor);
        setCursorVariant("text");
      } 
      // Check if element is clickable
      else if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.onclick) {
        setCursorVariant("pointer");
        setIsPointer(true);
        setCursorText("");
      } 
      // Check if element has data-cursor-hide attribute
      else if (e.target.dataset.cursorHide) {
        setCursorVariant("hidden");
        setIsHidden(true);
      }
      // Default state
      else {
        setCursorVariant("default");
        setIsPointer(false);
        setCursorText("");
        setIsHidden(false);
      }
    };

    // Hide cursor when mouse leaves window
    const handleMouseLeave = () => {
      setCursorVariant("hidden");
    };

    // Show cursor when mouse enters window
    const handleMouseEnter = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const variants = {
    default: {
      x: mousePos.x - 8,
      y: mousePos.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference"
    },
    pointer: {
      x: mousePos.x - 15,
      y: mousePos.y - 15,
      height: 30,
      width: 30,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(2px)"
    },
    text: {
      x: mousePos.x - 40,
      y: mousePos.y - 40,
      height: 80,
      width: "auto",
      backgroundColor: "#ffffff",
      color: "#000000"
    },
    hidden: {
      x: mousePos.x - 8,
      y: mousePos.y - 8,
      height: 0,
      width: 0,
      opacity: 0
    }
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
    mass: 0.2
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full"
        variants={variants}
        animate={cursorVariant}
        transition={spring}
        style={{
          originX: 0.5,
          originY: 0.5
        }}
      >
        {cursorVariant === "text" && (
          <span className="text-xs font-medium px-2 whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>
      
      {/* Outer ring for pointer state */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 border-2 border-white rounded-full"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          opacity: isPointer ? 1 : 0,
          scale: isPointer ? 1 : 0.5,
          height: 40,
          width: 40
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Trailing dots effect */}
      {!isHidden && cursorVariant !== "text" && (
        <>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-30 bg-white rounded-full"
            animate={{
              x: mousePos.x - 4,
              y: mousePos.y - 4,
              opacity: 0.4
            }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 40,
              delay: 0.05
            }}
            style={{
              height: 8,
              width: 8
            }}
          />
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-20 bg-white rounded-full"
            animate={{
              x: mousePos.x - 2,
              y: mousePos.y - 2,
              opacity: 0.2
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 35,
              delay: 0.1
            }}
            style={{
              height: 4,
              width: 4
            }}
          />
        </>
      )}
    </>
  );
};

export default MouseFollower;