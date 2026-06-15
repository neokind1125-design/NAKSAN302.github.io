import React, { useState } from 'react';
import { X, Key, Check, RotateCcw, HelpCircle, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CaesarPuzzleProps {
  onClose: () => void;
  onSolved: () => void;
  initiallySolved?: boolean;
}

export const CaesarPuzzle: React.FC<CaesarPuzzleProps> = ({
  onClose,
  onSolved,
  initiallySolved = false,
}) => {
  const cipherText = "QBXJTLOH";
  const targetText = "TEAMWORK";
  const correctShift = 3;

  const [shift, setShift] = useState<number>(0);
  const [typedInput, setTypedInput] = useState<string>('');
  const [isSolved, setIsSolved] = useState<boolean>(initiallySolved);
  const [isError, setIsError] = useState<boolean>(false);
  const [showHelper, setShowHelper] = useState<boolean>(false);

  // Helper to shift a singular letter
  const shiftLetter = (char: string, offset: number): string => {
    const code = char.charCodeAt(0);
    // Uppercase letters are 65 (A) to 90 (Z)
    if (code >= 65 && code <= 90) {
      let shifted = code + offset;
      if (shifted > 90) {
        shifted = 65 + (shifted - 91) % 26;
      } else if (shifted < 65) {
        shifted = 90 - (64 - shifted) % 26;
      }
      return String.fromCharCode(shifted);
    }
    return char;
  };

  // Compute live decrypted text based on the shift slider
  const getShiftedText = (text: string, s: number): string => {
    return text.split('').map(c => shiftLetter(c, s)).join('');
  };

  const currentShiftedText = getShiftedText(cipherText, shift);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = typedInput.trim().toUpperCase();

    // The puzzle is solved if they either have the slider at +3 (currentShiftedText === TEAMWORK) OR if they typed TEAMWORK
    if (cleanInput === targetText || (shift === correctShift && currentShiftedText === targetText)) {
      setIsSolved(true);
      setIsError(false);
      setTimeout(() => {
        onSolved();
      }, 1200);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  const handleSliderSolve = () => {
    if (shift === correctShift || currentShiftedText === targetText) {
      setIsSolved(true);
      setIsError(false);
      setTimeout(() => {
        onSolved();
      }, 1200);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  const resetPuzzle = () => {
    setShift(0);
    setTypedInput('');
    setIsSolved(false);
    setIsError(false);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#070706]/90 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg border-4 border-[#1c140d] bg-[#ebd3a3] p-6 shadow-[8px_8px_0px_#1c140d] relative text-[#1c140d] rounded-sm select-none">
        
        {/* Close Button */}
        <div className="absolute right-4 top-4">
          <button
            type="button"
            onClick={onClose}
            className="rustylake-dark-button cursor-pointer p-1.5 transition text-stone-100 bg-stone-900"
            aria-label="닫기"
          >
            <X size={16} />
          </button>
        </div>

        {/* Header */}
        <div className="pb-3 border-b-2 border-dashed border-[#1c140d]/20 mb-5">
          <div className="flex items-center gap-2">
            <Key className="text-[#8d2522]" size={18} />
            <span className="font-mono text-[9px] tracking-widest text-[#8d2522] font-black uppercase">SYSTEM_CAESAR_DECRYPT</span>
          </div>
          <h2 className="font-serif text-xl font-black text-[#1c140d] mt-1">의문의 단어: 카이사르 유적 암호</h2>
        </div>

        {isSolved ? (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-800 flex items-center justify-center text-emerald-800 shadow-inner">
              <Award size={36} className="animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-black text-emerald-800 font-serif">카이사르 해독 성공!</h3>
              <p className="text-xs text-emerald-950 font-serif mt-1">
                복조 규칙에 의해 숨겨진 문장의 핵심 정체 가치 <strong className="text-sm bg-emerald-200/50 px-2 py-0.5 rounded">"TEAMWORK"</strong>가 해금되었습니다.
              </p>
            </div>
            <div className="text-[10px] bg-emerald-800 text-stone-100 px-3 py-1 rounded font-mono uppercase tracking-widest animate-pulse">
              [ ACCESS GRANTED ]
            </div>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {/* Context description */}
            <p className="text-xs leading-relaxed text-[#2d2116] font-serif text-justify">
              낙산관의 구형 도면 뒤에서 발견한 의문의 훼손된 암호 배열입니다. 알파벳을 일정한 간격만큼 뒤로 밀거나 당기는 <strong className="text-[#8d2522]">카이사르 암호 시프트 규칙</strong>이 각인되어 있습니다.
            </p>

            {/* Shift Visualization Box */}
            <div className="bg-[#120d09] border-2 border-[#3c2a1a] rounded p-4 text-stone-100 text-center relative overflow-hidden">
              <div className="absolute top-1 left-2 text-[7px] font-mono text-stone-400 uppercase tracking-widest">
                Real-time Shift Matrix
              </div>

              {/* Rotator wheels display */}
              <div className="flex justify-center items-center gap-2.5 mt-2.5 mb-3 select-none">
                {cipherText.split('').map((char, index) => {
                  const shifted = shiftLetter(char, shift);
                  const isMatch = shifted === targetText[index];
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-[10px] text-stone-500 font-mono font-bold">{char}</div>
                      <div className="w-1.5 h-2 bg-[#3c2a1a] my-0.5" />
                      <motion.div 
                        key={`${shift}-${shifted}`}
                        initial={{ y: -8, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`w-9 h-11 rounded flex items-center justify-center font-mono text-lg font-black border-2 ${
                          isMatch 
                            ? 'bg-[#183017] border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                            : 'bg-[#1a1511] border-[#c49c5e]/30 text-[#ecd6b7]'
                        }`}
                      >
                        {shifted}
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Indicator values */}
              <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 border-t border-stone-800/80 pt-2 px-1">
                <span>원문: <strong className="text-[#c49c5e]">{cipherText}</strong></span>
                <span className="text-[#cca35a] font-bold">시프트 편차: +{shift}칸 (목표: +3칸)</span>
                <span>출력: <strong className={currentShiftedText === targetText ? "text-emerald-400" : "text-stone-300"}>{currentShiftedText}</strong></span>
              </div>
            </div>

            {/* Slider tuning controls */}
            <div className="space-y-2 select-none">
              <div className="flex justify-between items-center text-[11px] font-bold text-[#1c140d]">
                <span className="font-serif">수동 톱니바퀴 회전 다이얼 조율</span>
                <span className="typewriter-text bg-[#1c140d] text-amber-100 px-2 py-0.5 font-sans font-bold border border-black rounded-sm">KEY: +{shift}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={shift}
                onChange={(e) => {
                  setShift(Number(e.target.value));
                  setIsError(false);
                }}
                className="w-full accent-[#8d2522] cursor-pointer"
              />
            </div>

            {/* Manual Text Guessing Input alternative */}
            <form onSubmit={handleSubmit} className="border-t border-[#1c140d]/10 pt-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#1c140d]">
                <label htmlFor="caesar-guess" className="font-serif">직접 해독 단어 입력 (영어 대문자)</label>
                <button
                  type="button"
                  onClick={() => setShowHelper(!showHelper)}
                  className="text-xs text-[#8d2522] hover:underline flex items-center gap-1 select-none font-sans"
                >
                  <HelpCircle size={13} />
                  <span>단서 설명</span>
                </button>
              </div>

              {showHelper && (
                <div className="bg-[#eedcaf] border-2 border-dashed border-[#8d2522]/30 p-2 text-[10.5px] leading-relaxed text-[#5c3e25] font-serif">
                  💡 암호화된 볼륨 서명 <strong className="font-sans">"QBXJTLOH"</strong>를 오른쪽으로 세 칸 알파벳 순서대로 보정 시프트(+3)하면, 수사관들의 협력 가치를 뜻하는 영문 단어가 나타납니다.
                </div>
              )}

              <div className="flex gap-2">
                <input
                  id="caesar-guess"
                  type="text"
                  value={typedInput}
                  onChange={(e) => {
                    setTypedInput(e.target.value);
                    setIsError(false);
                  }}
                  placeholder="단어를 입력하세요..."
                  className="flex-grow bg-[#0c0907] border-2 border-[#1c140d] px-3 py-2 font-mono text-sm text-[#ebd3a3] uppercase tracking-wider outline-none focus:border-[#8e2522] rounded-sm"
                />
                
                <button
                  type="submit"
                  className="rustylake-dark-button px-5 py-2 select-none font-sans text-xs bg-stone-900 border-2 border-black font-black text-amber-200 hover:bg-stone-850 cursor-pointer rounded-sm"
                >
                  확인
                </button>
              </div>

              {/* Slider Verification Action Button */}
              <div className="flex justify-between items-center gap-2 mt-4 pt-1.5 flex-col sm:flex-row">
                <button
                  type="button"
                  onClick={resetPuzzle}
                  className="px-3.5 py-1.5 border border-[#1c140d]/40 text-[#1c140d]/75 hover:bg-[#cca35a]/20 text-[11px] font-bold rounded-sm select-none flex items-center justify-center gap-1.5 cursor-pointer leading-none w-full sm:w-auto"
                >
                  <RotateCcw size={12} />
                  <span>재설정</span>
                </button>

                <button
                  type="button"
                  onClick={handleSliderSolve}
                  className={`py-2 px-6 rounded text-xs select-none font-black transition border cursor-pointer border-black font-sans leading-none flex items-center justify-center gap-1 w-full sm:w-auto ${
                    shift === correctShift || currentShiftedText === targetText
                      ? 'bg-emerald-700 text-stone-100 font-bold hover:bg-emerald-600'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-300'
                  }`}
                >
                  <Check size={14} />
                  <span>다이얼 기어 인증하기</span>
                </button>
              </div>

              {isError && (
                <motion.p 
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[10.5px] text-[#8e2522] font-black tracking-tight"
                >
                  ⚠ 오류: 카이사르 영점이 어긋났거나 정답 단어가 올바르지 않습니다!
                </motion.p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
