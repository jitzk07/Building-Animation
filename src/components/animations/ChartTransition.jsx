import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  TrendingUp
} from 'lucide-react';

const CHART_COLORS = {
  LineChart: {
    color: "#FF6B6B",
    glow: "rgba(255, 107, 107, 0.6)",
    gradient: ["#FF4B4B", "#FF8787"]
  },
  BarChart: {
    color: "#4ECDC4",
    glow: "rgba(78, 205, 196, 0.6)",
    gradient: ["#2EBEB5", "#6EEAE1"]
  },
  AreaChart: {
    color: "#FFD93D",
    glow: "rgba(255, 217, 61, 0.6)",
    gradient: ["#FFD100", "#FFE066"]
  },
  PieChart: {
    color: "#95D1CC",
    glow: "rgba(149, 209, 204, 0.6)",
    gradient: ["#75C1BB", "#B5E8E4"]
  },
  TrendingUp: {
    color: "#FF8FB1",
    glow: "rgba(255, 143, 177, 0.6)",
    gradient: ["#FF6F99", "#FFACC5"]
  }
};

const getResponsiveValues = () => {
  if (typeof window === 'undefined') return { chartSize: 48, spacing: 60 };
  const vw = window.innerWidth;

  if (vw < 640) {
    return { chartSize: 32, spacing: 40 }; // Smaller for small screens
  } else if (vw < 1024) {
    return { chartSize: 48, spacing: 60 };
  } else {
    return { chartSize: 60, spacing: 80 }; // Default size
  }
};


const getConvergencePoint = () => {
  if (typeof window === 'undefined') return 180;
  const vh = window.innerHeight;
  return vh * 0.20;
};

const ChartComponent = ({ 
  icon: Icon, 
  position,
  size,
  colorConfig,
  shouldGlow,
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        color: colorConfig.color,
        filter: `drop-shadow(0 0 15px ${colorConfig.glow})`,
        top: getConvergencePoint(),
        left: position,
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.5,
        x: "50vw",
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 1.2
      }}
    >
      <motion.div>
        <Icon 
          size={size} 
          strokeWidth={1.5}
        />
        
        <motion.div
          className="absolute inset-0 blur-xl"
          style={{
            background: `radial-gradient(circle, ${colorConfig.gradient[0]} 0%, ${colorConfig.gradient[1]} 100%)`,
            transform: 'scale(1.3)',
            zIndex: -1,
            opacity: 0.3
          }}
        />

        <AnimatePresence>
          {shouldGlow && (
            <motion.div
              className="absolute inset-0 blur-2xl"
              style={{
                background: `radial-gradient(circle, ${colorConfig.gradient[0]} 0%, transparent 70%)`,
                transform: 'scale(1.6)',
                zIndex: -2,
              }}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [1.2, 1.8, 2],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ChartTransition = ({ textWidth, onMessageConverge }) => {
  const [chartsVisible, setChartsVisible] = useState(false);
  const [glowingChartIndex, setGlowingChartIndex] = useState(null);
  const { chartSize, spacing } = getResponsiveValues();

  const calculateChartPosition = useCallback((index) => {
    const totalCharts = 5;
    const totalWidth = (totalCharts - 1) * spacing;
    const containerCenter = window.innerWidth / 2;
    const startPosition = containerCenter - (totalWidth / 2);
    return startPosition + (index * spacing);
  }, [spacing]);

  const charts = [
    { icon: LineChart, size: chartSize, colorConfig: CHART_COLORS.LineChart },
    { icon: BarChart, size: chartSize, colorConfig: CHART_COLORS.BarChart },
    { icon: AreaChart, size: chartSize, colorConfig: CHART_COLORS.AreaChart },
    { icon: PieChart, size: chartSize, colorConfig: CHART_COLORS.PieChart },
    { icon: TrendingUp, size: chartSize, colorConfig: CHART_COLORS.TrendingUp }
  ];

  useEffect(() => {
    if (!chartsVisible) {
      setChartsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleMessageConverge = () => {
      const randomIndex = Math.floor(Math.random() * charts.length);
      setGlowingChartIndex(randomIndex);
      
      setTimeout(() => {
        setGlowingChartIndex(null);
      }, 1000);
    };

    if (onMessageConverge) {
      onMessageConverge(handleMessageConverge);
    }
  }, [charts.length, onMessageConverge]);

  if (!chartsVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 100 }}>
      {charts.map((chart, index) => (
        <ChartComponent
          key={index}
          icon={chart.icon}
          position={calculateChartPosition(index)}
          size={chart.size}
          colorConfig={chart.colorConfig}
          shouldGlow={glowingChartIndex === index}
        />
      ))}

      <motion.div
        className="fixed left-1/2 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
          width: '400px',
          height: '400px',
          top: getConvergencePoint(),
          zIndex: 99
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ChartTransition;