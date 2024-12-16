// src/components/city/CityBackground.jsx
import React, { useRef, useEffect, useState } from 'react';
import Building from './Building';

const CityBackground = ({ onBuildingsLoad }) => {
  const [buildingConfigs, setBuildingConfigs] = useState([]);
  const [glowingBuildings, setGlowingBuildings] = useState([]);
  
  useEffect(() => {
    const buildings = [
      { height: 200, width: 25, left: 0, delay: 0, style: 'classic', lightColor: 'yellow' },
      { height: 300, width: 35, left: 6, delay: 0.1, style: 'modern' },
      { height: 250, width: 30, left: 12, delay: 0.2, style: 'spire' },
      { height: 400, width: 40, left: 18, delay: 0.3, style: 'skyscraper' },
      { height: 350, width: 45, left: 25, delay: 0.4, style: 'tiered' },
      { height: 450, width: 50, left: 32, delay: 0.5, style: 'modern' },
      { height: 380, width: 42, left: 40, delay: 0.6, style: 'spire' },
      { height: 500, width: 55, left: 48, delay: 0.7, style: 'skyscraper' },
      { height: 420, width: 48, left: 56, delay: 0.8, style: 'modern' },
      { height: 380, width: 44, left: 64, delay: 0.9, style: 'tiered' },
      { height: 340, width: 38, left: 71, delay: 1.0, style: 'classic', lightColor: 'yellow' },
      { height: 290, width: 32, left: 78, delay: 1.1, style: 'spire' },
      { height: 250, width: 28, left: 84, delay: 1.2, style: 'modern' },
      { height: 200, width: 25, left: 90, delay: 1.3, style: 'classic' },
      { height: 180, width: 22, left: 95, delay: 1.4, style: 'modern' }
    ];
    
    setBuildingConfigs(buildings);
    onBuildingsLoad?.(buildings);
  }, []);

  return (
    <div className="absolute inset-0">
      {buildingConfigs.map((building, index) => (
        <Building 
          key={index} 
          {...building}
          isGlowing={glowingBuildings.includes(index)}
        />
      ))}
    </div>
  );
};

export default CityBackground;