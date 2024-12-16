import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  MessageCircle as MessageCircleIcon
} from 'lucide-react';

const BUILDING_POSITIONS = [
  { left: 0, height: 200 },
  { left: 6, height: 300 },
  { left: 12, height: 250 },
  { left: 18, height: 400 },
  { left: 25, height: 350 },
  { left: 32, height: 450 },
  { left: 40, height: 380 },
  { left: 48, height: 500 },
  { left: 56, height: 420 },
  { left: 64, height: 380 },
  { left: 71, height: 340 },
  { left: 78, height: 290 },
  { left: 84, height: 250 },
  { left: 90, height: 200 },
  { left: 95, height: 180 }
];

const MessageIcon = ({ type }) => {
  switch (type) {
    case 'message':
      return <MessageCircle size={15} />;
    case 'square':
      return <MessageSquare size={15} />;
    case 'multiple':
      return <MessagesSquare size={15} />;
    default:
      return <MessageCircleIcon size={15} />;
  }
};

const MessageStream = () => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef([]);
  const messageCount = useRef(0);

  const getRandomBuildingPosition = () => {
    const building = BUILDING_POSITIONS[Math.floor(Math.random() * BUILDING_POSITIONS.length)];
    return {
      x: (building.left / 100) * window.innerWidth,
      y: window.innerHeight - building.height - 20,
      building
    };
  };

  const generateCurvePath = (startX, startY) => {
    const endX = window.innerWidth / 2;
    const endY = window.innerHeight * 0.2; // Position above the text
    
    // Control points for the curve
    const cp1x = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 200;
    const cp1y = startY + (endY - startY) * 0.5 + (Math.random() - 0.5) * 100;
    
    return {
      x: [startX, cp1x, endX],
      y: [startY, cp1y, endY],
      scale: [0, 1, 0]
    };
  };

  const createMessage = () => {
    if (messages.length < 3) { // Limit concurrent messages
      const position = getRandomBuildingPosition();
      const path = generateCurvePath(position.x, position.y);
      const messageTypes = ['message', 'square', 'multiple'];
      
      const newMessage = {
        id: messageCount.current++,
        path,
        type: messageTypes[Math.floor(Math.random() * messageTypes.length)],
        buildingLeft: position.building.left
      };

      setMessages(prev => [...prev, newMessage]);
      messagesRef.current = [...messagesRef.current, newMessage];

      // Remove message after animation
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== newMessage.id));
        messagesRef.current = messagesRef.current.filter(m => m.id !== newMessage.id);
      }, 2000); // Duration matches animation
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createMessage();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {messages.map((message) => (
        <motion.div
          key={message.id}
          className="fixed"
          initial={{ scale: 0 }}
          animate={{
            x: message.path.x,
            y: message.path.y,
            scale: message.path.scale
          }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
          onAnimationComplete={() => {
            // Trigger building glow effect
            const buildingElement = document.querySelector(
              `[data-building="${message.buildingLeft}"]`
            );
            if (buildingElement) {
              buildingElement.classList.add('building-glow');
              setTimeout(() => {
                buildingElement.classList.remove('building-glow');
              }, 500);
            }
          }}
        >
          <motion.div
            className="text-blue-400 filter drop-shadow-lg"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              ease: "linear"
            }}
          >
            <MessageIcon type={message.type} />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

export default MessageStream;