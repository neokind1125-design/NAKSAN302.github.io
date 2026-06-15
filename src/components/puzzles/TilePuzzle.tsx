import React, { useState } from 'react';
import { X, Grid3X3, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface TilePuzzleProps {
  onClose: () => void;
  onSolved: () => void;
}

export const TilePuzzle: React.FC<TilePuzzleProps> = ({
  onClose,
  onSolved,
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Target coordinates: row 3, column 4 (1-indexed: Row 3, Col 4)
  const targetRow = 3;
  const targetCol = 4;

  const handleTileClick = (r: number, c: number) => {
    if (solved) return;
    setSelectedRow(r);
    setSelectedCol(c);
    setErrorMsg('');
  };

  const handleVerify = () => {
    if (selectedRow === targetRow && selectedCol === targetCol) {
      setSolved(true);
      setErrorMsg('');
      setTimeout(() => {
        onSolved();
      }, 1500);
    } else {
      if (selectedRow === null || selectedCol === null) {
        setErrorMsg('격발할 타일을 선택하십시오.');
      } else {
        setErrorMsg(`접지 불량: [${selectedRow}행, ${selectedCol}열] 타일 내부에는 폐전선만 가득합니다. 올바른 수열 위치의 구리를 수색하십시오.`);
      }
    }
  };

  return (
    <div id="tile-puzzle-modal" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg border-4 border-[#2b2016] bg-[#16110e] text-[#f4e4bd] p-6 shadow-[0px_0px_35px_rgba(196,156,94,0.3)] relative rounded-lg">
        {/* Close Button */}
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="p-1 px-3 border border-[#4a3e33] bg-[#221812] hover:bg-[#8d2522] hover:text-white rounded text-stone-300 transition cursor-pointer active:scale-95 text-xs font-mono"
          >
            닫기 [X]
          </button>
        </div>

        {/* Title */}
        <div className="border-b-2 border-stone-800 pb-3 mb-5 flex items-center gap-3">
          <div className="p-2 border border-[#cca35a] bg-stone-950 text-[#cca35a] rounded animate-pulse">
            <Grid3X3 size={20} />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#cca35a] block">SYSTEM_FLOOR_GRID</span>
            <h2 className="font-serif text-base font-black text-white">6x6 전산 기계식 바닥 단자 격판 유도</h2>
          </div>
        </div>

        <p className="text-xs text-stone-300 mb-4 font-serif leading-relaxed">
          책가 구조의 세워진 갈색 책장의 기울기가 가리키는 순서를 행렬 좌표로 헌납하십시오.
          올바른 격자 위치의 황동 판넬을 뒤엎으면, 칠판 수치 보정에 필요한 <strong>지하 비선 단자 주소 "동쪽 85"</strong>의 은폐 전압선이 나타납니다.
          <span className="text-[#cca35a] font-bold block mt-1">💡 힌트: 뒤틀린 책장의 수열로 3행 4열을 타겟하십시오.</span>
        </p>

        {/* 6x6 Grid UI */}
        <div className="bg-[#0b0806] border-2 border-[#2d2217] rounded p-6 mb-5 flex flex-col items-center">
          <div className="grid grid-cols-6 gap-2 w-72 h-72 p-2 bg-[#1c130d] border border-black shadow-inner">
            {Array.from({ length: 6 }).map((_, rIdx) => {
              const row = rIdx + 1;
              return Array.from({ length: 6 }).map((_, cIdx) => {
                const col = cIdx + 1;
                const isSelected = selectedRow === row && selectedCol === col;
                const isCorrectTile = row === targetRow && col === targetCol;

                return (
                  <button
                    key={`${row}-${col}`}
                    onClick={() => handleTileClick(row, col)}
                    className={`aspect-square rounded border transition-all flex flex-col items-center justify-center font-mono text-[9px] relative overflow-hidden ${
                      solved && isCorrectTile
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400'
                        : isSelected
                          ? 'bg-[#c49c5e] border-[#eedcb3] text-black shadow-[0_0_10px_rgba(196,156,94,0.6)] scale-105 z-10'
                          : 'bg-[#18120d] border-[#3a2c1e] text-stone-500 hover:border-amber-500/50 hover:bg-[#201811]'
                    }`}
                  >
                    <span>{row},{col}</span>
                    {solved && isCorrectTile && (
                      <div className="absolute inset-0 bg-emerald-500/20 animate-ping rounded" />
                    )}
                  </button>
                );
              });
            })}
          </div>
          <div className="mt-3.5 text-[11px] font-mono text-[#cca35a]">
            선택된 단자: {selectedRow !== null && selectedCol !== null ? `[${selectedRow}행, ${selectedCol}열]` : '선택 없음'}
          </div>
        </div>

        {/* Action Button & Feedback */}
        <div className="space-y-3.5">
          {errorMsg && (
            <p className="border border-red-900 bg-red-950/20 p-2 text-[11px] leading-relaxed font-bold text-red-400 font-serif rounded">
              ⚠️ {errorMsg}
            </p>
          )}

          {solved ? (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded flex items-center gap-3 text-emerald-400 animate-pulse">
              <CheckCircle size={18} />
              <div className="text-xs">
                <span className="font-black block">전산 격자 해킹 성공!</span>
                <span className="font-serif mt-0.5 block">구리 단자가 열리며 암호 주소 <strong>"동쪽 85"</strong>의 전기신호가 영구 인입되었습니다.</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              className="w-full py-3 bg-[#cca35a] text-black hover:bg-[#eedcb3] text-xs tracking-wider transition-all cursor-pointer font-black select-none border-2 border-black rounded"
            >
              선택한 바닥 타일 탈격 검증
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
