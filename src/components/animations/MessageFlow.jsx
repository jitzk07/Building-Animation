import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  MessagesSquare,
  Send,
  MessageSquare
} from 'lucide-react';

const WhatsAppIcon = ({ size, color }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const TelegramIcon = ({ size, color }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const SlackIcon = ({ size, color }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const CometTrail = ({ startPoint, endPoint, color }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none'
      }}
    >
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: color,
            width: (36 - i * 3) + 'px',
            height: (36 - i * 3) + 'px',
            opacity: (1 - i * 0.1) * 0.2,
            filter: 'blur(8px)',
            left: startPoint.x,
            top: startPoint.y,
          }}
          animate={{
            x: [0, endPoint.x - startPoint.x],
            y: [0, endPoint.y - startPoint.y],
          }}
          transition={{
            duration: 2,
            ease: "linear",
            delay: i * 0.05,
          }}
        />
      ))}
    </motion.div>
  );
};

const MessageFlow = ({ onMessageReachCenter, buildingPositions, onMessageEmit, disabled }) => {
  const [activeMessages, setActiveMessages] = useState([]);

  const getConvergencePoint = useCallback(() => {
    const vh = window.innerHeight;
    return { 
      x: window.innerWidth / 2, 
      y: vh * 0.25 
    };
  }, []);

  const getResponsiveMessageSize = useCallback(() => {
    const vw = window.innerWidth;
    if (vw < 640) return 24;
    if (vw < 1024) return 36;
    return 64;
  }, []);

  const messageIconConfigs = [
    {
      component: Mail,
      color: "#4A9EFF",
      isLucide: true
    },
    {
      component: WhatsAppIcon,
      color: "#25D366",
      isLucide: false
    },
    {
      component: TelegramIcon,
      color: "#0088cc",
      isLucide: false
    },
    {
      component: SlackIcon,
      color: "#E01E5A",
      isLucide: false
    },
    {
      component: MessageCircle,
      color: "#7C3AED",
      isLucide: true
    },
    {
      component: MessagesSquare,
      color: "#F59E0B",
      isLucide: true
    },
    {
      component: Send,
      color: "#10B981",
      isLucide: true
    },
    {
      component: MessageSquare,
      color: "#EC4899",
      isLucide: true
    }
  ];

  const emitNewMessage = useCallback(() => {
    if (activeMessages.length >= 3 || disabled) return;

    const randomBuilding = buildingPositions[Math.floor(Math.random() * buildingPositions.length)];
    if (!randomBuilding) return;

    const iconConfig = messageIconConfigs[Math.floor(Math.random() * messageIconConfigs.length)];
    const messageSize = getResponsiveMessageSize();
    const convergencePoint = getConvergencePoint();
    
    const startPoint = {
      x: (randomBuilding.left / 100) * window.innerWidth + randomBuilding.width / 2,
      y: window.innerHeight - Math.random() * (randomBuilding.height / 2) - randomBuilding.height / 2
    };

    const buildingIndex = buildingPositions.indexOf(randomBuilding);
    
    const newMessage = {
      id: Date.now(),
      startPoint,
      endPoint: convergencePoint,
      buildingIndex,
      iconConfig,
      size: messageSize
    };

    setActiveMessages(prev => [...prev, newMessage]);
    onMessageEmit?.(buildingIndex);
  }, [activeMessages.length, buildingPositions, disabled, onMessageEmit, getResponsiveMessageSize, getConvergencePoint]);

  useEffect(() => {
    if (!disabled) {
      const interval = setInterval(emitNewMessage, 2000);
      return () => clearInterval(interval);
    }
  }, [emitNewMessage, disabled]);

  const renderIcon = (iconConfig, size) => {
    const IconComponent = iconConfig.component;
    if (iconConfig.isLucide) {
      return <IconComponent size={size} color={iconConfig.color} />;
    }
    return <IconComponent size={size} color={iconConfig.color} />;
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 150 }}>
      {activeMessages.map((message) => (
        <div key={message.id}>
          <CometTrail 
            startPoint={message.startPoint}
            endPoint={message.endPoint}
            color={message.iconConfig.color}
          />
          <motion.div
            style={{
              position: 'absolute',
              left: message.startPoint.x,
              top: message.startPoint.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              x: message.endPoint.x - message.startPoint.x,
              y: message.endPoint.y - message.startPoint.y,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
            onAnimationComplete={() => {
              setActiveMessages(prev => prev.filter(msg => msg.id !== message.id));
              onMessageReachCenter(message.buildingIndex);
            }}
          >
            {renderIcon(message.iconConfig, message.size)}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default MessageFlow;