
import { useState, useEffect, useCallback } from 'react';
import { Position } from '../types';

export const useDragging = (initialPosition: Position) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent, assistantRef: React.RefObject<HTMLDivElement>) => {
    if (!assistantRef.current) return;
    
    setIsDragging(true);
    const rect = assistantRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const maxX = window.innerWidth - 64;
      const maxY = window.innerHeight - 64;
      const newX = Math.max(0, Math.min(maxX, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(maxY, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    position,
    handleMouseDown
  };
};
