import React from 'react';

interface TimerDisplayProps {
  seconds: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds }) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      id="timer-display" 
      className="bg-[#050403] border-2 border-[#8d2522] px-6 py-1.5 rounded flex flex-col items-center shadow-[0_0_15px_rgba(239,68,68,0.4)] select-none relative overflow-hidden"
    >
      <span className="text-[7px] text-[#8d2522] font-mono tracking-widest uppercase mb-0.5 leading-none">SYSTEM_REMAINING_DIAL</span>
      <div 
        className="font-mono text-2xl text-[#ea463c] font-black tracking-widest leading-none"
        style={{ textShadow: '0 0 8px rgba(234, 70, 60, 0.85)', fontFamily: "'Courier New', Courier, monospace" }}
      >
        {formatTime(seconds)}
      </div>
      {/* Decorative vertical scan lines on screen */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none" />
    </div>
  );
};
