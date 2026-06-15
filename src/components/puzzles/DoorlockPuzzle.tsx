import React, { useState } from 'react';
import { X, Lock, Check, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface DoorlockPuzzleProps {
  onClose: () => void;
  onSolved: () => void;
}

export const DoorlockPuzzle: React.FC<DoorlockPuzzleProps> = ({
  onClose,
  onSolved,
}) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [solved, setSolved] = useState(false);
  const [showDocument, setShowDocument] = useState(false);

  // Choices to display
  const choices = [
    { id: 1, text: "1945년", correct: false },
    { id: 2, text: "1987년 (★ 정답)", correct: true },
    { id: 3, text: "2011년", correct: false },
  ];

  const handleChoiceSelect = (choice: typeof choices[0]) => {
    if (solved) return;
    setErrorMsg('');

    if (choice.correct) {
      setSolved(true);
      // Show document after "철컥!" sound presentation
      setTimeout(() => {
        setShowDocument(true);
      }, 1000);
    } else {
      setErrorMsg("삑- 올바르지 않은 비밀번호입니다.");
    }
  };

  return (
    <div id="doorlock-puzzle-modal" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
      {!showDocument ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-sm border-4 border-[#3a2016] bg-[#1a130e] text-[#f4e4bd] p-6 shadow-[0px_0px_35px_rgba(234,179,8,0.2)] relative rounded-sm select-none"
        >
          {/* Close Button */}
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="p-1 px-3 border border-stone-800 bg-[#2b170e] hover:bg-[#8d2522] hover:text-white rounded text-stone-300 transition cursor-pointer active:scale-95 text-xs font-mono"
            >
              닫기 [X]
            </button>
          </div>

          {/* Title */}
          <div className="border-b-2 border-stone-800 pb-3 mb-5 flex items-center gap-3">
            <div className="p-2 border border-[#c49c5e] bg-black text-[#c49c5e] rounded animate-pulse">
              <Lock size={20} />
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-widest text-[#cca35a] block font-extrabold">KEYPAD_DOOR_SYSTEM</span>
              <h2 className="font-serif text-sm font-black text-white">연구실 전자 도어락 잠금 해제</h2>
            </div>
          </div>

          <p className="text-xs text-stone-300 mb-6 font-serif leading-relaxed text-justify">
            도어락 화면에 <strong className="text-[#cca35a]">'한성대학교 이진호 초대교수가 사망한 년도를 입력하세요'</strong>라는 문구가 떠 있습니다. 올바른 년도를 선택해 주십시오.
          </p>

          {/* Selector options list */}
          <div className="space-y-3 select-none mb-6">
            <p className="text-[10px] font-mono text-stone-500">도어락 결착 비밀번호 선택:</p>
            {choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => handleChoiceSelect(choice)}
                disabled={solved}
                className={`w-full text-left py-3.5 px-4 rounded border-2 font-serif text-xs font-black transition-all cursor-pointer relative ${
                  solved && choice.correct
                    ? 'border-[#9fb471] bg-[#1a2e1d] text-[#9fb471]'
                    : 'border-stone-800 bg-[#120e0a] text-white hover:bg-[#251b14] hover:border-[#cca35a] active:scale-[0.98]'
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
              className="border-2 border-red-900 bg-red-950/40 p-3 text-xs leading-relaxed font-bold text-red-400 font-serif rounded text-center mb-4 flex items-center justify-center gap-2"
            >
              <span>⚠️</span>
              {errorMsg}
            </motion.div>
          )}

          {solved ? (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded flex items-center gap-3 text-emerald-400 animate-bounce">
              <span className="text-sm font-black animate-pulse">철컥!</span>
              <span className="text-xs font-serif leading-tight">
                카드 수신 키패드가 맞물려 작동 신호음을 인입하더니 "철컥!" 소리와 함께 전원 개방을 마쳤습니다!
              </span>
            </div>
          ) : (
            <div className="text-center text-stone-500 font-mono text-[9px] tracking-wider">
              SAFETY_ENGAGED_KEYPAD
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-full max-w-lg bg-[#fbf9f4] border-[10px] border-[#1c140d]/90 p-8 text-[#1c140d] shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative rounded-sm paper-grain"
        >
          {/* Confident border accent lines */}
          <div className="absolute inset-2 border border-[#1c140d]/15 pointer-events-none" />

          {/* Official Seal stamp graphic */}
          <div className="absolute right-6 top-6 w-24 h-24 rounded-full border-4 border-dashed border-red-600/70 text-red-600/80 flex flex-col items-center justify-center rotate-[-12deg] font-mono select-none z-10">
            <span className="text-[7px] tracking-widest font-extrabold uppercase">ACADEMIC_SEAL</span>
            <span className="text-2xl font-black mt-0.5">최종 학점</span>
            <span className="text-3xl font-extrabold tracking-tighter leading-none mt-0.5">A+</span>
          </div>

          <div className="border-b-2 border-[#1c140d]/30 pb-4 mb-6">
            <span className="text-[9px] font-mono font-black tracking-widest text-[#8d2522] uppercase font-bold">Hanseong University Document Release</span>
            <h1 className="font-serif text-2xl font-black text-[#1c140d] tracking-tight mt-1">성적 정정 결의통지서</h1>
            <p className="text-[10px] text-stone-500 font-mono mt-1">발급 번호: HAN-COM-1987-0302 · 통제 분류: 대외비 (Confidential)</p>
          </div>

          {/* Form details tabular structure */}
          <div className="border border-[#1c140d]/20 bg-stone-50/50 rounded-sm mb-6 font-serif">
            <div className="grid grid-cols-3 divide-x divide-[#1c140d]/10 border-b border-[#1c140d]/10 text-xs">
              <div className="p-2.5 font-bold text-stone-500 bg-stone-100/40">정정 사유</div>
              <div className="p-2.5 col-span-2 text-stone-900 font-black">4인 비대칭 협동 테스트 최종 확인 및 전산 기록 복구 성공</div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-[#1c140d]/10 border-b border-[#1c140d]/10 text-xs">
              <div className="p-2.5 font-bold text-stone-500 bg-stone-100/40">공동 수강생</div>
              <div className="p-2.5 col-span-2 text-stone-900 font-medium">김재영, 김우주, 김지영, 박진한</div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-[#1c140d]/10 text-xs">
              <div className="p-2.5 font-bold text-stone-500 bg-stone-100/40">최종 확인 학점</div>
              <div className="p-2.5 col-span-2 text-[#8d2522] font-black text-sm flex items-center gap-1.5">
                <span>기존 [ D ]등급에서</span>
                <span className="px-1.5 py-0.5 bg-red-100 text-red-700 font-extrabold text-xs inline-block rounded">A+ 승급 및 확정</span>
              </div>
            </div>
          </div>

          {/* Professor message box quote */}
          <div className="border-l-4 border-[#8d2522] bg-[#8d2522]/5 p-4 text-stone-850 font-serif text-sm font-semibold leading-relaxed mb-6 italic select-none">
            "나의 마지막 강의를 성공적으로 마친 것을 축하한다. 탈출 성공!"
          </div>

          <div className="text-[10px] text-stone-500 font-mono text-center mb-6 leading-tight">
            ※ 위 처분은 낙산관 302호 주임교수의 최종 인가 명령에 따라 공공 전산망에 즉각 등록 완료되었습니다.
          </div>

          <button
            type="button"
            onClick={onSolved}
            className="w-full py-4 bg-[#1c140d] text-[#fbf9f4] hover:bg-[#32261a] active:scale-[0.99] font-serif text-xs font-black tracking-widest transition-all cursor-pointer rounded border-3 border-black shadow-lg uppercase"
          >
            기록 제출 완료 및 최종 게임 종료
          </button>
        </motion.div>
      )}
    </div>
  );
};
