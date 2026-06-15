import React, { useState } from 'react';
import { X, BookOpen, ChevronLeft, ChevronRight, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface BookcasePuzzleProps {
  onClose: () => void;
  onSolved: () => void;
}

interface SpineBook {
  id: string;
  color: string;
  text: string;
  solutionOrder: number; // Correct position from 1 to 5
  clueChar: string; // The character drawn on it
  spineTitle: string;
}

export const BookcasePuzzle: React.FC<BookcasePuzzleProps> = ({
  onClose,
  onSolved,
}) => {
  // Scrambled vintage books with different spine designs and Korean letters on them
  const [books, setBooks] = useState<SpineBook[]>([
    { id: 'b3', color: 'bg-indigo-950 border-indigo-900 text-indigo-200', text: '기하학총화', solutionOrder: 3, clueChar: '4', spineTitle: 'Ⅲ' },
    { id: 'b5', color: 'bg-[#5c2415] border-[#441a10] text-[#eedcb3]', text: '교수원훈 서전', solutionOrder: 5, clueChar: '타일', spineTitle: 'Ⅴ' },
    { id: 'b1', color: 'bg-[#212f3d] border-[#1a252f] text-stone-200', text: '한국 전력학보', solutionOrder: 1, clueChar: '3', spineTitle: 'Ⅰ' },
    { id: 'b4', color: 'bg-[#1e4620] border-[#143015] text-[#d1e7dd]', text: '지하 동선망', solutionOrder: 4, clueChar: '열', spineTitle: 'Ⅳ' },
    { id: 'b2', color: 'bg-[#705335] border-[#553f28] text-amber-200', text: '서경수 도서전', solutionOrder: 2, clueChar: '행', spineTitle: 'Ⅱ' },
  ]);

  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Move book left or right within the shelf rows
  const moveBook = (index: number, direction: 'left' | 'right') => {
    if (solved) return;
    setErrorMsg('');
    const newBooks = [...books];
    if (direction === 'left' && index > 0) {
      const temp = newBooks[index];
      newBooks[index] = newBooks[index - 1];
      newBooks[index - 1] = temp;
    } else if (direction === 'right' && index < books.length - 1) {
      const temp = newBooks[index];
      newBooks[index] = newBooks[index + 1];
      newBooks[index + 1] = temp;
    }
    setBooks(newBooks);
  };

  const handleVerify = () => {
    // Check if the solutionOrder values are sorted ascending
    const isCorrect = books.every((book, idx) => book.solutionOrder === idx + 1);

    if (isCorrect) {
      setSolved(true);
      setErrorMsg('');
      setTimeout(() => {
        onSolved();
      }, 1500);
    } else {
      setErrorMsg('책들의 고유 대입 전도가 맞지 않습니다. 수열 암시(Ⅰ → Ⅴ)에 맞춰 배열하십시오.');
    }
  };

  return (
    <div id="bookcase-puzzle-modal" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl border-4 border-[#251b12] bg-[#16110e] text-[#f4e4bd] p-6 shadow-[0px_0px_35px_rgba(196,156,94,0.35)] relative rounded-lg">
        {/* Close */}
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="p-1 px-3 border border-[#4a3e33] bg-[#221812] hover:bg-[#8d2522] hover:text-white rounded text-stone-300 transition cursor-pointer active:scale-95 text-xs font-mono"
          >
            닫기 [X]
          </button>
        </div>

        {/* Header */}
        <div className="border-b-2 border-stone-800 pb-3 mb-5 flex items-center gap-3">
          <div className="p-2 border border-[#cca35a] bg-stone-950 text-[#cca35a] rounded">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#cca35a] block">SYSTEM_ARCHIVE_LOCK</span>
            <h2 className="font-serif text-lg font-black text-white">서서 책장 정리가 고유 수열 해독</h2>
          </div>
        </div>

        <p className="text-xs text-stone-400 mb-4 font-serif leading-relaxed">
          책장의 일고 줄을 살펴보니 가죽 책들의 경사도와 순서가 꼬부라져 있습니다.
          책의 책등에 희미하게 각인된 라틴 숫자(Ⅰ~Ⅴ) 순서대로 배치하면, 지도교수가 남겨둔 숨겨진 동축 전선의 타일 위치가 드러납니다.
        </p>

        {/* Wooden bookshelf display */}
        <div className="bg-[#0f0b08] border-8 border-y-[#261b11] border-x-[#322316] rounded shadow-xl p-5 mb-5 select-none">
          <div className="flex justify-center items-end gap-1.5 h-64 border-b-8 border-[#3c2a1c] relative px-4">
            {/* Background texture shadow */}
            <div className="absolute inset-0 bg-[#070504] opacity-80 z-0 pointer-events-none" />

            {/* Book Spine elements */}
            {books.map((book, index) => (
              <div 
                key={book.id}
                className={`w-[68px] z-10 border-x-3 border-t-4 flex flex-col justify-between items-center text-center p-1.5 rounded-t cursor-pointer transform hover:-translate-y-2 transition-all duration-200 shadow-md ${book.color} ${solved ? 'h-52 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'h-48'}`}
              >
                {/* Book Title */}
                <span className="text-[6px] font-serif rotate-35 tracking-tight font-extrabold select-none opacity-50 block mt-2 h-14 leading-none">
                  {book.text}
                </span>

                {/* Drawn symbol or coordinating clue */}
                <div className="w-9 h-9 rounded-full border border-current flex items-center justify-center font-mono font-black text-xs my-2 bg-black/40">
                  {book.clueChar}
                </div>

                {/* Roman Numeral spine indicator */}
                <div className="text-center">
                  <span className="font-mono text-[10px] font-black border-t border-dashed border-current pt-1 block mb-2">
                    {book.spineTitle}
                  </span>
                  
                  {/* Swap buttons */}
                  {!solved && (
                    <div className="flex gap-1 justify-center mt-1 pb-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveBook(index, 'left'); }}
                        disabled={index === 0}
                        className="p-0.5 bg-black/60 rounded hover:bg-yellow-500 hover:text-black text-stone-300 disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronLeft size={10} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); moveBook(index, 'right'); }}
                        disabled={index === books.length - 1}
                        className="p-0.5 bg-black/60 rounded hover:bg-yellow-500 hover:text-black text-stone-300 disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronRight size={10} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button & Error Messages */}
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
                <span className="font-black block">책장 해독 성공!</span>
                <span className="font-serif mt-0.5 block">습득 지침: "바닥 격자에서 3행 4열을 타격하십시오"</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              className="w-full py-3.5 bg-[#cca35a] text-black hover:bg-[#eedcb3] text-xs tracking-wider transition-all cursor-pointer font-black select-none border-2 border-[#1c140c] rounded"
            >
              배치 확인 및 검증하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
