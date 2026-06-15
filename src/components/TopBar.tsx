import React from 'react';
import { TimerDisplay } from './TimerDisplay';
import { Settings, Lightbulb, ClipboardList } from 'lucide-react';

interface TopBarProps {
  timerSeconds: number;
  clueCount: number;
  hintCount: number;
  onOpenClues: () => void;
  onOpenSettings: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  timerSeconds,
  clueCount,
  hintCount,
  onOpenClues,
  onOpenSettings,
}) => {
  return (
    <header 
      id="top-bar"
      className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#30241b] bg-gradient-to-b from-[#140f0c] to-[#0a0705] px-6 py-3 select-none relative z-40"
    >
      {/* Decorative brass rivets at the corners */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#c49c5e]/35 border border-black" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c49c5e]/35 border border-black" />

      {/* Top Left Logo Title */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-0.5">
        <h1 className="font-serif text-[17px] font-black text-[#c49c5e] tracking-wider leading-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          낙산관 방탈출
        </h1>
        <span className="font-mono text-[9px] tracking-widest text-[#a5947a] uppercase font-bold">
          ACT 3. 교수 연구실
        </span>
      </div>

      {/* Top Center Retro Countdown Clock */}
      <div className="flex justify-center flex-shrink-0">
        <TimerDisplay seconds={timerSeconds} />
      </div>

      {/* Top Right utility quickbuttons */}
      <div className="flex items-center gap-5">
        <button 
          onClick={onOpenClues} 
          className="flex flex-col items-center gap-1.5 group cursor-pointer transition text-[#e0dcd5] hover:text-[#c49c5e] relative py-1"
        >
          {clueCount > 0 && (
            <div className="absolute top-[-4px] right-[-8px] bg-[#ea463c] text-white text-[9.5px] font-black w-[17px] h-[17px] rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(234,70,60,0.6)] z-10 animate-bounce">
              {clueCount}
            </div>
          )}
          <ClipboardList size={19} className="text-[#a5947a] group-hover:text-[#c49c5e] transition" />
          <span className="text-[10px] text-[#8c867c] group-hover:text-stone-300 transition font-serif leading-none font-medium">단서함</span>
        </button>

        <button 
          onClick={onOpenClues} 
          className="flex flex-col items-center gap-1.5 group cursor-pointer transition text-[#e0dcd5] hover:text-[#c49c5e] relative py-1"
        >
          <Lightbulb size={19} className="text-[#a5947a] group-hover:text-[#c49c5e] transition" />
          <span className="text-[10px] text-[#8c867c] group-hover:text-stone-300 transition font-serif leading-none font-medium">실마리</span>
        </button>

        <button 
          onClick={onOpenSettings} 
          className="flex flex-col items-center gap-1.5 group cursor-pointer transition text-[#e0dcd5] hover:text-[#c49c5e] py-1"
        >
          <Settings size={19} className="text-[#a5947a] group-hover:text-[#c49c5e] transition" />
          <span className="text-[10px] text-[#8c867c] group-hover:text-stone-300 transition font-serif leading-none font-medium">메뉴</span>
        </button>
      </div>
    </header>
  );
};
