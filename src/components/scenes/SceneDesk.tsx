import React from 'react';
import { Sparkles, Play, ClipboardList, Book } from 'lucide-react';
import { CharacterId, QuestStatus } from '../../types';

interface SceneDeskProps {
  onInspect: (id: string) => void;
  questStatus: Record<string, QuestStatus>;
  audiotrackRestored: Record<CharacterId, boolean>;
  activeHotspot: string;
  onRestoreTrack: (id: CharacterId) => void;
  onResolve?: () => void;
}

export const SceneDesk: React.FC<SceneDeskProps> = ({
  onInspect,
  questStatus,
  audiotrackRestored,
  activeHotspot,
  onRestoreTrack,
  onResolve,
}) => {
  const restoredCount = Object.values(audiotrackRestored).filter(Boolean).length;

  return (
    <div className="relative w-full h-[520px] bg-[#1a1410] rounded-lg overflow-hidden border-4 border-[#241a12] shadow-2xl flex flex-col justify-between select-none">
      {/* Wall Lighting Flare from Lamp */}
      <div 
        className="absolute left-[20%] top-[40%] w-[380px] h-[320px] rounded-full pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.45) 0%, rgba(20, 15, 12, 0) 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Background Chalkboard (칠판) */}
      <div className="absolute left-[16%] top-[30px] w-[56%] h-[195px] border-[6px] border-[#1f1610] bg-[#1a2d21] shadow-2xl p-4 flex flex-col justify-between font-serif text-[#a1be99]/80 relative">
        {/* Board dust texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04)_0%,transparent_80%)] pointer-events-none" />
        
        <div className="flex justify-between items-start">
          {/* Angled Formula Graphic */}
          <div className="flex flex-col gap-1">
            <svg viewBox="0 0 80 50" className="w-[85px] h-[55px] stroke-[#a1be99]/55 stroke-[1.2] fill-none">
              {/* Angled triangle */}
              <path d="M 10 40 L 70 40 M 10 40 L 65 20 M 60 40 A 20 20 0 0 0 52 35" />
              <text x="38" y="32" className="text-[7.5px] fill-[#88aa7f]/80 font-mono">14°</text>
            </svg>
          </div>

          {/* Central text content */}
          <div className="text-center flex flex-col items-center">
            <h4 className="text-[14px] text-[#bddd8a] font-bold tracking-widest leading-none mt-2">과 깊에섬</h4>
            <span className="text-[11px] text-[#a7c98c]/80 tracking-widest mt-1 font-mono">TILE 7</span>
          </div>

          {/* Geographical coordinates */}
          <div className="text-right font-mono text-[7px] text-[#88aa7f]/90 leading-normal">
            <p>37° 33' 12" N</p>
            <p>126° 59' 22" E</p>
          </div>
        </div>

        {/* Chalkboard Attachments (Papers / Sketches) */}
        <div className="flex justify-between items-end">
          {/* Sketch of Naksan Kwan Building */}
          <div className="w-[45px] h-[45px] border border-[#a1be99]/40 bg-[#142319] p-1 rotate-[3deg] scale-95 flex flex-col justify-between items-center text-center">
            <svg viewBox="0 0 40 30" className="w-full h-[22px] stroke-[#a1be99]/50 fill-none stroke-[1]">
              <rect x="5" y="10" width="30" height="15" />
              <path d="M 5 10 L 20 2 L 35 10" />
              <line x1="12" y1="15" x2="12" y2="20" />
              <line x1="20" y1="15" x2="20" y2="25" />
              <line x1="28" y1="15" x2="28" y2="20" />
            </svg>
            <span className="text-[5.5px] text-[#a1be99]/50 font-sans tracking-tight">낙산관</span>
          </div>

          {/* Small 3x3 layout sketch */}
          <div className="w-[40px] h-[42px] border border-dashed border-[#a1be99]/35 bg-[#17261b] p-0.5 rotate-[-4deg] flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5 w-full h-full p-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`border border-[#a1be99]/20 flex items-center justify-center text-[5px] ${i === 6 ? 'bg-[#a1be99]/20' : ''}`}>
                  {i === 6 ? '●' : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professor Jinho Portrait (Wall style) */}
      <div className="absolute right-[12%] top-[30px] w-[86px] h-[115px] border-4 border-[#120a06] bg-[#1c130d] p-1.5 shadow-2xl">
        <div className="w-full h-full border border-black bg-[#2d2116] flex flex-col items-center justify-center">
          <div className="w-13 h-16 border border-[#120a06] bg-[#140d09] flex items-center justify-center">
            <svg viewBox="0 0 40 50" className="w-full h-full opacity-45 fill-none stroke-[#a58d69] stroke-[1]">
              <path d="M 13 36 C 13 18, 27 18, 27 36" />
              <path d="M 5 48 C 12 36, 28 36, 35 48" />
              <circle cx="16" cy="27" r="3.5" />
              <circle cx="24" cy="27" r="3.5" />
              <path d="M 20 27 L 20 31" />
              <path d="M 18 36 Q 20 35 22 36" />
            </svg>
          </div>
          <span className="text-[6.5px] font-serif text-[#78614a] font-bold mt-1 tracking-tight">이진호 초상</span>
        </div>
      </div>

      {/* Wall Mounted Vault Safe (Right Side) */}
      <div className="absolute right-[1.5%] top-[148px] w-[95px] h-[142px] border-4 border-[#120a06] bg-[#29221c] p-1.5 shadow-lg flex flex-col justify-between">
        <div className="w-full h-full border-2 border-black bg-[#151210] flex flex-col justify-between items-center py-2 px-1 text-center font-mono relative group">
          <div className="text-[6.5px] text-[#bca279] tracking-wider leading-none">최종 보안 금고</div>
          <div className="text-[7.5px] text-[#9a8059] tracking-tight leading-none">과 깊에섬</div>
          
          {/* Dial lock device */}
          <div className="w-10 h-10 rounded-full border-2 border-[#1c140e] bg-[#2d1c11] flex items-center justify-center relative shadow-md">
            <div className="w-6 h-6 rounded-full border border-black bg-[#0d0906] flex items-center justify-center">
              <span className="text-[5.5px] text-yellow-500 font-bold tracking-tight">85%</span>
            </div>
          </div>

          <div className="text-[6px] text-[#db4a3f] font-mono tracking-widest leading-none bg-stone-900 px-1 py-0.5 border border-stone-800">[ LOCKED ]</div>
        </div>
      </div>

      {/* Back Wall Left: Bookshelf corner */}
      <div className="absolute left-[1.5%] top-[30px] w-[90px] h-[260px] border-r-2 border-[#2b1f15] bg-[#1a120c]/60 flex flex-col p-1 gap-1.5">
        <div className="text-[8px] font-serif font-black text-[#856d53] border-b border-[#2b1f15] pb-1 uppercase tracking-tight text-center">강의계서 비공개</div>
        <div className="flex-grow flex flex-col gap-1 overflow-hidden opacity-60">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-6 border border-[#2b1f15] bg-[#3a2012]/30 flex items-center px-1.5 font-serif text-[7.5px] text-[#8c745c] leading-tight select-none">
              ■ {idx % 2 === 0 ? '한국 기학' : '지적 총단'}
            </div>
          ))}
        </div>
      </div>

      {/* Banker's Desk Lamp (Green light fixture) */}
      <div className="absolute left-[14%] bottom-[130px] z-20 flex flex-col items-center">
        {/* Banker lamp body */}
        <div className="w-[52px] h-[22px] bg-[#2c4e33] border-2 border-emerald-950 rounded-full shadow-lg relative">
          {/* Bulb shine glow overlay */}
          <div className="absolute bottom-[-6px] left-[14px] w-6 h-3 bg-yellow-200/90 rounded-full blur-[2px] animate-pulse" />
        </div>
        {/* Brass bar support */}
        <div className="w-2 h-14 border-r-2 border-l border-[#dcb35f] bg-[#9a7d3c]" />
        {/* Lamp Base on desk */}
        <div className="w-[34px] h-[10px] bg-[#80612c] border border-black rounded-t shadow-md" />
      </div>

      {/* Main Professor Study Desk (책상) */}
      <div className="w-[84%] h-[155px] bg-[#322319] border-t-8 border-[#211610] shadow-[0_[-8px]_18px_rgba(0,0,0,0.6)] mx-auto relative z-10 flex border-b-4 border-black">
        {/* Desk top bevel profile line */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[#4c3525] border-b border-[#1b120c]" />

        {/* Left Side: Coffee plate & cup */}
        <div className="absolute left-[8%] top-2 flex items-center gap-1.5">
          <div className="w-[28px] h-[28px] rounded-full border border-[#1e130c] bg-[#110a06] flex items-center justify-center shadow-lg relative group">
            {/* Coffee inside cup */}
            <div className="w-4 h-4 rounded-full bg-[#3d2212] border border-black flex items-center justify-center overflow-hidden">
              <span className="text-[4px] text-gray-400 font-sans tracking-tight animate-pulse">S</span>
            </div>
            {/* Cup handle */}
            <div className="absolute right-[-3px] top-[8px] w-2.5 h-3.5 border-2 border-[#110a06] rounded-full" />
          </div>
          <div className="bg-[#140d09] border border-[#2b1f15] px-1.5 py-0.5 text-center shadow-sm">
            <span className="font-serif text-[6.5px] text-[#a58d69] tracking-wider leading-none">낙산대</span>
          </div>
        </div>

        {/* Center-Left: "기억은 지도다..." Memo paper */}
        <div className="absolute left-[21%] top-5 w-[114px] h-[78px] bg-[#ecdab7] border border-[#a18a5f] p-2 rotate-[-2deg] shadow-lg flex flex-col justify-between font-serif text-[#3e2e1c]">
          <div className="text-[7px] leading-relaxed border-b border-[#cca770]/40 pb-1">
            "기억은 지도다.<br />
            교수는 길을 남겼다.<br />
            타일 7에서."
          </div>
          <div className="text-right text-[6.5px] text-[#865d2f] leading-none font-bold">낙산관 302호</div>
        </div>

        {/* CENTER INTERACTIVE ITEM: Cassette Player (카세트 플레이어) */}
        <div className="absolute left-[44%] top-5 flex items-center justify-center">
          <button
            onClick={() => onInspect('cassette')}
            className={`group/cassette cursor-pointer w-[125px] h-[85px] border-4 border-[#120905] bg-[#201d1c]/95 p-1.5 rounded-md relative transition-all ${
              activeHotspot === 'cassette' ? 'ring-2 ring-yellow-500 shadow-[0_0_20px_#eab308]' : 'hover:scale-105 hover:border-yellow-500/80'
            }`}
          >
            {/* Tooltip 말풍선 (Active, Clickable, Styled strictly like the screenshots!) */}
            {activeHotspot === 'cassette' && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onResolve) onResolve();
                }}
                className="absolute bottom-[100px] left-1/2 -translate-x-1/2 bg-[rgba(15,12,10,0.95)] border border-[#c49c5e] px-7 py-2.5 rounded shadow-[0_0_20px_rgba(196,156,94,0.6)] text-center cursor-pointer pointer-events-auto transition hover:scale-105 active:scale-95 z-55 select-none text-nowrap font-sans"
              >
                {/* Arrow pointing down */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#c49c5e]" />
                <div className="text-[14px] text-stone-100 font-bold mb-0.5 tracking-wider">카세트 플레이어</div>
                <div className="text-[12px] text-[#c49c5e] font-extrabold flex items-center justify-center gap-1">▶ 조사하기</div>
              </div>
            )}

            {/* Cassette inside window drawing */}
            <div className="w-full h-full border border-black bg-[#100e0d] p-1 flex flex-col justify-between">
              {/* Tape spools row */}
              <div className="bg-[#1c1c1a] border border-stone-800 p-1 rounded h-11 flex justify-between items-center relative">
                {/* Spool left */}
                <div className={`w-5 h-5 rounded-full border-2 border-stone-600 bg-stone-900 flex items-center justify-center ${restoredCount > 0 && restoredCount < 4 ? 'animate-spin' : ''}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cca35a]" />
                </div>

                <div className="text-[6.5px] font-mono text-[#cca35a] tracking-tight">{restoredCount}/4 SYNC</div>

                {/* Spool right */}
                <div className={`w-5 h-5 rounded-full border-2 border-stone-600 bg-stone-900 flex items-center justify-center ${restoredCount > 0 && restoredCount < 4 ? 'animate-spin' : ''}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cca35a]" />
                </div>
              </div>

              {/* Hardware buttons labels row */}
              <div className="grid grid-cols-5 gap-0.5 mt-1 h-3">
                <div className="bg-stone-700 rounded-sm" />
                <div className="bg-stone-700 rounded-sm" />
                <div className="bg-[#eb463c] rounded-sm" />
                <div className="bg-stone-700 rounded-sm" />
                <div className="bg-[#cca35a] rounded-sm" />
              </div>
            </div>
          </button>
        </div>

        {/* Center-Right: Documents stack ("낙산대학") */}
        <div className="absolute right-[22%] top-6 w-[100px] h-[80px] bg-[#ecd8bc]/90 border border-[#ab8a60] p-2 rotate-[3deg] shadow-lg flex flex-col justify-between font-serif text-[#412e1a]">
          <div className="flex justify-between border-b border-[#cca770]/40 pb-1 items-center">
            <span className="text-[6.5px] leading-none font-bold">학지 전말보고</span>
            <span className="text-[5.5px] text-[#db4a3f]">비공개</span>
          </div>
          <p className="text-[6px] leading-[1.3] text-stone-700 pl-0.5 mt-1 font-sans">
            "학사 비정합 성적조작 정정 안건..."
          </p>
          <div className="text-[5px] text-[#7d5c3d] text-right">낙산대학 법학회</div>
        </div>

        {/* Right Corner: Professor "교수" Nameplate & Pen glassholder */}
        <div className="absolute right-[7%] top-3 flex items-center gap-2">
          {/* Pen holder cup */}
          <div className="w-[20px] h-[34px] border-2 border-stone-700 bg-black/60 shadow-lg relative flex flex-wrap items-center justify-center p-1">
            <div className="absolute top-[-10px] w-0.5 h-12 bg-indigo-900 border border-black rotate-[-12deg]" />
            <div className="absolute top-[-14px] w-1 h-16 bg-amber-950 border border-black rotate-15" />
          </div>
          {/* Golden Nameplate "교수" */}
          <div className="w-[52px] h-[24px] bg-[#dcb35f] border-2 border-[#1c140e] shadow-xl text-center flex flex-col justify-center items-center font-serif text-[#1c140e] select-none scale-95">
            <span className="text-[8.5px] font-black tracking-widest leading-none">교 수</span>
            <span className="text-[5px] leading-none text-[#5c4028]/80 font-sans mt-0.5">Professor</span>
          </div>
        </div>

      </div>

      {/* Floor Wood Plank decoration panel */}
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
