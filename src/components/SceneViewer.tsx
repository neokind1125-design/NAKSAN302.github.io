import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SceneViewerProps {
  onPrevScene: () => void;
  onNextScene: () => void;
  children: React.ReactNode;
}

export const SceneViewer: React.FC<SceneViewerProps> = ({
  onPrevScene,
  onNextScene,
  children,
}) => {
  return (
    <div 
      id="scene-viewer" 
      className="relative w-full overflow-hidden rounded-md border-3 border-[#2a2016] bg-[#0c0907] shadow-inner select-none flex-grow h-[525px]"
    >
      {/* Decorative metal rivets at scenic margins */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#3c2f22] border border-black z-30" />
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#3c2f22] border border-black z-30" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#3c2f22] border border-black z-30" />
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#3c2f22] border border-black z-30" />

      {/* Main Room Screen Area */}
      <div className="w-full h-full relative">
        {children}
      </div>

      {/* Left Navigation Arrow (Fixed vertically at center) */}
      <button
        onClick={onPrevScene}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-12 bg-gradient-to-r from-[#140e0a]/95 to-[#1c130e] hover:from-[#c49c5e] hover:to-[#eedcb3] border border-[#3e3226] hover:border-black text-[#a5947a] hover:text-black hover:shadow-[0_0_15px_rgba(196,156,94,0.65)] rounded-r flex items-center justify-center transition-all z-40 cursor-pointer active:scale-95"
        aria-label="이전 구역 조사"
      >
        <ChevronLeft size={24} className="stroke-[2.5]" />
      </button>

      {/* Right Navigation Arrow (Fixed vertically at center) */}
      <button
        onClick={onNextScene}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-12 bg-gradient-to-l from-[#140e0a]/95 to-[#1c130e] hover:from-[#c49c5e] hover:to-[#eedcb3] border border-[#3e3226] hover:border-black text-[#a5947a] hover:text-black hover:shadow-[0_0_15px_rgba(196,156,94,0.65)] rounded-l flex items-center justify-center transition-all z-40 cursor-pointer active:scale-95"
        aria-label="다음 구역 조사"
      >
        <ChevronRight size={24} className="stroke-[2.5]" />
      </button>

      {/* Panoramic HUD Angle Tag overlay */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/60 border border-[#2d2217] rounded-sm text-[8px] font-mono font-black text-[#c49c5e] tracking-widest uppercase z-35">
        PANORAMA_VIEW_FEED_LIVE
      </div>
    </div>
  );
};
