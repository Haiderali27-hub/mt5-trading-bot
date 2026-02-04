import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../theme';

export const ScrollEffects: React.FC = () => {
  const theme = useTheme();
  const { scrollY } = useScroll();

  // Create multiple scroll-based transformations
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 300, 800, 1200], [0, 0.8, 0.6, 0.2]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Parallax floating elements */}
      <motion.div
        style={{ y: y1, opacity, scale }}
        className="absolute inset-0"
      >
        {/* Tech circuit patterns */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`circuit-${i}`}
            className="absolute"
            style={{
              left: `${5 + (i * 6)}%`,
              top: `${10 + (i * 5)}%`,
              width: '80px',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent.primary}, transparent)`,
              opacity: 0.4,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + (i * 0.2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Mid-layer effects */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute inset-0"
      >
        {/* Glowing orbs */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              background: `radial-gradient(circle, ${theme.colors.accent.primary}40, transparent)`,
              filter: `blur(${2 + i}px)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Background layer effects */}
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute inset-0"
      >
        {/* Large geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 border-2 rotate-45"
          style={{
            borderColor: theme.colors.accent.primary,
            opacity: 0.1,
          }}
          animate={{
            rotate: [45, 405],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full border-2"
          style={{
            borderColor: theme.colors.accent.primary,
            opacity: 0.15,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tech lines connecting corners */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke={theme.colors.accent.primary}
            strokeWidth="1"
            opacity="0.2"
            strokeDasharray="5,5"
            animate={{
              strokeDashoffset: [0, -10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke={theme.colors.accent.primary}
            strokeWidth="1"
            opacity="0.2"
            strokeDasharray="5,5"
            animate={{
              strokeDashoffset: [0, 10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>

      {/* Data visualization elements */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity }}
      >
        {/* Animated bars like a spectrum analyzer */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end space-x-2 p-8">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`bar-${i}`}
              className="w-2"
              style={{
                backgroundColor: theme.colors.accent.primary,
                opacity: 0.3,
              }}
              animate={{
                height: [
                  `${10 + Math.random() * 40}px`,
                  `${20 + Math.random() * 60}px`,
                  `${10 + Math.random() * 40}px`,
                ],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};