import React from 'react';
import { CharacterId } from '../types';
import { CHARACTER_DATA } from '../data/gameData';
import { Check, Lock, UserRound, Award } from 'lucide-react';

interface CharacterCardProps {
  id: CharacterId;
  status?: 'ready' | 'waiting' | 'active' | 'locked';
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
  nickname?: string;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  status = 'active',
  size = 'md',
  selected = false,
  onClick,
  nickname
}) => {
  const data = CHARACTER_DATA[id];
  if (!data) return null;

  const isLocked = status === 'locked';
  const isReady = status === 'ready';
  const isWaiting = status === 'waiting';
  const sizeClass = size === 'lg' ? 'p-6' : size === 'sm' ? 'p-3' : 'p-5';

  return (
    <button
      type="button"
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={`${sizeClass} text-left transition-all duration-150 w-full relative overflow-hidden border-3 ${
        isLocked
          ? 'cursor-not-allowed opacity-40 border-[#1c140d] bg-[#100a07]'
          : selected
            ? 'border-[#1c140d] bg-[#dfc491] text-[#1c140d] shadow-[4px_4px_0px_#1c140d] -translate-x-1 -translate-y-1'
            : 'cursor-pointer border-[#1c140d] bg-[#231b15] text-[#ebd3a3] hover:bg-[#2d231b] hover:border-[#382a1d] shadow-[3px_3px_0px_#1c140d]'
      }`}
    >
      {/* Structural Color-bar */}
      <div
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ backgroundColor: isLocked ? '#2e251e' : data.color }}
      />

      <div className="flex items-start justify-between gap-3 relative select-none">
        <div className="min-w-0 pl-1.5">
          <p className={`typewriter-text text-[9px] font-bold uppercase ${selected ? 'text-[#5c422c]' : 'text-[#a68c63]'}`}>
            {data.department || 'Department Case'}
          </p>
          <h3 className={`title-serif text-lg font-black mt-1 flex items-center gap-2 ${selected ? 'text-[#1c140d]' : 'text-[#f5dfad]'}`}>
            {data.name}
            <span 
              className={`text-[9px] font-bold px-2 py-0.5 border-2 typewriter-text uppercase`}
              style={{ 
                color: selected ? '#1c140d' : data.lightColor, 
                borderColor: selected ? '#1c140d' : `${data.color}bb`,
                backgroundColor: selected ? `${data.color}20` : '#1a120d30'
              }}
            >
              {data.role}
            </span>
          </h3>
        </div>

        <div className="shrink-0 flex items-center gap-1.5">
          {isLocked && <Lock size={13} className="text-[#645348]" />}
          {isReady && (
            <span className={`inline-flex items-center gap-1 border-2 border-[#5c7533] bg-[#192b1a]/40 px-2 py-0.5 text-[9px] font-bold uppercase typewriter-text text-[#5c7533] ${selected ? 'text-[#3e521e] border-[#3e521e]' : ''}`}>
              <Check size={10} /> SIGN_OK
            </span>
          )}
          {isWaiting && (
            <span className="inline-flex items-center gap-1 border-2 border-[#b56019] bg-[#2b1a10]/40 px-2 py-0.5 text-[9px] font-bold uppercase typewriter-text text-[#b56019]">
              WAITING
            </span>
          )}
          {nickname && !isLocked && (
            <span className={`inline-flex items-center gap-1 border-2 px-2 py-0.5 text-[9px] font-bold typewriter-text ${selected ? 'border-[#1c140d] bg-[#dfc491]/60 text-[#1c140d]' : 'border-[#1c140d] bg-[#110d0a]/60 text-[#ebd3a3]'}`}>
              <UserRound size={10} /> {nickname}
            </span>
          )}
        </div>
      </div>

      {size !== 'sm' && (
        <div className="pl-1.5 relative">
          <p className={`mt-3 text-xs md:text-sm leading-6 font-serif text-justify ${selected ? 'text-[#3a2c1f]' : 'text-[#bcaea1]'}`}>
            {data.description}
          </p>
          <div className={`mt-3.5 flex items-center justify-between gap-3 border-t-2 pt-2.5 ${selected ? 'border-[#1c140d]/20' : 'border-[#1c140d]'}`}>
            <span className={`typewriter-text text-[9px] font-bold uppercase flex items-center gap-1 ${selected ? 'text-[#5c402a]' : 'text-[#a09080]'}`}>
              <Award size={11} /> ANALYSIS_SKILL
            </span>
            <span className={`text-right text-xs font-black font-serif italic ${selected ? 'text-[#1c140d]' : 'text-[#dfc491]'}`}>
              {data.ability}
            </span>
          </div>
        </div>
      )}
    </button>
  );
};
