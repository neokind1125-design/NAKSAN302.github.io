import React from 'react';

interface GameLayoutProps {
  children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return (
    <div 
      id="game-layout" 
      className="min-h-screen bg-[#0d0a08] text-stone-100 flex flex-col relative overflow-hidden select-none"
    >
      {/* Absolute Backdrop Vignette Vignette Gradient (Korean horror style) */}
      <div 
        className="absolute inset-0 pointer-events-none z-30" 
        style={{
          boxShadow: 'inset 0 0 110px 40px rgba(0,0,0,0.92)',
          background: 'radial-gradient(circle, transparent 35%, rgba(13,10,8,0.7) 70%, rgba(0,0,0,0.98) 100%)'
        }}
      />

      {/* Retro CRT Scan lines + Screen Grain/Paper Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.045] pointer-events-none z-30 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.25) 100%),
            repeating-linear-gradient(rgba(18,16,14,0.1) 0px, rgba(18,16,14,0.1) 1px, transparent 1px, transparent 4px)
          `
        }}
      />

      {/* Subtle Dust speckled Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-30 mix-blend-color-burn bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ffffff'/%3E%3Cpath d='M2,78 C12,82 8,92 18,98' stroke='%23000000' stroke-width='0.7' fill='none' opacity='0.45'/%3E%3Ccircle cx='45' cy='15' r='1' fill='%23000000' opacity='0.35'/%3E%3Ccircle cx='87' cy='72' r='0.8' fill='%23000000' opacity='0.4'/%3E%3Cpath d='M80,12 C82,18 78,25 72,28' stroke='%23000000' stroke-width='0.5' fill='none' opacity='0.25'/%3E%3C/svg%3E")`
        }}
      />

      {/* Actual Content Container */}
      <div className="relative w-full max-w-7xl mx-auto flex-grow flex flex-col p-4 md:p-6 z-20">
        <div className="bg-[#120f0c]/60 border-2 border-[#261d15] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.85)] flex-grow flex flex-col relative overflow-hidden backdrop-blur-xs">
          {/* Subtle gold visual trim framing the core structure */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#c49c5e]/80 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#c49c5e]/80 to-transparent" />
          
          {children}
        </div>
      </div>
    </div>
  );
};
