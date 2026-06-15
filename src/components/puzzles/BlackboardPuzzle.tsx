import React, { useState } from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';

interface BlackboardPuzzleProps {
  onClose: () => void;
  onSolved: () => void;
}

interface DocumentPiece {
  id: number;
  rotation: number; // 0, 90, 180, 270
  text: string;
  correctRot: number;
  snippet: string;
}

export const BlackboardPuzzle: React.FC<BlackboardPuzzleProps> = ({
  onClose,
  onSolved,
}) => {
  // Scrambled document pieces with random initial rotations
  const [pieces, setPieces] = useState<DocumentPiece[]>([
    { id: 1, rotation: 180, text: '서약서 상단부', correctRot: 0, snippet: '공동의 신뢰를 수립하고...' },
    { id: 2, rotation: 90, text: '서약서 우측인터', correctRot: 0, snippet: '각자의 결핍을 강점으로...' },
    { id: 3, rotation: 270, text: '서약서 좌측날선', correctRot: 0, snippet: '함께 한 호흡으로 전진...' },
    { id: 4, rotation: 180, text: '붉은 도장 각인부', correctRot: 0, snippet: '[붉은 낙인 - 공감]' },
  ]);

  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const rotatePiece = (index: number) => {
    if (solved) return;
    setErrorMsg('');
    const newPieces = [...pieces];
    newPieces[index].rotation = (newPieces[index].rotation + 90) % 360;
    setPieces(newPieces);
  };

  const handleVerify = () => {
    // Check if all pieces have 0 rotation (fully aligned)
    const allAligned = pieces.every((p) => p.rotation === 0);

    if (allAligned) {
      setSolved(true);
      setErrorMsg('');
      setTimeout(() => {
        onSolved();
      }, 1500);
    } else {
      setErrorMsg('서약서 조각들의 결이 일치하지 않아 문맥이 일그러져 있습니다. 클릭하여 각도를 정렬하십시오.');
    }
  };

  return (
    <div id="blackboard-puzzle-modal" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg border-4 border-[#331111] bg-[#1a0e0e] text-[#f4e4bd] p-6 shadow-[0px_0px_35px_rgba(239,68,68,0.2)] relative rounded-lg">
        {/* Close Button */}
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="p-1 px-3 border border-red-950 bg-[#290d0d] hover:bg-[#8d2522] hover:text-white rounded text-stone-300 transition cursor-pointer active:scale-95 text-xs font-mono"
          >
            닫기 [X]
          </button>
        </div>

        {/* Title */}
        <div className="border-b-2 border-red-900/30 pb-3 mb-5 flex items-center gap-3">
          <div className="p-2 border border-red-500 bg-black text-red-500 rounded animate-pulse">
            <FileText size={20} />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#cca35a] block font-extrabold">MEMO_PLEDGE_RESTRUCT</span>
            <h2 className="font-serif text-base font-black text-white">소실되고 탄 찢어진 서약 조각 접착</h2>
          </div>
        </div>

        <p className="text-xs text-stone-400 mb-4 font-serif leading-relaxed">
          서약서 중심부에는 조원들이 단합할 때만 금고 키워드를 해독할 수 있도록 붉은 봉인이 찍혀 있습니다.
          <strong>조각을 클릭하여 90도씩 회전</strong>시켜, 텍스트와 찢어진 접촉면이 완벽하게 일치하도록 영점 조정하십시오.
        </p>

        {/* 2x2 Pieces Grid */}
        <div className="bg-[#120808] border border-red-950 rounded p-4 mb-4 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-3 w-72 h-72 relative bg-[#1c0f0f] border border-black p-3.5 shadow-inner">
            {/* Background watermarked text */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,3,3,0.9)_0%,rgba(31,10,10,0.92)_100%)] pointer-events-none" />

            {pieces.map((piece, index) => (
              <button
                key={piece.id}
                onClick={() => rotatePiece(index)}
                className={`border cursor-pointer relative overflow-hidden transition-all duration-300 transform active:scale-95 flex flex-col justify-between p-3 select-none flex-shrink-0 ${
                  solved 
                    ? 'border-emerald-600 bg-emerald-950/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                    : piece.rotation === 0 
                      ? 'border-yellow-600/75 bg-[#3c2518]' 
                      : 'border-red-900 bg-[#160a0a] hover:border-red-500'
                }`}
                style={{ 
                  transform: `rotate(${piece.rotation}deg)`,
                }}
              >
                <div className="text-[7px] font-mono text-stone-500 text-left">P_{piece.id}</div>
                
                {piece.id === 4 ? (
                  <div className="my-auto text-center">
                    <span className="inline-block border-2 border-dashed border-red-600 rounded-full text-[13px] font-extrabold px-2.5 py-1 text-red-500 select-none animate-pulse">
                      공감
                    </span>
                  </div>
                ) : (
                  <p className="text-[9px] font-serif leading-tight text-[#c2b29c] text-center italic mt-2">
                    {piece.correctRot === piece.rotation ? piece.snippet : '### 변조됨 ###'}
                  </p>
                )}

                <div className="text-[8px] font-sans text-stone-500 font-bold text-center border-t border-dashed border-stone-800/40 pt-1">
                  {piece.rotation}°
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Lower actions */}
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
                <span className="font-black block">서약서 완복 완료!</span>
                <span className="font-serif mt-0.5 block">도장의 붉은 키워드 <strong>"공감"</strong>을 획득했습니다. (금고 잠금해제 유효)</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              className="w-full py-3.5 bg-red-800 hover:bg-red-700 text-white text-xs tracking-wider transition-all cursor-pointer font-black select-none border-2 border-black rounded"
            >
              조각 각도 정렬 검증 [CONFIRM]
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
