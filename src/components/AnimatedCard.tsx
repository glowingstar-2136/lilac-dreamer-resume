
import React, { useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glassEffect?: 'default' | 'purple' | 'none';
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  glowColor = 'rgba(157, 112, 213, 0.3)',
  glassEffect = 'default',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // Calculate rotation based on mouse position
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25;
    
    setRotate({ x: y, y: x });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const glassClass = glassEffect === 'purple' 
    ? 'glass-purple' 
    : glassEffect === 'default'
      ? 'glass'
      : '';

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-xl transition-all duration-200',
        glassClass,
        isHovered ? 'shadow-lg' : 'shadow-md',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)` : 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: 'transform 0.2s ease'
      }}
      {...props}
    >
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: `radial-gradient(circle at ${rotate.y * 20 + 50}% ${rotate.x * 20 + 50}%, ${glowColor} 0%, transparent 50%)`,
            opacity: 0.3
          }}
        />
      )}
      {children}
    </div>
  );
};

export default AnimatedCard;
