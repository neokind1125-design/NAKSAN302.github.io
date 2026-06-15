import React from 'react';
import { Music2, ClipboardList, KeyRound } from 'lucide-react';

interface InventoryBarProps {
  activeItemId: string | null;
  onSelectItem: (id: string, sceneIndex?: number) => void;
  onBagClick?: () => void;
}

export const InventoryBar: React.FC<InventoryBarProps> = ({
  activeItemId,
  onSelectItem,
  onBagClick,
}) => {
  return (
    <div 
      id="inventory-bar" 
      className="flex gap-4 items-center w-full select-none"
    >
      {/* Centered Leather backpack button to the left */}
      <div 
        onClick={onBagClick}
        className="w-20 h-20 bg-[rgba(15,12,10,0.92)] border border-[#4a453e] hover:border-[#c49c5e] rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer text-[#8c867c] hover:text-[#c49c5e] transition shadow-md active:scale-95 group"
      >
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] stroke-current fill-none group-hover:scale-105 transition" strokeWidth="2">
          <path d="M4 14V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V14M4 14C4.3 12.1 5.3 10.4 6.8 9.3L12 5.5L17.2 9.3C18.7 10.4 19.7 12.1 20 14M4 14H20M9 8V2H15V8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[12px] font-sans font-bold leading-none select-none">가방</span>
      </div>

      {/* Floating Inventory Deck items (4 slots: 3 items, 1 empty) */}
      <div className="flex-grow flex gap-3">
        {/* Slot 1: Cassette Tape */}
        <button 
          onClick={() => onSelectItem('cassette', 1)}
          className={`flex-1 h-20 bg-[rgba(10,8,7,0.85)] border flex flex-col items-center justify-center cursor-pointer transition-all duration-200 rounded-lg outline-none active:scale-98 ${
            activeItemId === 'cassette' 
              ? 'border-2 border-[#c49c5e] shadow-[0_0_15px_rgba(196,156,94,0.65)] bg-amber-950/20' 
              : 'border-[#4a453e] hover:border-[#c49c5e] hover:scale-[1.02]'
          }`}
        >
          <Music2 size={24} className={`stroke-[1.5] ${activeItemId === 'cassette' ? 'text-[#c49c5e]' : 'text-stone-400'}`} />
          <span className="text-[11px] font-bold text-[#e0dcd5] mt-1.5 text-center font-sans">카세트 테이프</span>
        </button>

        {/* Slot 2: Memo Piece */}
        <button 
          onClick={() => onSelectItem('note')}
          className={`flex-1 h-20 bg-[rgba(10,8,7,0.85)] border flex flex-col items-center justify-center cursor-pointer transition-all duration-200 rounded-lg outline-none active:scale-98 ${
            activeItemId === 'note' 
              ? 'border-2 border-[#c49c5e] shadow-[0_0_15px_rgba(196,156,94,0.65)] bg-amber-950/20' 
              : 'border-[#4a453e] hover:border-[#c49c5e] hover:scale-[1.02]'
          }`}
        >
          <ClipboardList size={24} className={`stroke-[1.5] ${activeItemId === 'note' ? 'text-[#c49c5e]' : 'text-stone-400'}`} />
          <span className="text-[11px] font-bold text-[#e0dcd5] mt-1.5 text-center font-sans">메모 조각</span>
        </button>

        {/* Slot 3: Gold Vault Key */}
        <button 
          onClick={() => onSelectItem('safe', 4)}
          className={`flex-1 h-20 bg-[rgba(10,8,7,0.85)] border flex flex-col items-center justify-center cursor-pointer transition-all duration-200 rounded-lg outline-none active:scale-98 ${
            activeItemId === 'safe' 
              ? 'border-2 border-[#c49c5e] shadow-[0_0_15px_rgba(196,156,94,0.65)] bg-amber-950/20' 
              : 'border-[#4a453e] hover:border-[#c49c5e] hover:scale-[1.02]'
          }`}
        >
          <KeyRound size={24} className={`stroke-[1.5] ${activeItemId === 'safe' ? 'text-[#c49c5e]' : 'text-stone-400'}`} />
          <span className="text-[11px] font-bold text-[#e0dcd5] mt-1.5 text-center font-sans">금고 열쇠</span>
        </button>

        {/* Slot 4: Empty slot */}
        <div className="flex-grow flex-1 h-20 bg-[rgba(10,8,7,0.4)] border border-dashed border-[#2d2824] rounded-lg flex flex-col items-center justify-center opacity-40 select-none">
          <span className="text-[11px] text-[#8c867c] font-medium text-center font-sans">비어 있음</span>
        </div>
      </div>
    </div>
  );
};
