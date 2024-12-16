import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  TrendingUp
} from 'lucide-react';

const CHART_TYPES = {
  LINE: 'LINE',
  BAR: 'BAR',
  AREA: 'AREA',
  PIE: 'PIE',
  TREND: 'TREND'
};

const CHART_COLORS = {
  [CHART_TYPES.LINE]: {
    color: "#FF6B6B",
    glow: "rgba(255, 107, 107, 0.4)"
  },
  [CHART_TYPES.BAR]: {
    color: "#4ECDC4",
    glow: "rgba(78, 205, 196, 0.4)"
  },
  [CHART_TYPES.AREA]: {
    color: "#FFD93D",
    glow: "rgba(255, 217, 61, 0.4)"
  },
  [CHART_TYPES.PIE]: {
    color: "#95D1CC",
    glow: "rgba(149, 209, 204, 0.4)"
  },
  [CHART_TYPES.TREND]: {
    color: "#FF8FB1",
    glow: "rgba(255, 143, 177, 0.4)"
  }
};

const EnhancedChartEmergence = ({ convergencePoint }) => {
  const [activeChartIndex, setActiveChartIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const charts = [
    { icon: LineChart, type: CHART_TYPES.LINE },
    { icon: BarChart, type: CHART_TYPES.BAR },
    { icon: AreaChart, type: CHART_TYPES.AREA },
    { icon: PieChart, type: CHART_TYPES.PIE },
    { icon: TrendingUp, type: CHART_TYPES.TREND }
  ];

  const getResponsiveSize = () => {
    if (typeof window === 'undefined') return 60;
    const vw = window.innerWidth;
    return vw < 640 ? 40 : vw < 1024 ? 60 : 70;
  };

  useEffect(() => {
    setActiveChartIndex(0);
  }, []);
  
  useEffect(() => {
    if (!isAnimating && activeChartIndex >= -1) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        if (activeChartIndex < charts.length - 1) {
          setActiveChartIndex(prev => prev + 1);
        } else {
          setTimeout(() => {
            setActiveChartIndex(-1);
            setTimeout(() => {
              setActiveChartIndex(0);
            }, 500);
          }, 5000);
        }
        setIsAnimating(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [activeChartIndex, isAnimating, charts.length]);

  return (
    <div 
      className="absolute left-1/2 transform -translate-x-1/2" 
      style={{ top: convergencePoint }}
    >
      <div className="relative flex justify-center items-center" style={{ gap: '60px' }}>
        {charts.map((chart, index) => {
          const Icon = chart.icon;
          const colorConfig = CHART_COLORS[chart.type];
          
          return (
            <AnimatePresence key={index}>
              {index <= activeChartIndex && (
                <motion.div
                  initial={{ 
                    opacity: 0,
                    scale: 0.5,
                    x: 0,
                    y: 100
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    y: -100
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.3
                  }}
                  style={{
                    color: colorConfig.color,
                    filter: `drop-shadow(0 0 10px ${colorConfig.glow})`
                  }}
                >
                  <Icon size={getResponsiveSize()} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

export { EnhancedChartEmergence };