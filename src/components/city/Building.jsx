import React from 'react';
import { motion } from 'framer-motion';

const Building = ({ 
  height, 
  width, 
  left, 
  delay, 
  style = 'modern', 
  lightColor = 'blue',
  onEmitMessage,
  isGlowing
}) => {
  const getWindowGrid = () => {
    switch (style) {
      case 'modern': return { rows: Math.floor(height/40), cols: 3 };
      case 'classic': return { rows: Math.floor(height/30), cols: 2 };
      case 'skyscraper': return { rows: Math.floor(height/25), cols: 4 };
      case 'spire': return { rows: Math.floor(height/35), cols: 3 };
      case 'tiered': return { rows: Math.floor(height/45), cols: 3 };
      default: return { rows: Math.floor(height/40), cols: 3 };
    }
  };

  const { rows, cols } = getWindowGrid();

  const renderBuildingTop = () => {
    switch (style) {
      case 'spire':
        return (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-20 bg-blue-800/30" />
            <div className="w-4 h-4 rounded-full bg-red-500/50 absolute -top-2 left-1/2 transform -translate-x-1/2" />
          </div>
        );
      case 'tiered':
        return (
          <>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-blue-800/30" />
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-1/2 h-6 bg-blue-800/30" />
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-1/4 h-4 bg-blue-800/30" />
          </>
        );
      case 'skyscraper':
        return (
          <div className="absolute -top-12 left-0 right-0">
            <div className="w-full h-12 bg-blue-800/30 transform skew-y-6" />
          </div>
        );
      default:
        return null;
    }
  };

  const buildingGlow = {
    initial: { opacity: 0 },
    animate: { 
      opacity: isGlowing ? [0, 0.6, 0] : 0 
    },
    transition: { 
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  };

  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: `${left}%`, width: `${width}px` }}
      initial={{ height: 0 }}
      animate={{ height: `${height}px` }}
      transition={{ duration: 1, delay }}
    >
      <div className={`relative w-full h-full ${style === 'modern' ? 'rounded-t-lg' : ''}`}>
        {/* Building base */}
        <div className={`w-full h-full bg-blue-900/30 backdrop-blur-sm border border-blue-500/20 
          ${style === 'modern' ? 'rounded-t-lg' : ''}
          ${style === 'skyscraper' ? 'bg-gradient-to-b from-blue-900/40 to-blue-900/20' : ''}
          relative`}
        >
          {renderBuildingTop()}
          
          {/* Building glow effect */}
          <motion.div
            className="absolute inset-0 bg-blue-400/20 rounded-t-lg"
            initial="initial"
            animate="animate"
            variants={buildingGlow}
          />
          
          {Array.from({ length: rows }).map((_, row) => (
            <div 
              key={row} 
              className="absolute w-full flex justify-around" 
              style={{ 
                bottom: `${(row * (height/rows)) + 10}px`,
                padding: `${style === 'modern' ? '0 15%' : '0 10%'}`
              }}
            >
              {Array.from({ length: cols }).map((_, col) => (
                <motion.div
                  key={col}
                  className={`w-3 h-3 ${lightColor === 'blue' ? 'bg-blue-400/30' : 'bg-yellow-400/30'}`}
                  animate={{ 
                    opacity: [0.2, 0.8, 0.2],
                    backgroundColor: lightColor === 'blue' 
                      ? ['rgba(59, 130, 246, 0.3)', 'rgba(147, 197, 253, 0.3)', 'rgba(59, 130, 246, 0.3)']
                      : ['rgba(250, 204, 21, 0.3)', 'rgba(253, 224, 71, 0.3)', 'rgba(250, 204, 21, 0.3)']
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity 
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Building;