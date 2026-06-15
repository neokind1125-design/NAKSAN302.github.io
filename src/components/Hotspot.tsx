import React from 'react';
import { Search } from 'lucide-react';

interface HotspotProps {
  x: number; // percentage width
  y: number; // percentage height
  title: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
  onInspectClick?: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
}

export const Hotspot: React.FC<HotspotProps> = ({
  x,
  y,
  title,
  isActive,
  onClick,
  onInspectClick,
  icon,
}) => {
  return (
    <div 
      id={`hotspot-${title}`}
      className="absolute z-35"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <button
        onClick={onClick}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 relative group cursor-pointer border-2 shadow-lg active:scale-90 select-none ${
          isActive 
            ? 'border-[#c49c5e] bg-amber-950/40 shadow-[0_0_20px_#c49c5e]' 
            : 'border-[#3a2016] bg-[#140e0a]/90 hover:border-[#c49c5e] hover:shadow-[0_0_12px_rgba(196,156,94,0.6)] hover:scale-105'
        }`}
        type="button"
      >
        {/* Subtle breathing outer ring outline */}
        <div className="absolute -inset-1.5 border border-[#c49c5e]/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping pointer-events-none" />

        {icon ? (
          <div className="text-[#c49c5e]">{icon}</div>
        ) : (
          <Search size={14} className="text-[#c49c5e]" />
        )}
      </button>

      {/* Floating Detailed Tooltip */}
      {isActive && (
        <div 
          onClick={onInspectClick || onClick}
          className="absolute bottom-11 left-1/2 -translate-x-1/2 w-32 bg-[rgba(10,8,7,0.96)] border-2 border-[#c49c5e] p-2 rounded-md hover:scale-105 transition-all text-center pointer-events-auto cursor-pointer z-40 select-none shadow-[0_0_20px_rgba(196,156,94,0.6)] animate-pulse"
          style={{ animationDuration: '3s' }}
        >
          {/* Decorative Arrow pointing downwards */}
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#c49c5e]" />
          
          <div className="text-[11.5px] text-stone-100 font-extrabold font-serif truncate mb-0.5 leading-tight select-none">
            {title}
          </div>
          <div className="text-[10px] text-[#c49c5e] font-sans font-black flex items-center justify-center gap-1 select-none">
            ▶ 조사하기
          </div>
        </div>
      )}
    </div>
  );
};
