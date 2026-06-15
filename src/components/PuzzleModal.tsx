import React from 'react';
import { X } from 'lucide-react';

interface PuzzleModalProps {
  onClose: () => void;
  title: string;
  technicalId?: string;
  children: React.ReactNode;
}

export const PuzzleModal: React.FC<PuzzleModalProps> = ({
  onClose,
  title,
  technicalId = 'SYSTEM_SECURE_VAULT_MODAL',
  children,
}) => {
  return (
    <div 
      id="puzzle-modal" 
      className="fixed inset-0 z-[100] grid place-items-center bg-black/92 p-4 backdrop-blur-md overflow-y-auto"
    >
      <div 
        className="w-full max-w-lg border-4 border-[#3e3226] bg-[#16110e] text-[#f4e4bd] p-6 shadow-[0px_0px_50px_rgba(196,156,94,0.35)] relative rounded-sm"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.65) 100%)`
        }}
      >
        {/* Vintage metallic corners decoration */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#c49c5e]/55 border border-black" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c49c5e]/55 border border-black" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#c49c5e]/55 border border-black" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c49c5e]/55 border border-black" />

        {/* Close Button top-right */}
        <div className="absolute right-4 top-4">
          <button
            type="button"
            onClick={onClose}
            className="p-1 px-3 border border-stone-800 bg-[#2b190f] hover:bg-[#8d2522] hover:text-white rounded text-stone-300 transition cursor-pointer active:scale-95 text-xs font-mono font-bold"
          >
            닫기 [X]
          </button>
        </div>

        {/* Header Title Section */}
        <div className="border-b-2 border-stone-800 pb-3 mb-5 flex flex-col">
          <span className="font-mono text-[9px] tracking-widest text-[#cca35a] font-extrabold uppercase mb-0.5 leading-none">
            {technicalId}
          </span>
          <h2 className="font-serif text-base font-black text-white leading-tight">
            {title}
          </h2>
        </div>

        {/* Render Puzzle Inner Body */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};
