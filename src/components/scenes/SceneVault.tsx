import React from 'react';
import { BookOpen, HelpCircle, Lock, Shield } from 'lucide-react';
import { QuestStatus } from '../../types';
import rustylakeVaultRoomImg from '../../assets/images/vault_room_no_antler_1781460540643.jpg';

interface SceneVaultProps {
  onInspect: (id: string) => void;
  questStatus: Record<string, QuestStatus>;
  activeHotspot: string;
  onResolve?: () => void;
}

export const SceneVault: React.FC<SceneVaultProps> = ({
  onInspect,
  questStatus,
  activeHotspot,
  onResolve,
}) => {
  return (
    <div className="relative w-full h-[520px] bg-[#120e0b] rounded-lg overflow-hidden border-4 border-[#241a12] shadow-2xl flex flex-col justify-between select-none">
      {/* Room Safe Background Image */}
      <img 
        src={rustylakeVaultRoomImg}
        alt="Safe Room Background"
        className="absolute inset-0 w-full h-full object-cover opacity-85 brightness-95 contrast-[1.05] pointer-events-none transition-all duration-300"
        referrerPolicy="no-referrer"
      />

      {/* Wall Texture / Dark Brick Shadows */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.9) 100%), 
                            repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 15px)`
        }}
      />

      <div className="absolute inset-x-8 top-[30px] bottom-[38px] flex items-end justify-between px-2">
        
        {/* ================= LEFT SIDE: PROFESSOR GUIDELINES FRAME & SURVEY SKETCH ================= */}
        <div className="flex flex-col gap-5 items-center pb-8">
          {/* Framed "교수 지침" Rule Card */}
          <div className="w-[110px] h-[135px] border-4 border-[#120a06] bg-[#221710] p-1.5 shadow-2xl rotate-[-2deg] flex flex-col justify-between text-justify font-serif">
            <div className="w-full h-full border border-[#cca35a]/50 bg-[#110d0a] p-1.5 flex flex-col justify-between text-center select-none text-[#cca35a]">
              <span className="text-[7.5px] font-black border-b border-[#cca35a]/30 pb-1 leading-none uppercase">교수 지침</span>
              <p className="text-[6px] text-[#dac39a] leading-loose mt-2 font-medium">
                진실은 기록 속에 있다.<br />
                숫자의 배열이 <br />
                길을 열 것이다.
              </p>
              <span className="text-[5.5px] text-[#7d614a] text-right mt-1">- 교수 남산관</span>
            </div>
          </div>

          {/* Survey geometry sketch map above desk drawer */}
          <div className="w-[100px] h-[95px] bg-[#ecdab7] border border-[#ab8a60] p-2 rotate-[3deg] shadow-lg flex flex-col justify-between font-serif text-[#3e2e1c]">
            <div className="flex-grow flex justify-center items-center relative">
              {/* Radial alignment sketch SVG */}
              <svg viewBox="0 0 40 40" className="w-full h-full stroke-[#865d2f]/60 stroke-[1] fill-none">
                <circle cx="20" cy="20" r="16" />
                <circle cx="20" cy="20" r="10" />
                <line x1="20" y1="4" x2="20" y2="36" />
                <line x1="4" y1="20" x2="36" y2="20" />
                <line x1="8" y1="8" x2="32" y2="32" />
              </svg>
            </div>
            {/* Written coordinate matrix values */}
            <div className="grid grid-cols-2 text-[5.5px] font-mono text-[#865d2f] border-t border-[#cca770]/40 pt-1 text-center">
              <span>3721 5914</span>
              <span>1428 0917</span>
            </div>
          </div>
        </div>

        {/* ================= CENTER SIDE: CORE LARGE VAULT (최종 무쇠 금고) ================= */}
        <div className="flex flex-col items-center pb-4 relative">
          {/* Ceiling Lamp Glow Effect hanging above vault */}
          <div className="absolute top-[-40px] w-20 h-6 bg-stone-900 border-2 border-stone-800 rounded-b-full flex items-center justify-center relative">
            <span className="w-4 h-1.5 bg-yellow-200/95 rounded-full blur-[2px]" />
          </div>
          {/* Light ray overlay */}
          <div 
            className="absolute top-[-10px] w-[140px] h-[220px] pointer-events-none opacity-20"
            style={{
              background: 'linear-gradient(180deg, rgba(234, 179, 8, 0.4) 0%, rgba(18, 14, 11, 0) 100%)'
            }}
          />

          <button
            onClick={() => onInspect('safe')}
            className={`group/vault cursor-pointer w-[144px] h-[200px] border-[6px] border-[#161210] bg-[#3a3532] p-1.5 rounded-sm relative shadow-2xl flex flex-col justify-between transition-all ${
              activeHotspot === 'safe' ? 'ring-2 ring-yellow-500 shadow-[0_0_20px_#eab308]' : 'hover:scale-105 hover:border-yellow-500/80'
            }`}
          >
            {/* Tooltip 말풍선 (Active, Clickable, Styled strictly like the screenshots!) */}
            {activeHotspot === 'safe' && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onResolve) onResolve();
                }}
                className="absolute bottom-[210px] left-1/2 -translate-x-1/2 bg-[rgba(15,12,10,0.95)] border border-[#c49c5e] px-7 py-2.5 rounded shadow-[0_0_20px_rgba(196,156,94,0.6)] text-center cursor-pointer pointer-events-auto transition hover:scale-105 active:scale-95 z-55 select-none text-nowrap font-sans font-medium animate-bounce"
                style={{ animationDuration: '3s' }}
              >
                {/* Arrow pointing down */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#c49c5e]" />
                <div className="text-[14px] text-stone-100 font-bold mb-0.5 tracking-wider">금고 살펴보기</div>
                <div className="text-[12px] text-[#c49c5e] font-extrabold flex items-center justify-center gap-1">▶ 사용하기</div>
              </div>
            )}

            {/* Vault Steel Doors interior styling */}
            <div className="w-full h-full border-2 border-black bg-[#1f1d1c]/95 flex flex-col justify-between items-center p-3 font-mono">
              <div className="text-center text-[6px] text-[#cca35a] tracking-widest leading-none border-b border-black/40 pb-1.5 w-full uppercase">
                HEAVY DUTY SAFE SECURITY
              </div>

              {/* Password text indicator window */}
              <div className="w-16 h-4 bg-black border border-stone-800 flex items-center justify-center text-red-500 text-[8px] font-black tracking-widest bg-opacity-70">
                - - - -
              </div>

              {/* Giant Dial mechanism central logo ring */}
              <div className="w-[58px] h-[58px] rounded-full border-4 border-stone-900 bg-stone-750 flex items-center justify-center relative shadow-inner rotate-12">
                <div className="w-10 h-10 rounded-full border-2 border-[#cca35a] bg-stone-950 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border border-black bg-stone-900 flex items-center justify-center">
                    <span className="text-[5px] text-yellow-500 font-bold">&#10003;</span>
                  </div>
                </div>
                {/* Dial divisions ticks overlay */}
                <div className="absolute inset-0.5 border border-dashed border-stone-800/40 rounded-full pointer-events-none" />
              </div>

              {/* Vault heavy door locking bar lever */}
              <div className="absolute right-4 top-[58%] w-10 h-2 bg-stone-600 border border-black rounded shadow" style={{ transform: 'rotate(-10deg)' }} />

              <div className="text-[6px] text-[#da3a33] font-bold tracking-widest leading-none bg-stone-950 px-1.5 py-0.5 border border-stone-900">[ LOCKED ]</div>
            </div>
          </button>
        </div>

        {/* ================= RIGHT SIDE: 4-DRAWER FILING CABINET ASSEMBLY ================= */}
        <div className="flex flex-col items-center">
          {/* Massive steel office vertical cabinet */}
          <div className="w-[124px] h-[245px] border-[5px] border-[#16120d] bg-[#3c3a37] shadow-2xl relative flex flex-col p-1.5 gap-1 font-serif">
            <div className="absolute inset-1 border border-[#110e0b]/30 pointer-events-none" />
            
            {/* Drawers 1 */}
            <div className="flex-grow border-2 border-stone-900 bg-[#2b2927] p-1 flex flex-col justify-between relative shadow-inner">
              <div className="flex justify-between items-center border-b border-black/40 pb-0.5">
                <span className="text-[6.5px] font-bold text-[#cca35a] leading-none">[ 임시 자료 ]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
              </div>
              <div className="self-center w-8 h-1 bg-[#dcb35f]/90 border border-black rounded-sm shadow-md" />
            </div>

            {/* Drawers 2 */}
            <div className="flex-grow border-2 border-stone-900 bg-[#2b2927] p-1 flex flex-col justify-between relative shadow-inner">
              <div className="flex justify-between items-center border-b border-black/40 pb-0.5">
                <span className="text-[6.5px] font-bold text-[#cca35a] leading-none">[ 강의 노트 ]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
              </div>
              <div className="self-center w-8 h-1 bg-[#dcb35f]/90 border border-black rounded-sm shadow-md" />
            </div>

            {/* Drawers 3 */}
            <div className="flex-grow border-2 border-stone-900 bg-[#2b2927] p-1 flex flex-col justify-between relative shadow-inner">
              <div className="flex justify-between items-center border-b border-black/40 pb-0.5">
                <span className="text-[6.5px] font-bold text-[#cca35a] leading-none">[ 실험 기록 ]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
              </div>
              <div className="self-center w-8 h-1 bg-[#dcb35f]/90 border border-black rounded-sm shadow-md" />
            </div>

            {/* Drawers 4 */}
            <div className="flex-grow border-2 border-stone-900 bg-[#2b2927] p-1 flex flex-col justify-between relative shadow-inner">
              <div className="flex justify-between items-center border-b border-black/40 pb-0.5">
                <span className="text-[6.5px] font-bold text-[#cca35a] leading-none">[ 기타 문서 ]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
              </div>
              <div className="self-center w-8 h-1 bg-[#dcb35f]/90 border border-black rounded-sm shadow-md" />
            </div>

          </div>
        </div>

      </div>

      {/* Scattered documents & Research notes bottom drawer on desk list box */}
      <div className="absolute left-[20%] bottom-[38px] w-[58px] h-[34px] bg-[#221004] border border-black shadow-lg relative flex items-center justify-center p-1 z-20">
        <div className="absolute top-[-10px] flex flex-col p-0.5">
          {/* Books set onto drawer */}
          <div className="w-[45px] h-[8px] bg-[#6c2822] border border-black" />
          <div className="w-[45px] h-[8px] bg-stone-800 border border-black" />
        </div>
        <div className="bg-[#cca35a] text-black border border-black px-1 text-center font-serif text-[4.5px] font-black leading-none uppercase select-none shadow">
          연구 기록<br />1998 - 2010
        </div>
      </div>

      {/* Wood plank floor boards */}
      <div 
        className="w-full h-[38px] bg-[#1d140e] border-t-4 border-[#130b06] shadow-[inset_0_4px_15px_black] z-10 flex border-b-2"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.3) 82px), 
                            linear-gradient(180deg, #1d140e 0%, #100a06 100%)`
        }}
      />
    </div>
  );
};
