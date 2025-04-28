// src/components/Animation.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gileraLogo from '../assets/gilera.png';

const Animation = ({ isVisible, onComplete }) => {
  const animationCompleted = useRef(false);
  const logoRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Tiempos de animación ajustados
  const animationTiming = {
    downDuration: 800,
    rotateDuration: 1000,
    upDuration: 800,
    delayBeforeUp: 300,
    blurDuration: 500
  };

  useEffect(() => {
    if (isVisible && !animationCompleted.current) {
      const totalDuration = 
        animationTiming.downDuration +
        animationTiming.rotateDuration +
        animationTiming.delayBeforeUp +
        animationTiming.upDuration;

      const timeout = setTimeout(() => {
        animationCompleted.current = true;
        onComplete();
      }, totalDuration);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            ...containerStyle,
            backdropFilter: isLargeScreen ? "blur(12px)" : "blur(8px)"
          }}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ 
            opacity: 1,
            backdropFilter: isLargeScreen ? "blur(12px)" : "blur(8px)"
          }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ 
            duration: animationTiming.blurDuration / 1000,
            ease: "easeInOut"
          }}
        >
          <motion.img
            ref={logoRef}
            src={gileraLogo}
            alt="Gilera Logo"
            style={{
              ...logoStyle,
              width: isLargeScreen ? "25vw" : "50vw",
              maxWidth: "400px",
              minWidth: "150px"
            }}
            initial={{ 
              y: "-100vh", 
              opacity: 0, 
              scale: 0.8,
              filter: "drop-shadow(0 0 0px rgba(255,255,255,0))"
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 360,
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))"
            }}
            exit={{
              y: "-100vh",
              opacity: 0,
              scale: 0.8,
              filter: "drop-shadow(0 0 0px rgba(255,255,255,0))"
            }}
            transition={{
              y: { 
                duration: animationTiming.downDuration / 1000, 
                ease: [0.17, 0.67, 0.24, 1] // Curva personalizada
              },
              opacity: { 
                duration: animationTiming.downDuration / 1000,
                ease: "easeOut"
              },
              rotate: { 
                delay: animationTiming.downDuration / 1000,
                duration: animationTiming.rotateDuration / 1000,
                ease: "linear"
              },
              scale: {
                duration: 0.8,
                ease: "backOut"
              },
              filter: {
                duration: 0.6,
                ease: "easeOut"
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Estilos base
const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  overflow: "hidden"
};

const logoStyle = {
  height: "auto",
  objectFit: "contain",
  willChange: "transform, opacity, filter"
};

export default Animation;