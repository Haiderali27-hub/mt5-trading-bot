import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';

export const FloatingTech: React.FC = () => {
  const theme = useTheme();

  // Tech symbols and patterns
  const techSymbols = ['◊', '◈', '◇', '⬟', '⬢', '⬡', '▲', '▼', '◀', '▶'];
  const binaryStrings = ['1010', '1100', '0110', '1001', '0101', '1111', '0000'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating tech symbols */}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-2xl font-mono"
          style={{
            color: theme.colors.accent.primary,
            opacity: 0.2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          {techSymbols[Math.floor(Math.random() * techSymbols.length)]}
        </motion.div>
      ))}

      {/* Binary code streams */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute font-mono text-xs"
          style={{
            color: theme.colors.accent.primary,
            opacity: 0.3,
            left: `${i * 8}%`,
            writingMode: 'vertical-rl',
          }}
          animate={{
            y: [-50, window.innerHeight + 50],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          {Array.from({ length: 20 }, (_, j) => (
            <div key={j} style={{ marginBottom: '4px' }}>
              {binaryStrings[Math.floor(Math.random() * binaryStrings.length)]}
            </div>
          ))}
        </motion.div>
      ))}

      {/* Holographic panels */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`panel-${i}`}
          className="absolute border rounded-lg"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            width: `${80 + i * 20}px`,
            height: `${60 + i * 15}px`,
            borderColor: theme.colors.accent.primary,
            background: `linear-gradient(135deg, ${theme.colors.accent.primary}10, transparent)`,
            opacity: 0.4,
          }}
          animate={{
            rotateY: [0, 180, 360],
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        >
          {/* Panel content lines */}
          <div className="p-2 space-y-1">
            {Array.from({ length: 3 }, (_, j) => (
              <motion.div
                key={j}
                className="h-1 rounded"
                style={{
                  backgroundColor: theme.colors.accent.primary,
                  opacity: 0.5,
                }}
                animate={{
                  width: ['20%', '80%', '20%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: j * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Energy waves */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="waveGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.colors.accent.primary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={theme.colors.accent.primary} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {Array.from({ length: 4 }, (_, i) => (
          <motion.circle
            key={`wave-${i}`}
            cx="50%"
            cy="50%"
            fill="url(#waveGradient)"
            initial={{ r: 0, opacity: 0.6 }}
            animate={{
              r: [0, 400],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </svg>

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(0deg, transparent 0%, ${theme.colors.accent.primary}20 50%, transparent 100%)`,
            `linear-gradient(180deg, transparent 0%, ${theme.colors.accent.primary}20 50%, transparent 100%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity: 0.1 }}
      />

      {/* Corner tech elements */}
      <div className="absolute top-4 left-4">
        <motion.div
          className="w-16 h-16 border-l-2 border-t-2"
          style={{ borderColor: theme.colors.accent.primary }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="absolute top-4 right-4">
        <motion.div
          className="w-16 h-16 border-r-2 border-t-2"
          style={{ borderColor: theme.colors.accent.primary }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
      
      <div className="absolute bottom-4 left-4">
        <motion.div
          className="w-16 h-16 border-l-2 border-b-2"
          style={{ borderColor: theme.colors.accent.primary }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      
      <div className="absolute bottom-4 right-4">
        <motion.div
          className="w-16 h-16 border-r-2 border-b-2"
          style={{ borderColor: theme.colors.accent.primary }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>
    </div>
  );
};