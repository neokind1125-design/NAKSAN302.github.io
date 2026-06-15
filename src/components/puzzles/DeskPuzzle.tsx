import React, { useState, useEffect } from 'react';
import { X, Volume2, Radio, Check, Award, Music, RotateCw } from 'lucide-react';
import { CharacterId } from '../../types';
import { CHARACTER_DATA } from '../../data/gameData';
import { motion } from 'motion/react';

interface DeskPuzzleProps {
  onClose: () => void;
  audiotrackRestored: Record<CharacterId, boolean>;
  onRestoreTrack: (id: CharacterId) => void;
  onCaesarSolved?: () => void;
  cassetteSolved?: boolean;
}

export const DeskPuzzle: React.FC<DeskPuzzleProps> = ({
  onClose,
  audiotrackRestored,
  onRestoreTrack,
  onCaesarSolved,
  cassetteSolved = false,
}) => {
  // Store tuning frequencies (0 to 100)
  const [frequencies, setFrequencies] = useState<Record<CharacterId, number>>({
    JAEYEONG: 15,
    WOOJU: 85,
    JIYEONG: 40,
    JINHAN: 60,
  });

  // Target frequencies for each character's track
  const targets: Record<CharacterId, number> = {
    JAEYEONG: 42,
    WOOJU: 78,
    JIYEONG: 24,
    JINHAN: 91,
  };

  const characters: CharacterId[] = ['JAEYEONG', 'WOOJU', 'JIYEONG', 'JINHAN'];
  const allSolved = Object.values(audiotrackRestored).every(Boolean);

  useEffect(() => {
    if (allSolved && !cassetteSolved) {
      onCaesarSolved?.();
    }
  }, [allSolved, cassetteSolved, onCaesarSolved]);

  const handleTuningChange = (id: CharacterId, val: number) => {
    setFrequencies((prev) => ({ ...prev, [id]: val }));
  };

  const handleSyncAttempt = (id: CharacterId) => {
    const frequency = frequencies[id];
    const target = targets[id];
    if (Math.abs(frequency - target) <= 5) {
      onRestoreTrack(id);
    }
  };

  return (
    <div id="desk-puzzle-modal" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl border-4 border-[#2b2016] bg-[#1a1410] text-[#f4e4bd] p-6 shadow-[0px_0px_35px_rgba(196,156,94,0.3)] relative rounded-lg">
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
        <div className="border-b-2 border-stone-800 pb-3 mb-4 flex items-center gap-3">
          <div className="p-2 border border-[#cca35a] bg-stone-950 text-[#cca35a] rounded animate-pulse">
            <Radio size={20} />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#cca35a] block">SYSTEM_DECK_ALIGN</span>
            <h2 className="font-serif text-lg font-black text-white">낡은 카세트 장치 주파수</h2>
          </div>
        </div>

        {/* Cassette Graphic Container */}
        <div className="bg-[#0b0806] border border-[#2d2217] rounded p-4 mb-5 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
          {/* Visual rotating cassette */}
          <div className="w-[200px] h-[120px] bg-stone-900 rounded-lg p-2.5 flex flex-col justify-between border-2 border-[#cca35a]/50 shadow-inner relative flex-shrink-0">
            <div className="flex justify-between items-center px-1">
              <span className="text-[7px] text-[#cca35a]/80 font-mono tracking-widest uppercase">AUDIO COMPACT</span>
              <span className="text-[7.5px] font-sans font-black text-rose-500">[N_RECOVERY]</span>
            </div>
            
            {/* Cassette spindles with wheels */}
            <div className="flex justify-center gap-8 my-1 relative">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: allSolved ? 40 : 360 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: allSolved ? 12 : 3 }}
                  className="w-9 h-9 rounded-full border-4 border-dashed border-[#cca35a] flex items-center justify-center text-[#cca35a] opacity-80"
                >
                  <RotateCw size={10} />
                </motion.div>
              </div>
              <div className="relative">
                <motion.div 
                  animate={{ rotate: allSolved ? 40 : 360 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: allSolved ? 12 : 3 }}
                  className="w-9 h-9 rounded-full border-4 border-dashed border-[#cca35a] flex items-center justify-center text-[#cca35a] opacity-80"
                >
                  <RotateCw size={10} />
                </motion.div>
              </div>
            </div>

            <div className="border border-[#cca35a]/20 bg-[#070503] h-5 rounded flex items-center justify-center">
              <div className="h-0.5 bg-[#cca35a]/60 w-[80%] rounded animate-pulse" />
            </div>
          </div>

          {/* Description */}
          <div className="flex-grow space-y-2 text-xs text-stone-300">
            <p className="font-serif leading-relaxed text-justify">
              사건 당일 교수실에서 다중 송신된 변조 대역 음성 기록입니다.
              네 수사원의 <strong>단선 오디오 채널</strong>의 수신 주파수 다이얼을 한 지점으로 보정해 병합해야 합니다.
            </p>
            <p className="text-[#cca35a] font-black leading-tight bg-[#221812] border border-[#443323] p-2 rounded">
              💡 팁: 각 수사원의 신호가 동조 범위(+/- 5)에 도달하면 우측 <strong>[동조 승인]</strong> 버튼이 활성화됩니다.
            </p>
          </div>
        </div>

        {/* 4 Tracks Custom Interface */}
        <div className="space-y-3.5 mb-2">
          {characters.map((id) => {
            const data = CHARACTER_DATA[id];
            const restored = audiotrackRestored[id];
            const currentFreq = frequencies[id];
            const targetFreq = targets[id];
            const isNear = Math.abs(currentFreq - targetFreq) <= 5;

            return (
              <div 
                key={id}
                className={`p-3 border rounded-lg transition-all duration-300 flex flex-col md:flex-row items-center gap-4 ${
                  restored 
                    ? 'bg-[#182a17]/50 border-emerald-800' 
                    : isNear 
                      ? 'bg-[#292212] border-yellow-600/50' 
                      : 'bg-[#130f0c] border-[#2c2016]'
                }`}
              >
                {/* Character Name tag */}
                <div className="w-[120px] flex-shrink-0 flex items-center gap-2">
                  <div className="w-2.5 h-10 rounded-sm" style={{ backgroundColor: data.color }} />
                  <div>
                    <span className="text-[12px] font-black text-white block leading-tight">{data.name}</span>
                    <span className="text-[10px] text-[#a59a8d] block leading-none mt-0.5">{data.role}</span>
                  </div>
                </div>

                {/* Slider bar & tuning frequency */}
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 mb-1">
                    <span>다중 대역 동조율 : {currentFreq} MHz</span>
                    {restored ? (
                      <span className="text-emerald-500 font-bold">동조 고정 완료</span>
                    ) : isNear ? (
                      <span className="text-[#cca35a] animate-pulse font-bold">!! 주파수 신호 일치 !!</span>
                    ) : (
                      <span>설정 필요 (목표: {targetFreq}MHz 부근)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentFreq}
                      disabled={restored}
                      onChange={(e) => handleTuningChange(id, Number(e.target.value))}
                      className="flex-grow accent-[#cca35a] cursor-pointer disabled:opacity-30.5"
                    />
                  </div>
                </div>

                {/* Restored Voice Clue Preview or Resolve button */}
                <div className="w-[140px] flex-shrink-0 text-right">
                  {restored ? (
                    <div className="text-[10.5px] text-emerald-400 font-serif leading-tight bg-[#091508]/60 p-2 rounded border border-emerald-900/40 text-center">
                      "{data.sampleLine}"
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={!isNear}
                      onClick={() => handleSyncAttempt(id)}
                      className={`w-full py-2 rounded text-[11px] font-black select-none transition border cursor-pointer ${
                        isNear 
                          ? 'bg-[#cca35a] text-black border-[#eedcb3] hover:bg-[#dfc58f] hover:scale-105 active:scale-95' 
                          : 'bg-stone-900/60 text-stone-500 border-stone-800 pointer-events-none'
                      }`}
                    >
                      동조 승인 [SYNC]
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Solved State Summary footer */}
        {allSolved && (
          <div className="mt-4 border-t border-emerald-800 pt-3 flex flex-col md:flex-row justify-between items-center gap-3 bg-[#112411]/45 p-3 rounded-lg animate-pulse">
            <div className="flex items-center gap-3">
              <Award className="text-emerald-400" size={24} />
              <div className="text-left">
                <span className="text-[13px] font-black text-emerald-300 block">전체 오디오 동조 완성!</span>
                <span className="text-[11px] text-[#a1be99] block font-serif mt-0.5">교수의 성적 비리 변조 단서 데이터가 성공적으로 병합되었습니다.</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-emerald-700 text-white font-black hover:bg-emerald-600 border border-emerald-500 rounded text-xs tracking-widest cursor-pointer select-none transition"
            >
              확인 / 닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
