import React, { useState, useEffect } from 'react';
import { BookMarked, Award, RefreshCw, CheckCircle2, Lock, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { QuestStatus } from '../../types';

interface SceneBookcaseProps {
  onInspect: (id: string) => void;
  questStatus: Record<string, QuestStatus>;
  activeHotspot: string;
  bookcaseStage?: number;
  handleBookcaseChoice?: (choice: number) => void;
  bookcaseFeedback?: string;
}

const gridRows = [1, 2, 3];
const gridCols = [1, 2, 3, 4];

export const SceneBookcase: React.FC<SceneBookcaseProps> = ({
  onInspect,
  questStatus,
  activeHotspot,
  bookcaseStage = 1,
  handleBookcaseChoice,
  bookcaseFeedback,
}) => {
  const [clickedPath, setClickedPath] = useState<string[]>([]);
  const [errorFlash, setErrorFlash] = useState<boolean>(false);
  const [successFlash, setSuccessFlash] = useState<boolean>(false);
  const [localFeedback, setLocalFeedback] = useState<string>('');

  // Reset states when stage changes
  useEffect(() => {
    setClickedPath([]);
    setLocalFeedback('');
    setErrorFlash(false);
  }, [bookcaseStage]);

  const handleBookClick = (row: number, col: number) => {
    if (bookcaseStage !== 3 || errorFlash || successFlash) return;
    const coord = `${row}-${col}`;
    
    // Prevent duplicate adjacent taps
    if (clickedPath[clickedPath.length - 1] === coord) return;

    const newPath = [...clickedPath, coord];
    setClickedPath(newPath);

    // Validate prefix path
    const isPrefixCorrect = checkPathPrefix(newPath);

    if (!isPrefixCorrect) {
      setLocalFeedback('조율 경고! 순서가 어긋나 장치가 초기화됩니다.');
      setErrorFlash(true);
      setTimeout(() => {
        setClickedPath([]);
        setLocalFeedback('');
        setErrorFlash(false);
      }, 800);
    } else {
      // Check for full match
      const isCompleteMatch = 
        newPath.length === 4 && 
        newPath[0] === '1-1' && 
        newPath[1] === '2-1' && 
        newPath[2] === '2-3' && 
        newPath[3] === '3-3';

      if (isCompleteMatch) {
         setSuccessFlash(true);
        setLocalFeedback('🔒 뒤틀린 책장 조율 잠금 해제 성공!!');
        setTimeout(() => {
          handleBookcaseChoice?.(2); // choice 2 completes the puzzle
          setSuccessFlash(false);
        }, 800);
      } else {
        setLocalFeedback('회로 조율 중... 다음 장치 노크 가능');
      }
    }
  };

  const checkPathPrefix = (path: string[]): boolean => {
    const correctPath = ['1-1', '2-1', '2-3', '3-3'];
    for (let i = 0; i < path.length; i++) {
      if (path[i] !== correctPath[i]) return false;
    }
    return true;
  };

  const resetPath = () => {
    setClickedPath([]);
    setLocalFeedback('초기화되었습니다.');
    setTimeout(() => setLocalFeedback(''), 1000);
  };

  // Define antique book designs for the 3x4 grid
  const getBookDesign = (row: number, col: number) => {
    const coord = `${row}-${col}`;
    if (coord === '1-1') {
      return {
        bg: 'from-[#1e3452] to-[#121f30]',
        spine: 'border-l-[6px] border-amber-500/80',
        title: '재영',
        desc: '1-1',
        isInteractive: true,
      };
    }
    if (coord === '2-1') {
      return {
        bg: 'from-[#c2842b] to-[#805314]',
        spine: 'border-l-[6px] border-yellow-200/80',
        title: '진한',
        desc: '2-1',
        isInteractive: true,
      };
    }
    if (coord === '2-3') {
      return {
        bg: 'from-[#1a5c48] to-[#0d3629]',
        spine: 'border-l-[6px] border-emerald-400/80',
        title: '우주',
        desc: '2-3',
        isInteractive: true,
      };
    }
    if (coord === '3-3') {
      return {
        bg: 'from-[#9c2826] to-[#591413]',
        spine: 'border-l-[6px] border-red-300/80',
        title: '지영',
        desc: '3-3',
        isInteractive: true,
      };
    }

    // Default books have generic titles and colors
    const colors = [
      'from-[#3d2a1d] to-[#1d140d]',
      'from-[#242b26] to-[#111412]',
      'from-[#40201d] to-[#1f100e]',
      'from-[#212124] to-[#0e0e10]',
      'from-[#4c483b] to-[#26241e]'
    ];
    const titles = ['이론', '교양', '분석', '학사', '실험', '연구', '전산', '보안'];
    const idx = (row * 3 + col) % colors.length;
    const titleIdx = (row * 4 + col) % titles.length;

    return {
      bg: colors[idx],
      spine: 'border-l-[4px] border-stone-600/40',
      title: titles[titleIdx],
      desc: `${row}-${col}`,
      isInteractive: false,
    };
  };

  return (
    <div className="relative w-full h-[520px] bg-[#17110c] rounded-lg overflow-hidden border-4 border-[#241a12] shadow-2xl flex flex-col justify-between select-none">
      {/* Dark vintage wall texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.9) 100%), 
                            repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 8px)`
        }}
      />

      {/* Bookcase Framework (3 Columns Side by Side) */}
      <div className="absolute inset-x-4 top-[20px] bottom-[38px] grid grid-cols-3 gap-3 px-2">
        
        {/* ================= COLUMN 1 (LEFT DECORATIVE SHELF) ================= */}
        <div className="border-[5px] border-[#1f150e] bg-[#2d1e15] shadow-2xl relative flex flex-col p-2 gap-3.5 rounded-sm">
          {/* Decorative Wood shelves */}
          <div className="absolute inset-x-0 top-[28%] h-[3px] bg-[#120803]" />
          <div className="absolute inset-x-0 top-[60%] h-[3px] bg-[#120803]" />
          
          {/* Top shelf - Row of books */}
          <div className="h-[28%] flex items-end gap-0.5 justify-center px-1 overflow-hidden">
            {Array.from({ length: 11 }).map((_, i) => (
              <div 
                key={i} 
                className="w-2.5 border border-black/60 shadow-md flex-shrink-0"
                style={{
                  height: `${62 + (i % 3) * 6}px`,
                  backgroundColor: i % 4 === 0 ? '#4a110a' : i % 3 === 0 ? '#1f3c2c' : i % 2 === 0 ? '#201b1a' : '#8a652e'
                }}
              />
            ))}
          </div>

          {/* Middle shelf - Accomplishment Plaque */}
          <div className="h-[28%] flex items-center justify-center p-1.5 relative">
            <div className="w-[82px] h-[64px] border-2 border-stone-900 bg-[#3d2a1d] p-1 shadow-md flex flex-col items-center justify-center rotate-[-3deg] text-center font-serif">
              <div className="w-full h-full border border-[#cca35a]/50 bg-[#140d08] flex flex-col items-center justify-center p-1">
                <span className="text-[5.5px] text-[#cca35a] font-bold leading-none">한성대학교 공로패</span>
                <span className="text-[6.5px] text-[#f4e4bd] font-black tracking-tight mt-1 leading-none">교수 박탐홍</span>
                <span className="text-[4px] text-[#7d614a] mt-1 leading-none">1971 - 2005</span>
              </div>
            </div>
          </div>

          {/* Bottom shelf - Globe */}
          <div className="h-[28%] flex items-end gap-1.5 justify-center pb-1">
            <div className="w-[34px] h-[52px] flex flex-col justify-end items-center relative">
              <div className="w-8 h-8 rounded-full border border-stone-800 bg-[#2b4c33]/80 animate-pulse relative">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-stone-700" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-stone-700" />
              </div>
              <div className="w-1 h-3 bg-[#cca35a]" />
              <div className="w-[20px] h-[4px] bg-[#3c2512] border border-black rounded-sm" />
            </div>
            <div className="w-3 h-14 bg-[#4a120c] border border-black rotate-[-15deg] origin-bottom-right" />
          </div>
        </div>

        {/* ================= COLUMN 2 (CENTER PUZZLE: 3x4 FULL-HEIGHT TACTILE BOOKCASE) ================= */}
        <div className="border-[5px] border-[#1d130a] bg-[#23150d] shadow-2xl relative flex flex-col p-2.5 h-full overflow-hidden rounded-md">
          {activeHotspot !== 'books' ? (
            // Default inactive center column
            <>
              <div className="absolute inset-x-0 top-[28%] h-[3px] bg-[#120803]" />
              <div className="absolute inset-x-0 top-[60%] h-[3px] bg-[#120803]" />

              {/* Shelf 1 */}
              <div className="h-[28%] flex items-end gap-1 justify-center overflow-hidden">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-3 border border-black/60 shadow-md flex-shrink-0"
                    style={{
                      height: `${58 + (i % 2) * 11}px`,
                      backgroundColor: i % 3 === 0 ? '#1f3c2c' : i % 2 === 0 ? '#4e331c' : '#221e1d'
                    }}
                  />
                ))}
              </div>

              {/* Shelf 2 (Highlighting suspicious book) */}
              <div className="h-[28%] flex items-center justify-center p-1.5 relative">
                <button
                  type="button"
                  onClick={() => onInspect('books')}
                  className="group/book cursor-pointer w-[80px] h-[88px] border-2 border-dashed border-amber-500/80 bg-[#1e130a] p-1.5 relative flex flex-col justify-center items-center rounded shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-serif font-black text-[8px] px-1.5 py-0.5 rounded shadow whitespace-nowrap animate-bounce">
                    수상한 책 클릭 🔍
                  </div>

                  <div className="w-[45px] h-[66px] border-2 border-amber-500 bg-[#0f2136] p-1.5 shadow-[0_0_12px_rgba(245,158,11,0.5)] relative flex flex-col justify-between text-center font-serif leading-tight rounded-sm">
                    <div className="absolute inset-0.5 border border-[#cca35a]/30 pointer-events-none" />
                    <span className="text-[5.5px] text-[#cca35a] font-bold tracking-widest mt-0.5">BLUE BOOK</span>
                    <span className="text-[7px] text-[#f5e1d5] font-black tracking-normal mt-1 leading-none">밀실수사</span>
                    <span className="text-[5px] text-[#cca35a]/80 font-sans mt-2">1-1, 2-1</span>
                  </div>
                </button>
              </div>

              {/* Shelf 3 */}
              <div className="h-[28%] flex items-end justify-center gap-0.5 pb-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2.5 border border-black/50 flex-shrink-0"
                    style={{
                      height: `${56 + (i * 2 + 1) % 9}px`,
                      backgroundColor: i % 4 === 0 ? '#4e331c' : i % 3 === 0 ? '#384d2f' : '#23201d'
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            // ================= FULL ZOOMED ACTIVE 3X4 BOOKCASE INTERACTIVE STAGE =================
            <div className="flex flex-col h-full justify-between select-none p-1 relative rounded-sm">
              
              {/* Head shelf division lines */}
              <div className="absolute inset-x-0 top-[28%] h-[3px] bg-stone-950 pointer-events-none z-10 opacity-70" />
              <div className="absolute inset-x-0 top-[59%] h-[3px] bg-stone-950 pointer-events-none z-10 opacity-70" />

              {/* STAGES 1 & 2 OVERLAYS - STYLIZED RETRO SCREENS OVER THE SHELVES */}
              {bookcaseStage === 1 && (
                <div className="absolute inset-0 bg-[#0c0805]/92 border-2 border-amber-900/60 p-3 z-30 flex flex-col items-center justify-center text-center animate-fade-in rounded-sm">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-500/30 flex items-center justify-center mb-2.5">
                    <Lock size={18} className="text-rose-500 animate-pulse" />
                  </div>
                  <span className="font-serif text-[#cca35a] text-[10.5px] font-extrabold tracking-widest">교수의 잠금 기계장치</span>
                  <p className="text-[8.5px] text-stone-400 mt-1 mb-4 leading-normal max-w-[150px]">
                    파란색 책이 잠겨 있습니다. 지영이의 심리 분석 능력을 발동하여 장치를 우회하세요.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleBookcaseChoice?.(2)}
                    className="cursor-pointer border border-[#1c140d] bg-[#ebd3a3] hover:bg-[#d6bf92] text-[#1c140d] text-[9.5px] font-black px-3.5 py-2.5 rounded shadow-[0_3px_0_#9c7c4b] active:translate-y-0.5 active:shadow-[0_1px_0_#9c7c4b] transition flex items-center gap-1 leading-none"
                  >
                    <Sparkles size={11} className="text-[#8d2522]" />
                    지영의 분석 전개 ➔
                  </button>
                </div>
              )}

              {bookcaseStage === 2 && (
                <div className="absolute inset-0 bg-[#0c0805]/92 border-2 border-amber-900/60 p-3 z-30 flex flex-col items-center justify-center text-center animate-fade-in rounded-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-950/40 border border-amber-500/30 flex items-center justify-center mb-2.5">
                    <HelpCircle size={18} className="text-amber-400 animate-pulse" />
                  </div>
                  <span className="font-serif text-amber-300 text-[10.5px] font-extrabold tracking-widest">교수 암기글 대조</span>
                  <p className="text-[8.5px] text-stone-300 mt-1 mb-4 leading-normal max-w-[150px]">
                    "동료들의 1학기 강의실 착석 순서를 따르라." <br/>자리 배치를 조회하기 위해 진한이의 기억을 조합하세요.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleBookcaseChoice?.(1)}
                    className="cursor-pointer border border-[#1c140d] bg-cyan-700 hover:bg-[#1a5a75] text-[#eedeb1] text-[9.5px] font-black px-3.5 py-2.5 rounded shadow-[0_3px_0_#0f485e] active:translate-y-0.5 active:shadow-[0_1px_0_#0f485e] transition flex items-center gap-1 leading-none"
                  >
                    <ArrowRight size={11} className="text-emerald-400" />
                    진한의 기억 대조 ➔
                  </button>
                </div>
              )}

              {/* STAGE 4 OVERLAY - PARCHMENT SUCCESS REPORT */}
              {bookcaseStage === 4 && (
                <div className="absolute inset-0 bg-[#0c0805]/96 border-2 border-emerald-900/60 p-3.5 z-40 flex flex-col items-center justify-center text-center animate-fade-in rounded-sm">
                  <CheckCircle2 size={24} className="text-emerald-500 mb-1.5 animate-bounce" />
                  <span className="font-serif text-emerald-400 text-[11px] font-black tracking-widest">비밀 오동 수납고 개방!</span>
                  <p className="text-[8.5px] text-stone-400 mt-1.5 mb-3 leading-normal max-w-[150px]">
                    책장이 찰칵 소리와 함께 움직여 숨겨진 보관실이 노출되었습니다.
                  </p>
                  
                  {/* Glowing letter box graphic representation */}
                  <div className="w-[120px] h-[58px] bg-[#dfc091] border-2 border-yellow-950/70 p-1 rounded relative shadow-[0_0_15px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center text-stone-900">
                    <div className="absolute inset-0.5 border border-yellow-900/20" />
                    <span className="text-[6.5px] font-serif font-black uppercase tracking-wider opacity-60">우주의 단점 쪽지</span>
                    <span className="text-[10px] font-serif font-black mt-1 text-[#8d2522] tracking-normal">[조율 없는 실행]</span>
                    <span className="text-[5.5px] font-mono mt-1 text-stone-700">QUEST RESOLVED ✔</span>
                  </div>
                </div>
              )}

              {/* STAGE 3 - INTERACTIVE TACTILE CANVAS */}
              <div className="absolute -top-1 inset-x-0 h-5 bg-[#0f0703]/90 border-b border-amber-950/60 rounded-t z-20 flex items-center px-2 select-none">
                <span className="text-[8px] font-serif text-[#cca35a] font-bold truncate">
                  {clickedPath.length > 0 ? (
                    <span className="text-emerald-400">
                      진행: {clickedPath.map(c => getBookDesign(Number(c.split('-')[0]), Number(c.split('-')[1])).title).join(' ➔ ')}
                    </span>
                  ) : (
                    '👉 책을 순서대로 터치하세요 [재영➔진한➔우주➔지영]'
                  )}
                </span>
                
                {clickedPath.length > 0 && (
                  <button
                    type="button"
                    onClick={resetPath}
                    className="ml-auto text-[7.5px] font-mono bg-amber-950/50 border border-amber-900/40 text-[#f5ebd1] hover:bg-stone-900 px-1 py-0.5 rounded flex items-center gap-0.5 cursor-pointer active:scale-95"
                  >
                    <RefreshCw size={6} /> 리셋
                  </button>
                )}
              </div>

              {/* 3x4 GRID OF INTERACTIVE LARGE BOOKS */}
              <div className="flex-grow grid grid-rows-3 gap-y-1 mt-4.5 pt-1">
                {gridRows.map((row) => (
                  <div key={row} className="flex justify-around items-end px-0.5 relative h-[126px]">
                    {/* Dark wooden background panel representation for realism */}
                    <div className="absolute inset-[1px] bg-[#140b06]/80 -z-10 rounded-sm shadow-inner" />
                    
                    {gridCols.map((col) => {
                      const coord = `${row}-${col}`;
                      const design = getBookDesign(row, col);
                      const isClicked = clickedPath.includes(coord);
                      const clickIndex = clickedPath.indexOf(coord);

                      // Style calculation
                      let heightClass = 'h-[95px]';
                      if (col === 1) heightClass = 'h-[105px]';
                      if (col === 3) heightClass = 'h-[110px]';
                      if (col === 4) heightClass = 'h-[98px]';

                      return (
                        <button
                          key={coord}
                          type="button"
                          onClick={() => handleBookClick(row, col)}
                          className={`w-[36px] ${heightClass} ${design.spine} rounded-sm relative flex flex-col justify-between items-center py-2 bg-gradient-to-b ${design.bg} border border-[#0d0905] shadow-[3px_5px_10px_rgba(0,0,0,0.6)] cursor-pointer active:scale-95 transition-all duration-200 origin-bottom 
                            ${isClicked ? 'opacity-30 border-emerald-500 scale-95 translate-y-1.5' : ''}
                            ${errorFlash ? 'ring-2 ring-rose-500 border-rose-500' : ''}
                          `}
                        >
                          <div className="absolute inset-0.5 border border-white/5 opacity-10 pointer-events-none" />

                          {/* Coordinates / Book Spine Title text */}
                          <div className="flex flex-col items-center select-none">
                            <span className="text-[6.5px] font-serif text-stone-500/85 scale-85 leading-none">
                              {row}-{col}
                            </span>
                            <span className={`text-[8.5px] font-serif leading-tight font-black tracking-tighter mt-1.5 [writing-mode:vertical-rl]
                              ${design.isInteractive ? 'text-yellow-400' : 'text-stone-300'}
                            `}>
                              {design.title}
                            </span>
                          </div>

                          {/* Click Index Order Badge overlay if selected */}
                          {isClicked && (
                            <div className="absolute inset-0 bg-emerald-950/75 flex items-center justify-center font-black font-sans text-xs text-[#10b981]">
                              {clickIndex + 1}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom wood floor footer shelf piece */}
              <div className="h-2.5 bg-stone-950/80 mt-1 border-t border-amber-950/50 flex-shrink-0" />
            </div>
          )}
        </div>

        {/* ================= COLUMN 3 (RIGHT DECORATIVE SHELF) ================= */}
        <div className="border-[5px] border-[#1f150e] bg-[#2d1e15] shadow-2xl relative flex flex-col p-2 gap-3.5 rounded-sm">
          <div className="absolute inset-x-0 top-[28%] h-[3px] bg-[#120803]" />
          <div className="absolute inset-x-0 top-[60%] h-[3px] bg-[#120803]" />

          {/* Top shelf */}
          <div className="h-[28%] flex items-end gap-0.5 justify-center overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className="w-3 border border-black/60 shadow-md flex-shrink-0"
                style={{
                  height: `${60 - (i % 4) * 4}px`,
                  backgroundColor: i % 3 === 0 ? '#4e331c' : i % 2 === 0 ? '#3c1a17' : '#171c1b'
                }}
              />
            ))}
          </div>

          {/* Middle shelf */}
          <div className="h-[28%] flex items-end gap-1 justify-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="w-3.5 border border-black/60 shadow-md flex-shrink-0"
                style={{
                  height: `${64 - i * 2}px`,
                  backgroundColor: i % 2 === 0 ? '#3d2516' : '#23201d'
                }}
              />
            ))}
          </div>

          {/* Bottom shelf - Sketch map */}
          <div className="h-[28%] flex items-end justify-center p-1.5 relative">
            <div className="w-[72px] h-[48px] bg-[#1c140c] border border-stone-800 p-1 flex items-center justify-center rotate-[4deg]">
              <svg viewBox="0 0 40 25" className="w-full h-full stroke-[#cca35a]/50 stroke-[0.8] fill-none">
                <circle cx="8" cy="8" r="1" />
                <circle cx="18" cy="18" r="1" />
                <circle cx="28" cy="6" r="1" />
                <circle cx="34" cy="16" r="1" />
                <path d="M 8 8 L 18 18 L 28 6 L 34 16 M 8 8 L 28 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Right Corner: Reference books stack on wooden base */}
      <div className="absolute right-[4.5%] bottom-[38px] z-20 flex flex-col items-center">
        <div className="w-[72px] h-[45px] border-2 border-stone-900 bg-[#3d2719] shadow-lg relative flex flex-col justify-end p-1 rounded-sm">
          <div className="absolute inset-x-1.5 top-[-36px] flex flex-col p-0.5 select-none gap-0.5">
            <div className="h-4 bg-[#2b3c2c] border border-black text-center text-[7.5px] text-[#a7c98c] font-serif leading-none flex items-center justify-center shadow rounded-sm">지각의 심리학</div>
            <div className="h-4 bg-[#4a1c12] border border-black text-center text-[7.5px] text-[#eebdb3] font-serif leading-none flex items-center justify-center shadow rotate-[-1deg] rounded-sm">사건의 재구성</div>
            <div className="h-4 bg-[#1a2d33] border border-black text-center text-[7.5px] text-[#a5e0ee] font-serif leading-none flex items-center justify-center shadow rotate-[2deg] rounded-sm">인식과 왜곡</div>
          </div>
        </div>
      </div>

      {/* Wooden floorboard bottom decorator */}
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
