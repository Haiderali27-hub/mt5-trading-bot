import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../theme';

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  pulse: number;
}

export const NeuralNetwork: React.FC = () => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const { scrollY } = useScroll();

  // Transform scroll to control network activity
  const networkOpacity = useTransform(scrollY, [0, 300, 800], [0.2, 0.6, 0.3]);
  const networkScale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  useEffect(() => {
    // Initialize neural network nodes
    const initNetwork = () => {
      const nodes: Node[] = [];
      const nodeCount = 25;
      
      // Create nodes in a grid-like pattern with some randomness
      for (let i = 0; i < nodeCount; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        
        nodes.push({
          id: i,
          x: 100 + col * 200 + (Math.random() - 0.5) * 80,
          y: 100 + row * 150 + (Math.random() - 0.5) * 60,
          connections: [],
          pulse: Math.random(),
        });
      }

      // Create connections between nearby nodes
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            
            if (distance < 250 && Math.random() > 0.6) {
              node.connections.push(j);
            }
          }
        });
      });

      nodesRef.current = nodes;
    };

    initNetwork();
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity: networkOpacity,
        scale: networkScale,
      }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.colors.accent.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.colors.accent.primary} stopOpacity="0.2" />
          </radialGradient>
          
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Render connections */}
        {nodesRef.current.map((node) =>
          node.connections.map((connectionId) => {
            const targetNode = nodesRef.current[connectionId];
            if (!targetNode) return null;

            return (
              <motion.line
                key={`connection-${node.id}-${connectionId}`}
                x1={node.x}
                y1={node.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={theme.colors.accent.primary}
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            );
          })
        )}

        {/* Render nodes */}
        {nodesRef.current.map((node) => (
          <motion.g key={`node-${node.id}`}>
            {/* Node glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="url(#nodeGradient)"
              filter="url(#nodeGlow)"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2 + node.pulse * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.pulse * 2,
              }}
            />
            
            {/* Node core */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill={theme.colors.accent.primary}
              animate={{
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5 + node.pulse,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.pulse,
              }}
            />
          </motion.g>
        ))}

        {/* Data pulse animations */}
        {nodesRef.current.slice(0, 8).map((node, i) => (
          <motion.circle
            key={`pulse-${node.id}`}
            cx={node.x}
            cy={node.y}
            r="2"
            fill={theme.colors.accent.primary}
            opacity="0.8"
            animate={{
              r: [2, 20, 2],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>

      {/* Floating data packets */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`packet-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: theme.colors.accent.primary,
              boxShadow: `0 0 10px ${theme.colors.accent.primary}`,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};