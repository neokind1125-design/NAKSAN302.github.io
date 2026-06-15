import React from 'react';
import { ShieldAlert, Play, Camera, Lock } from 'lucide-react';
import { QuestStatus } from '../../types';
import { Room3DViewer } from '../Room3DViewer';
import rustylakeSafeRoomImg from '../../assets/images/rustylake_safe_room_1781459314850.jpg';

interface SceneCctvProps {
  onInspect: (id: string) => void;
  questStatus: Record<string, QuestStatus>;
  cctvAngle: number;
  activeHotspot: string;
  onResolve?: () => void;
}

export const SceneCctv: React.FC<SceneCctvProps> = ({
  onInspect,
  questStatus,
  cctvAngle,
  activeHotspot,
  onResolve,
}) => {
  return (
    <div className="relative w-full h-[520px] bg-[#110e0c] rounded-lg overflow-hidden border-4 border-[#241a12] shadow-2xl flex flex-col justify-between select-none group">
      {/* Room Safe Background Image */}
      <img 
        src={rustylakeSafeRoomImg}
        alt="Safe Room Background"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.48] mix-blend-lighten brightness-95 contrast-110 pointer-events-none transition-all duration-300"
        referrerPolicy="no-referrer"
      />

      {/* Grid Overlay / Grunge Scanlines */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.9) 100%), 
                            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), 
                            linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))`
        }}
      />

      {/* Main Container contents */}
      <div className="absolute inset-x-8 top-[30px] bottom-[38px] flex items-end justify-between px-2">
        
        {/* ================= LEFT SIDE: 4-SPLIT CCTV SCREEN ASSEMBLY ================= */}
        <div className="flex flex-col items-center">
          {/* Main TV Box Frame */}
          <div className="w-[190px] border-4 border-[#2b241e] bg-[#181615] p-2 shadow-2xl relative">
            <div className="text-[6.5px] font-mono text-stone-500 tracking-widest text-center mb-1 uppercase">CCTV FEED CHANNELS</div>
            
            {/* Split Screen Grid (CH-1 ~ CH-4) */}
            <div className="grid grid-cols-2 gap-1 bg-[#050505] p-1 border border-stone-800">
              {/* CH1 */}
              <div className="h-14 bg-stone-950 border border-stone-900 overflow-hidden relative flex flex-col justify-between p-1">
                {/* Horizontal Scanline animated or sketched */}
                <div className="absolute inset-x-0 h-[2px] bg-[#75fd91]/20 top-[40%] animate-pulse" />
                <span className="text-[5px] font-mono text-green-500 font-bold tracking-tight">CH-1 [ 복도 ]</span>
                <span className="text-[4px] font-mono text-green-500 text-right leading-none select-none">REC ●</span>
              </div>
              {/* CH2 */}
              <div className="h-14 bg-stone-950 border border-stone-900 overflow-hidden relative flex flex-col justify-between p-1">
                <div className="absolute inset-x-0 h-[2px] bg-[#75fd91]/20 top-[20%] animate-pulse" />
                <span className="text-[5px] font-mono text-green-500 font-bold tracking-tight">CH-2 [ 보관실 ]</span>
                <span className="text-[4px] font-mono text-[#b3bc62] text-right leading-none">STBY</span>
              </div>
              {/* CH3 */}
              <div className="h-14 bg-stone-950 border border-stone-900 overflow-hidden relative flex flex-col justify-between p-1">
                <div className="absolute inset-x-0 h-[2px] bg-[#75fd91]/20 top-[70%] animate-pulse" />
                <span className="text-[5px] font-mono text-green-500 font-bold tracking-tight">CH-3 [ 책장현관 ]</span>
                <span className="text-[4px] font-mono text-green-500 text-right leading-none select-none">REC ●</span>
              </div>
              {/* CH4 */}
              <div className="h-14 bg-stone-950 border border-stone-900 overflow-hidden relative flex flex-col justify-between p-0.5">
                <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none flex flex-col justify-end p-1" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
                  <span className="text-[5px] font-mono text-yellow-500 font-bold tracking-tight">CH-4 [ CCTV 제어 ]</span>
                  <span className="text-[4px] font-mono text-yellow-500 font-black animate-pulse leading-none mt-0.5">ANGLE {cctvAngle}°</span>
                </div>
                <div className="w-full h-full">
                  <Room3DViewer angle={cctvAngle} isInteractive={false} />
                </div>
              </div>
            </div>
            
            <div className="text-center font-mono text-[6px] text-[#75fd91] mt-1.5 uppercase leading-none tracking-widest">N_SECURITY_SYSTEM V1.0</div>
          </div>

          {/* CCTV Angle controller unit (Below TV) */}
          <button
            onClick={() => onInspect('cctv')}
            className={`group/cctv cursor-pointer w-[124px] h-[58px] border-2 border-[#120803] bg-[#221004] mt-4 relative rounded shadow-xl flex items-center justify-center transition-all ${
              activeHotspot === 'cctv' ? 'ring-2 ring-yellow-500 shadow-[0_0_15px_#eab308]' : 'hover:scale-105 hover:border-yellow-500/80'
            }`}
          >
            {/* Tooltip (Active, Clickable, Styled strictly like the screenshots!) */}
            {activeHotspot === 'cctv' && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onResolve) onResolve();
                }}
                className="absolute bottom-[72px] left-1/2 -translate-x-1/2 bg-[rgba(15,12,10,0.95)] border border-[#c49c5e] px-7 py-2.5 rounded shadow-[0_0_20px_rgba(196,156,94,0.6)] text-center cursor-pointer pointer-events-auto transition hover:scale-105 active:scale-95 z-55 select-none text-nowrap font-sans font-medium"
              >
                {/* Arrow pointing down */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#c49c5e]" />
                <div className="text-[14px] text-stone-100 font-bold mb-0.5 tracking-wider">카메라 앵글 조작</div>
                <div className="text-[12px] text-[#c49c5e] font-extrabold flex items-center justify-center gap-1">▶ 조사하기</div>
              </div>
            )}

            {/* Inner panel of controller */}
            <div className="w-full h-full border border-black bg-[#100702] p-1 flex items-center justify-between">
              <div className="flex flex-col gap-0.5 px-1 font-mono text-[5.5px] text-[#bca279] leading-tight select-none">
                <span>ANG: {cctvAngle}°</span>
                <span className="text-stone-500">REF: 14°</span>
              </div>
              {/* Dial button decoration */}
              <div className="w-10 h-10 rounded-full border-2 border-stone-700 bg-stone-900 flex items-center justify-center text-yellow-500 font-mono font-bold text-[8px] animate-pulse">
                {cctvAngle === 14 ? 'LOCK' : 'DIAL'}
              </div>
            </div>
          </button>
        </div>

        {/* ================= CENTER SIDE: SECURITY CONTROL PANEL WALL BOX ================= */}
        <div className="flex flex-col items-center pb-12">
          {/* Metal Steel control box set into wall */}
          <div className="w-[130px] h-[190px] border-4 border-[#1c1815] bg-[#34302d] rounded-sm p-2 shadow-2xl relative flex flex-col justify-between font-serif">
            {/* Outer panel bevel */}
            <div className="absolute inset-1 border border-[#0d0a09]/50 pointer-events-none" />
            
            {/* Header Title */}
            <div className="text-center font-bold text-[#bca279] text-[8.5px] tracking-widest border-b border-black/40 pb-1 leading-none uppercase">
              보안 제어 박스
            </div>

            {/* Status LED diode rows */}
            <div className="flex flex-col gap-2 mt-2 px-1 text-[7px] text-stone-400 font-bold select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span className="leading-none text-green-400">전 원 (POWER_ON)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#cca35a]" />
                <span className="leading-none text-[#cca35a]/90">시스 템 (SYSTEM)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-800" />
                <span className="leading-none">잠 금 (LOCKED)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-650" />
                <span className="leading-none text-stone-500">경 보 (ALARM)</span>
              </div>
            </div>

            {/* Warning sticker panel bottom */}
            <div className="mt-4 border border-[#eab308]/40 bg-[#eab308]/5 p-1.5 text-center flex flex-col gap-0.5 rounded-sm">
              <ShieldAlert size={11} className="text-[#eab308] mx-auto animate-pulse" />
              <span className="text-[5px] text-[#eab308] leading-none font-bold uppercase tracking-widest mt-0.5">관계자 외 조작 금지</span>
              <span className="text-[4px] text-stone-500 font-mono scale-95 uppercase mt-0.5">WARNING SYSTEM SECURITY</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: DOOR LOCK MECHANIC MODULE ================= */}
        <div className="flex flex-col items-center">
          {/* Small wall panel with office door block on the right edge */}
          <div className="w-[105px] h-[225px] border-l-4 border-t-2 border-[#120904] bg-[#291708] shadow-2xl relative flex flex-col justify-center items-center p-3">
            {/* Door handle latch panel layout */}
            <div className="text-[6px] font-mono text-[#dcb35f] text-center tracking-wide uppercase mb-2">ACCESS SECURITY</div>
            
            <button
              onClick={() => onInspect('caesar')} 
              className={`group/doorld cursor-pointer w-[62px] h-[134px] border-4 border-[#120803] bg-stone-900 rounded p-1 flex flex-col justify-between items-center transition-all ${
                activeHotspot === 'caesar' ? 'ring-2 ring-yellow-500 shadow-[0_0_15px_#eab308]' : 'hover:scale-105 hover:border-yellow-500/80'
              }`}
            >
              {/* Tooltip (Active, Clickable, Styled strictly like the screenshots!) */}
              {activeHotspot === 'caesar' && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onResolve) onResolve();
                  }}
                  className="absolute right-[115%] top-1/2 -translate-y-1/2 bg-[rgba(15,12,10,0.95)] border border-[#c49c5e] px-7 py-2.5 rounded shadow-[0_0_20px_rgba(196,156,94,0.6)] text-center cursor-pointer pointer-events-auto transition hover:scale-105 active:scale-95 z-55 select-none text-nowrap font-sans font-medium"
                >
                  {/* Arrow pointing right */}
                  <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#c49c5e]" />
                  <div className="text-[14px] text-stone-100 font-bold mb-0.5 tracking-wider">전자식 도어락</div>
                  <div className="text-[12px] text-[#c49c5e] font-extrabold flex items-center justify-center gap-1">▶ 조사하기</div>
                </div>
              )}

              {/* Security digital password pad sketch */}
              <div className="w-full h-full border border-black bg-black text-[#75fd91] font-mono text-[7px] p-1 flex flex-col justify-between py-2">
                <div className="text-center font-bold tracking-widest select-none leading-none border-b border-stone-800 pb-1 mb-1">
                  SYS_ACTIVE
                </div>
                {/* 12-key pad matrix preview lines */}
                <div className="grid grid-cols-3 gap-1 px-1 text-stone-400 select-none text-[6.5px] items-center text-center">
                  <span>1</span><span>2</span><span>3</span>
                  <span>4</span><span>5</span><span>6</span>
                  <span>7</span><span>8</span><span>9</span>
                  <span>*</span><span>0</span><span>#</span>
                </div>
                <div className="border border-stone-800 bg-[#080d09] text-center text-[6.5px] leading-none py-0.5 mt-2 text-[#7bf379]">
                  STBY-
                </div>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* ================= INTERACTIVE TILE 7 CHALK PATTERN FLOOR ================= */}
      {/* 바닥 타일에 "TILE 7" 분필 스케칭 장식 (Clickable & Interactive!) */}
      <button
        onClick={() => onInspect('floor')}
        className={`absolute left-[34%] bottom-[32px] w-[200px] h-[52px] z-20 flex items-center justify-center bg-transparent border-none outline-none cursor-pointer group/floor ${
          activeHotspot === 'floor' ? 'ring-2 ring-yellow-500/50 rounded' : ''
        }`}
      >
        <div className="border-2 border-dashed border-[#ecdab7]/35 w-full h-full flex flex-col items-center justify-center rotate-[-1deg] text-[#ecdab7]/35 relative hover:border-[#ecdab7]/80 hover:text-[#ecdab7]/80 transition">
          {/* Arrow icons overlay sketched */}
          <div className="absolute top-1 font-mono text-[7px] tracking-widest">&#8593;</div>
          <div className="absolute bottom-1 font-mono text-[7px] tracking-widest">&#8595;</div>
          <div className="absolute left-2 font-mono text-[7px] tracking-widest">&#8592;</div>
          <div className="absolute right-2 font-mono text-[7px] tracking-widest">&#8594;</div>
          
          <span className="font-mono text-[10px] font-black tracking-widest select-none">TILE 7</span>

          {/* Active Tooltip above Floor tile */}
          {activeHotspot === 'floor' && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                if (onResolve) onResolve();
              }}
              className="absolute bottom-[60px] left-1/2 -translate-x-1/2 bg-[rgba(15,12,10,0.95)] border border-[#c49c5e] px-7 py-2.5 rounded shadow-[0_0_20px_rgba(196,156,94,0.6)] text-center cursor-pointer pointer-events-auto transition hover:scale-105 active:scale-95 z-55 select-none text-nowrap font-sans font-medium"
            >
              {/* Arrow pointing down */}
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#c49c5e]" />
              <div className="text-[14px] text-stone-100 font-bold mb-0.5 tracking-wider">전산 바닥 타일</div>
              <div className="text-[12px] text-[#c49c5e] font-extrabold flex items-center justify-center gap-1">▶ 조사하기</div>
            </div>
          )}
        </div>
      </button>

      {/* Beautiful Floor Wood Planks */}
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
