import React from 'react';
import { ShieldAlert, BookOpen, Clock, Lock } from 'lucide-react';
import { QuestStatus } from '../../types';
import rustylakeEntranceBg from '../../assets/images/entrance_no_door_1781462344976.jpg';

interface SceneEntranceProps {
  onInspect: (id: string) => void;
  questStatus: Record<string, QuestStatus>;
  activeHotspot: string;
  onResolve?: () => void;
}

export const SceneEntrance: React.FC<SceneEntranceProps> = ({
  onInspect,
  questStatus,
  activeHotspot,
  onResolve,
}) => {
  return (
    <div className="relative w-full h-[520px] bg-[#140f0c] rounded-lg overflow-hidden border-4 border-[#241a12] shadow-2xl flex flex-col justify-between select-none group">
      {/* Rusty lake vintage rose wallpaper backdrop */}
      <img 
        src={rustylakeEntranceBg}
        alt="Professor Office Entrance Background"
        className="absolute inset-0 w-full h-full object-cover opacity-85 brightness-95 contrast-[1.02] pointer-events-none transition-all duration-300"
        referrerPolicy="no-referrer"
      />

      {/* Wall Texture / Grunge Wallpaper overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.8) 100%), 
                            repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 10px)`
        }}
      />
      
      {/* Plaster Cracks Representation (SVG Layer) */}
      <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none stroke-[#2a1d13] stroke-[1.5] fill-none">
        <path d="M 0 80 Q 80 120 180 70 T 320 150 T 450 60" />
        <path d="M 700 40 Q 750 180 810 240 T 780 380" />
        <path d="M 120 400 Q 190 350 200 480" />
      </svg>

      {/* Main Back Wall Scene Wrapper */}
      <div className="absolute inset-0 flex items-end justify-center px-12 pb-6">
        
        {/* Left Side: Professor Jinho Portrait */}
        <div className="absolute left-[8%] bottom-[160px] flex flex-col items-center">
          {/* Framed Picture */}
          <div className="w-[110px] h-[145px] border-4 border-[#120a06] bg-[#1c130d] p-1.5 shadow-2xl relative group transition-all hover:scale-105">
            {/* Inner mount */}
            <div className={`w-full h-full border border-[#0d0704] bg-[#2d2116] flex flex-col items-center justify-center p-1 relative ${activeHotspot === 'books' ? 'ring-2 ring-yellow-500/60 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : ''}`}>
              {/* Professor drawing sketch inside */}
              <div className="w-16 h-20 border border-[#120a06] bg-[#140d09] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 40 50" className="w-full h-full opacity-65 fill-none stroke-[#bfa580] stroke-[1.2]">
                  {/* Portrait Sketch Lines */}
                  {/* Head outline */}
                  <path d="M 13 36 C 13 18, 27 18, 27 36" />
                  {/* Shoulders */}
                  <path d="M 5 48 Q 13 38 20 38 Q 27 38 35 48" />
                  {/* Glasses */}
                  <circle cx="16" cy="27" r="4" />
                  <circle cx="24" cy="27" r="4" />
                  <line x1="20" y1="27" x2="20" y2="27" />
                  {/* Nose */}
                  <path d="M 20 27 L 20 32 Q 20 33 21 34" />
                  {/* Mouth */}
                  <path d="M 17 38 Q 20 36 23 38" />
                  {/* Hair / Tie details */}
                  <path d="M 12 21 Q 20 12 28 21" />
                  <path d="M 18 41 L 18 48 M 22 41 L 22 48" />
                </svg>
              </div>
              <p className="font-serif text-[8px] text-[#7d6751] mt-1.5 font-bold tracking-tight text-center leading-none">이진호 초대 교수</p>
            </div>
          </div>
          {/* Brass Plate beneath Portrait */}
          <div className="mt-2.5 bg-[#17100b] border-2 border-[#332316] px-3 py-1 text-center shadow-md">
            <p className="font-serif text-[8px] text-[#bca279] tracking-wider leading-none">이진호 교수 (1958 - 1987)</p>
          </div>
        </div>

        {/* Center: The Main Office Door (Entrance Door) */}
        <div className="absolute left-[36%] bottom-[40px] w-[190px] h-[410px] border-[10px] border-double border-[#19110a] bg-[#2d1c11] shadow-2xl relative flex flex-col items-center pt-8">
          {/* Door panels */}
          <div className="absolute inset-2 border-2 border-[#19110a]/50 pointer-events-none" />
          <div className="w-[124px] h-[110px] border-4 border-[#120c08] bg-[#1e130a] shadow-inner mt-4 flex items-center justify-center p-2 relative">
            {/* Door Signboard */}
            <div className="border border-[#3d2a1c] bg-[#140d08] px-3.5 py-1.5 text-center shadow-lg">
              <p className="font-serif text-[11px] text-[#dac39a] font-black tracking-widest">[ 교수 연구실 ]</p>
            </div>
          </div>

          <div className="w-[124px] h-[190px] border-4 border-[#120c08] bg-[#1e130a] shadow-inner mt-4 relative flex items-center justify-end pr-3">
            {/* Door Handle & Lock Spot */}
            <button
              onClick={() => onInspect('doorlock')} // 문 앞 도어락은 도어락과 연관
              className={`group/door cursor-pointer absolute right-[-14px] top-[40%] w-[26px] h-[52px] border-2 border-[#120c08] bg-[#160f0a] rounded flex flex-col justify-between items-center py-1.5 transition-all ${
                activeHotspot === 'doorlock' ? 'ring-2 ring-yellow-500 shadow-[0_0_15px_#eab308]' : 'hover:scale-110 hover:border-yellow-500/80'
              }`}
            >
              {/* Highlight Overlay Ring */}
              <div className="absolute -inset-1 border border-yellow-500/30 rounded opacity-0 group-hover/door:opacity-100 animate-pulse" />
              
              {/* Tooltip 말풍선 (Active, Clickable, Styled strictly like the screenshots!) */}
              {activeHotspot === 'doorlock' && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onResolve) onResolve();
                  }}
                  className="absolute bottom-[66px] right-[-52px] w-[130px] bg-[rgba(15,12,10,0.95)] border border-[#c49c5e] px-4 py-2 rounded shadow-[0_0_20px_rgba(196,156,94,0.6)] text-center cursor-pointer pointer-events-auto transition hover:scale-105 active:scale-95 z-55 select-none text-nowrap font-sans font-medium"
                >
                  {/* Arrow pointing down */}
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#c49c5e]" />
                  <div className="text-[13px] text-stone-100 font-bold mb-0.5 tracking-wider">전자식 도어락</div>
                  <div className="text-[11px] text-[#c49c5e] font-extrabold flex items-center justify-center gap-1">▶ 조사하기</div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-0.5">
                <span className="w-1 h-1 bg-[#d5493c] rounded-full" />
                <span className="w-1 h-1 bg-stone-700 rounded-full" />
              </div>
              <div className="w-4 h-1 bg-stone-600 rounded-sm mt-1" />
              {/* Brass door handle lever */}
              <div className="absolute right-[-8px] top-[50%] w-7 h-2 bg-[#dcb35f] border border-black shadow" style={{ transform: 'rotate(2deg)' }} />
            </button>
          </div>
        </div>

        {/* Right Side: Electronic LED wall Timer clock & Small Bureau table with plant */}
        <div className="absolute right-[22%] bottom-[190px] flex flex-col items-center">
          {/* LED Clock Box */}
          <div className="w-[100px] border-4 border-[#161009] bg-[#0c0906] p-2 flex flex-col items-center justify-center shadow-2xl">
            <span className="text-[7px] text-[#735d46] font-mono leading-none tracking-wider mb-1">LED CLOCK V2</span>
            <div className="font-mono text-base text-[#ea463c] font-black tracking-widest select-none bg-black/50 px-2 py-0.5 border border-red-950 shadow-[inset_0_0_8px_rgba(234,70,60,0.4)] animate-pulse red-glow">
              59:42
            </div>
          </div>
          {/* Wooden Plate Plate "남은 시간..." */}
          <div className="mt-2 text-center border-2 border-[#1c140d] bg-[#221710]/95 px-2.5 py-1 flex flex-col gap-0.5">
            <span className="font-serif text-[7px] text-[#9a7e61] font-bold">남은 시간</span>
            <span className="font-mono text-[10px] text-[#9ebb7c] leading-none">59:42</span>
          </div>
        </div>

        {/* Bureau table below clock */}
        <div className="absolute right-[14%] bottom-[40px] w-[160px] h-[130px] border-4 border-[#19110a] bg-[#3c2a1c] shadow-2xl relative">
          <div className="absolute inset-x-1.5 top-1.5 h-6 border border-[#2b1e13] bg-[#2f2015] font-serif text-[8px] text-[#9a7e61] px-2 flex items-center justify-between">
            <span>TABLE CABINET</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1c130c]" />
          </div>
          
          <div className="absolute left-[20%] top-[-36px] w-[45px] h-[36px] flex items-end justify-center">
            {/* Green Bonsai Plant Pot */}
            <div className="w-[28px] h-[18px] bg-[#221004] border border-black relative">
              <div className="absolute top-[-10px] left-1 w-2.5 h-2.5 rounded-full bg-[#3d5a22]/80" />
              <div className="absolute top-[-12px] left-3 w-3.5 h-3.5 flex flex-col justify-center items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#466a24]" />
                <span className="w-2 h-2 rounded-full bg-[#3d5a22]" />
              </div>
              <div className="absolute top-[-9px] right-1 w-2 h-2 rounded-full bg-[#354f19]" />
            </div>
          </div>

          <div className="absolute right-[20%] top-[-20px] h-[20px] flex items-end">
            {/* Old books on table */}
            <div className="w-[42px] h-[14px] bg-[#80221c] border border-black text-center text-[6px] text-[#eebdb3] font-serif leading-tight rotate-[-4deg] shadow-lg">
              교수강론
            </div>
          </div>

          {/* Wooden Drawers panels */}
          <div className="absolute inset-x-2 bottom-2 h-14 border border-[#1c130c] bg-[#261b11] grid grid-rows-2 p-1 gap-1">
            <div className="border border-black/40 relative flex items-center justify-center">
              <span className="w-3 h-1 bg-[#cca35a] border border-black rounded-sm" />
            </div>
            <div className="border border-black/40 relative flex items-center justify-center">
              <span className="w-3 h-1 bg-[#cca35a] border border-black rounded-sm" />
            </div>
          </div>
        </div>

        {/* Right Corner: Security Vault console box & wall wires */}
        <div className="absolute right-[2%] bottom-[140px] flex flex-col items-center">
          {/* Iron vault container box */}
          <div className="w-[76px] h-[115px] border-4 border-[#120d09] bg-[#3a3530] p-1.5 relative shadow-inner">
            <div className="w-full h-full border border-black bg-[#161413] flex flex-col justify-between items-center py-2">
              <div className="text-center font-mono text-[7px] text-[#cca35a]">최종 금고</div>
              <div className="w-[32px] h-[32px] rounded-full border-4 border-[#cca35a]/50 bg-stone-950 flex items-center justify-center text-stone-300">
                <div className="w-2 h-2 rounded-full bg-[#cca35a]" />
              </div>
              <div className="w-10 h-3 border border-stone-800 bg-stone-900 flex items-center justify-center text-[6px] text-green-500 font-mono">
                [ LOCKED ]
              </div>
            </div>
          </div>
        </div>

        {/* Wall mounted Small CCTV Monitor above Iron Vault */}
        <div className="absolute right-[1.5%] bottom-[275px] flex flex-col items-center">
          <div className="w-[82px] border-4 border-[#120a05] bg-[#1a1c1e] p-1 shadow-xl">
            <div className="h-10 bg-black border border-stone-900 grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-[#101511] flex items-center justify-center text-[5px] text-green-500 font-mono leading-none">CH-1</div>
              <div className="bg-[#121315] flex items-center justify-center text-[5px] text-green-500 font-mono leading-none">CH-2</div>
              <div className="bg-[#0f1115] flex items-center justify-center text-[5px] text-green-500 font-mono leading-none">CH-3</div>
              <div className="bg-[#111111] flex items-center justify-center text-[5px] text-green-500 font-mono leading-none">CH-4</div>
            </div>
            <div className="text-center font-mono text-[5px] text-[#9dfc75] mt-1 tracking-widest italic animate-pulse">CCTV MONITOR SCREEN</div>
          </div>
        </div>

      </div>

      {/* Decorative Floor Plate / Wood Texture */}
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
