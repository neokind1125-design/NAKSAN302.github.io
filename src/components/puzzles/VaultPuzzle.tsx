import React, { useState } from 'react';
import { X, Lock, FileText, Check, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface VaultPuzzleProps {
  teamTrust: number;
  onClose: () => void;
  onSolved: () => void;
}

export const VaultPuzzle: React.FC<VaultPuzzleProps> = ({
  teamTrust,
  onClose,
  onSolved,
}) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [solved, setSolved] = useState(false);

  // Choices to display
  const choices = [
    { id: 1, text: "'발관조연' 입력하기", correct: false },
    { id: 2, text: "'과깊예섬' 입력하기 (★ 정답)", correct: true },
    { id: 3, text: "'진재우지' 입력하기", correct: false },
  ];

  const handleChoiceSelect = (choice: typeof choices[0]) => {
    if (solved) return;
    setErrorMsg('');

    if (choice.correct) {
      setSolved(true);
    } else {
      setErrorMsg("삑- 올바르지 않은 비밀번호입니다.");
    }
  };

  return (
    <div id="vault-puzzle-modal" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm border-4 border-[#3a2c1e] bg-[#22160c] text-[#f4e4bd] p-6 shadow-[0px_0px_35px_rgba(234,179,8,0.3)] relative rounded-sm"
      >
        {/* Close Button */}
        <div className="absolute right-4 top-4">
          <button
            type="button"
            onClick={onClose}
            className="p-1 px-3 border border-[#4a3e33] bg-[#322316] hover:bg-[#8d2522] hover:text-white rounded text-stone-300 transition cursor-pointer active:scale-95 text-xs font-mono"
          >
            닫기 [X]
          </button>
        </div>

        {/* Title */}
        <div className="border-b-2 border-[#5c4431]/60 pb-3 mb-5 flex items-center gap-3">
          <div className="p-2 border border-[#c49c5e] bg-black text-[#c49c5e] rounded animate-pulse">
            <Lock size={20} />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#cca35a] block font-extrabold">VAULT_FINAL_CHAMBER</span>
            <h2 className="font-serif text-sm font-black text-white">중량식 황동 기어 금고 해제</h2>
          </div>
        </div>

        <p className="text-xs text-stone-300 mb-6 font-serif leading-relaxed text-justify">
          지도교수실의 중량식 황동 금고 장치입니다. 자물쇠 기어가 개방을 대기하고 있습니다. 아래 비밀 코드 선택지 중 하나를 직관적으로 주입해 주십시오.
        </p>

        {/* Selector options list */}
        <div className="space-y-3 select-none mb-6">
          <p className="text-[10px] font-mono text-stone-400">최종 동축 결착 비밀번호 선택:</p>
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => handleChoiceSelect(choice)}
              disabled={solved}
              className={`w-full text-left py-3.5 px-4 rounded border-2 font-serif text-xs font-black transition-all cursor-pointer relative ${
                solved && choice.correct
                  ? 'border-[#9fb471] bg-[#1e2e1a] text-[#9fb471]'
                  : 'border-[#4a3a28] bg-[#1a110a] text-white hover:bg-[#2e1d10] hover:border-[#cca35a] active:scale-[0.98]'
              }`}
            >
              <span className="text-[#cca35a] font-mono mr-2">[{choice.id}]</span>
              {choice.text.replace(' (★ 정답)', '')}
              
              {solved && choice.correct && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#9fb471] font-bold">
                  ✓ SELECTED
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Error visualizer */}
        {errorMsg && (
          <motion.div 
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-2 border-red-900 bg-red-950/40 p-3 text-xs leading-relaxed font-bold text-red-000 font-serif rounded text-center mb-4 flex items-center justify-center gap-2"
          >
            <span>⚠️</span>
            {errorMsg}
          </motion.div>
        )}

        {solved ? (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded flex items-center gap-3 text-emerald-400">
              <span className="text-sm font-black animate-pulse">철컥!</span>
              <span className="text-xs font-serif leading-tight">
                자물쇠 기어가 맞물려 고속 회전하더니 "철컥!" 소리와 함께 금고의 거대한 황동 격벽문이 열렸습니다!
              </span>
            </div>
            
            <button
              type="button"
              onClick={onSolved}
              className="w-full py-3.5 bg-[#cca35a] text-black hover:bg-[#eedcb3] font-serif text-xs font-black tracking-widest transition-all cursor-pointer rounded border-2 border-black"
            >
              금고 수색 완료 및 안전 확인
            </button>
          </div>
        ) : (
          <div className="text-center text-stone-500 font-mono text-[9px] tracking-wider">
            ROTARY_VALVE_ENGAGED
          </div>
        )}
      </motion.div>
    </div>
  );
};

