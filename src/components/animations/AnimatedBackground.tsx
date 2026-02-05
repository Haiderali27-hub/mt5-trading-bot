import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../theme';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const AnimatedBackground: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const { scrollY } = useScroll();

  // Transform scroll position to control animation speed
  const scrollProgress = useTransform(scrollY, [0, 2000], [0, 1]);
  
  // Use scrollProgress to modify particle behavior
  React.useEffect(() => {
    const unsubscribe = scrollProgress.onChange((latest) => {
      // Modify particle speeds based on scroll
      particlesRef.current.forEach(particle => {
        particle.speed = 0.1 + latest * 0.5;
      });
    });
    
    return unsubscribe;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.2;
            ctx.strokeStyle = `rgba(93, 214, 44, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Draw and update particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.y -= particle.speed;
        particle.x += Math.sin(particle.y * 0.01) * 0.5;

        // Reset particle if it goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.fillStyle = `rgba(93, 214, 44, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = '#5DD62C';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ 
          opacity: 0.6,
          zIndex: -1
        }}
      />
      
      {/* Animated geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Floating hexagons */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <div
              className="w-8 h-8 border-2 rotate-45"
              style={{
                borderColor: theme.colors.accent.primary,
                opacity: 0.3,
                filter: `drop-shadow(0 0 8px ${theme.colors.accent.primary})`,
              }}
            />
          </motion.div>
        ))}

        {/* Flowing lines */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.2 }}
          animate={{
            pathLength: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.colors.accent.primary} stopOpacity="0" />
              <stop offset="50%" stopColor={theme.colors.accent.primary} stopOpacity="1" />
              <stop offset="100%" stopColor={theme.colors.accent.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,100 Q400,50 800,100 T1600,100"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.path
            d="M0,300 Q600,250 1200,300 T2400,300"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.svg>

        {/* Pulsing circles */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border"
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${30 + (i * 15)}%`,
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              borderColor: theme.colors.accent.primary,
              opacity: 0.2,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Matrix-style falling code */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`code-${i}`}
              className="absolute text-xs font-mono"
              style={{
                left: `${i * 5}%`,
                color: theme.colors.accent.primary,
                opacity: 0.3,
                fontFamily: 'monospace',
              }}
              animate={{
                y: [-100, window.innerHeight + 100],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              {Array.from({ length: 10 }, (_, j) => (
                <div key={j} style={{ marginBottom: '8px' }}>
                  {Math.random().toString(36).substring(2, 8)}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};