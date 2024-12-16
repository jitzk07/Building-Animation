import React, { useState, useEffect, useRef } from 'react';
import MessageFlow from './MessageFlow';
import ChartTransition from './ChartTransition';

const AnimationOrchestrator = ({ buildings, textWidth }) => {
  const [glowingBuildings, setGlowingBuildings] = useState([]);
  const [showCharts, setShowCharts] = useState(false);
  const messageCountRef = useRef(0);
  
  const handleMessageReachCenter = (buildingIndex) => {
    // Remove building glow effect
    setGlowingBuildings(prev => prev.filter(idx => idx !== buildingIndex));
    
    messageCountRef.current += 1;
    
    // After collecting 3 messages, trigger chart transition
    if (messageCountRef.current >= 3) {
      setShowCharts(true);
      messageCountRef.current = 0;
    }
  };

  useEffect(() => {
    if (showCharts) {
      // Reset after charts finish their animation cycle
      const timer = setTimeout(() => {
        setShowCharts(false);
      }, 10000); // Charts display for 10s
      return () => clearTimeout(timer);
    }
  }, [showCharts]);

  const handleMessageEmit = (buildingIndex) => {
    setGlowingBuildings(prev => [...prev, buildingIndex]);
  };

  // Get the convergence point consistently for both messages and charts
  const getConvergencePoint = () => {
    const vh = window.innerHeight;
    const titleOffset = vh * 0.25; // 25% of viewport height
    return titleOffset;
  };

  return (
    <>
      <MessageFlow 
        buildingPositions={buildings}
        onMessageReachCenter={handleMessageReachCenter}
        onMessageEmit={handleMessageEmit}
        disabled={showCharts}
        convergencePoint={getConvergencePoint()}
      />
      
      {showCharts && (
        <ChartTransition 
          textWidth={textWidth}
          onComplete={() => setShowCharts(false)}
          convergencePoint={getConvergencePoint()}
        />
      )}
    </>
  );
};

export default AnimationOrchestrator;