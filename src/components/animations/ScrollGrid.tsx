import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../theme';

export const ScrollGrid: React.FC = () => {
  const theme = useTheme();
  const { scrollY } = useScroll();

  // Transform scroll position to move grid
  const gridY = useTransform(scrollY, [0, 1000], [0, -100]);
  const gridOpacity = useTransform(scrollY, [0, 500, 1000], [0.1, 0.3, 0.1]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        y: gridY,
        opacity: gridOpacity,
      }}
    >
      {/* Animated grid pattern */}
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'scale(1.2)' }}
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={theme.colors.accent.primary}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="2"
              fill={theme.colors.accent.primary}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </pattern>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          filter="url(#glow)"
        />
      </svg>

      {/* Animated data streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-1"
            style={{
              left: `${i * 16}%`,
              top: `${20 + i * 10}%`,
              width: '200px',
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent.primary}, transparent)`,
              opacity: 0.4,
            }}
            animate={{
              x: [-200, window.innerWidth + 200],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};