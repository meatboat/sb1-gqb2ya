import React, { useEffect, useRef } from 'react';
import { initFluidSimulation } from '../utils/fluidSimulation';

export const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const cleanup = initFluidSimulation(canvasRef.current);
    
    return () => {
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};