import React, { useState } from 'react';
import { X, Camera, RefreshCw, CheckCircle, Shield } from 'lucide-react';
import { Room3DViewer } from '../Room3DViewer';

interface CctvPuzzleProps {
  angle: number;
  onChangeAngle: (newAngle: number) => void;
  onClose: () => void;
  onSolved: () => void;
}

export const CctvPuzzle: React.FC<CctvPuzzleProps> = ({
  angle,
  onChangeAngle,
  onClose,
  onSolved,
}) => {
  const [solved, setSolved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Noise percentage based on distance from target 14°
  const getNoiseLevel = () => {
    const diff = Math.abs(angle - 14);
    if (diff === 0) return 0;
    if (diff <= 5) return 20;
    if (diff <= 15) return 50;
    if (diff <= 35) return 80;
    return 100;
  };

  const pct = getNoiseLevel();

  const handleVerify = () => {
    if (angle === 14) {
      setSolved(true);
      setErrorMsg('');
      setTimeout(() => {
        onSolved();
      }, 1500);
    } else {
      setErrorMsg(`신호 왜곡 현상: 입력각이 ${angle}° 입니다. 정밀 중계 영점 각도(14°)와 일치시키십시오.`);
    }
  };

  return (
    <div id="cctv-puzzle-modal" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl border-4 border-[#1f2937] bg-[#111827] text-[#f4e4bd] p-6 shadow-[0px_0px_35px_rgba(59,130,246,0.25)] relative rounded-lg select-none">
        {/* Close Button */}
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="p-1 px-3 border border-stone-800 bg-[#1e293b] hover:bg-[#8d2522] hover:text-white rounded text-stone-300 transition cursor-pointer active:scale-95 text-xs font-mono"
          >
            닫기 [X]
          </button>
        </div>

        {/* Title */}
        <div className="border-b-2 border-slate-800 pb-3 mb-5 flex items-center gap-3">
          <div className="p-2 border border-blue-500 bg-black text-blue-500 rounded animate-pulse">
            <Camera size={20} />
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#cca35a] block font-extrabold">CCTV_MATRIX_CALIB</span>
            <h2 className="font-serif text-base font-black text-white">보안 폐쇄회로 감시카메라 동조 보정</h2>
          </div>
        </div>

        <p className="text-xs text-stone-400 mb-4 font-serif leading-relaxed">
          칠판에 기록된 영점 좌표 <strong>'북위 14도'</strong>에서 얻은 보정 각도를 CCTV 제어기에 직접 투기해야 합니다.
          슬라이더를 좌우로 조율하여 렌즈 주사선을 <strong>정밀 14도</strong>로 변경해 주사를 완료하십시오.
        </p>

        {/* 메인 3D 보안 챔버 뷰포트 */}
        <div className="w-full h-[220px] bg-black border-2 border-slate-800 rounded mb-4 overflow-hidden shadow-inner relative">
          <div className="absolute top-2.5 left-2.5 z-10 bg-black/85 px-2 py-0.5 border border-red-500 rounded text-[7px] font-mono tracking-widest text-[#f05555] uppercase flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-650 inline-block" />
            LIVE_FEED_MAIN : CAMERA_ALPHA_ANGLE_SWEEP
          </div>
          <Room3DViewer angle={angle} onChangeAngle={onChangeAngle} isInteractive={true} />
        </div>

        {/* 3 Monitor screens */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-black border border-slate-900 mb-5 rounded shadow-inner">
          {/* Monitor 1 */}
          <div className="aspect-[4/3] bg-[#0c120c] border border-blue-950/60 p-2 flex flex-col justify-between relative overflow-hidden">
            <span className="font-mono text-[7px] text-emerald-400 tracking-wider">CH1. WALL_BACK</span>
            
            <div className="text-center my-auto relative">
              {pct >= 80 ? (
                <div className="text-[9px] font-mono text-stone-600 animate-pulse">⚡ NO_SIGNAL</div>
              ) : pct >= 50 ? (
                <div className="text-[12px] font-mono text-[#75fd91]/40 blur-[1px]">[$4]</div>
              ) : (
                <div className="text-[34px] font-mono text-[#75fd91] font-black tracking-widest" style={{ textShadow: '0 0 8px #75fd91' }}>
                  4
                </div>
              )}
            </div>

            <div className="flex justify-between items-center font-mono text-[6px] text-stone-500">
              <span>ANT_7</span>
              <span>102 FPS</span>
            </div>
            
            {/* Scan lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />
          </div>

          {/* Monitor 2 */}
          <div className="aspect-[4/3] bg-[#0c120c] border border-blue-950/60 p-2 flex flex-col justify-between relative overflow-hidden">
            <span className="font-mono text-[7px] text-emerald-400 tracking-wider">CH2. SAFE_CENTER</span>
            
            <div className="text-center my-auto relative">
              {pct >= 50 ? (
                <div className="text-[9px] font-mono text-stone-600 animate-pulse">⚡ SCAN_MISS</div>
              ) : pct >= 20 ? (
                <div className="text-[12px] font-mono text-[#75fd91]/40 blur-[1px]">[*0*]</div>
              ) : (
                <div className="text-[34px] font-mono text-[#75fd91] font-black tracking-widest" style={{ textShadow: '0 0 8px #75fd91' }}>
                  0
                </div>
              )}
            </div>

            <div className="flex justify-between items-center font-mono text-[6px] text-stone-500">
              <span>ANT_9</span>
              <span>102 FPS</span>
            </div>
            
            {/* Scan lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />
          </div>

          {/* Monitor 3 */}
          <div className="aspect-[4/3] bg-[#0c120c] border border-blue-950/60 p-2 flex flex-col justify-between relative overflow-hidden">
            <span className="font-mono text-[7px] text-emerald-400 tracking-wider">CH3. DESK_FRONT</span>
            
            <div className="text-center my-auto relative">
              {pct >= 80 ? (
                <div className="text-[9px] font-mono text-stone-600 animate-pulse">⚡ NO_SIGNAL</div>
              ) : pct >= 50 ? (
                <div className="text-[12px] font-mono text-[#75fd91]/40 blur-[1px]">[#2]</div>
              ) : (
                <div className="text-[34px] font-mono text-[#75fd91] font-black tracking-widest" style={{ textShadow: '0 0 8px #75fd91' }}>
                  2
                </div>
              )}
            </div>

            <div className="flex justify-between items-center font-mono text-[6px] text-stone-500">
              <span>ANT_3</span>
              <span>102 FPS</span>
            </div>
            
            {/* Scan lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none" />
          </div>
        </div>

        {/* Tuning controls */}
        <div className="bg-[#1e293b]/70 border border-slate-800 p-4 rounded mb-4">
          <div className="flex justify-between items-center font-bold text-xs text-stone-200 mb-2 font-serif">
            <span>수동 신호 제어 다이얼</span>
            <span className="font-mono px-2.5 py-1 text-xs font-black bg-blue-950 border border-blue-800 text-cyan-300 rounded">
              {angle}°
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="180"
            value={angle}
            disabled={solved}
            onChange={(e) => onChangeAngle(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer disabled:opacity-40"
          />

          <div className="flex justify-between text-[8px] font-mono text-stone-500 mt-1">
            <span>0° (서)</span>
            <span>90° (수직)</span>
            <span>180° (동)</span>
          </div>
        </div>

        {/* Bottom verification */}
        <div className="space-y-3.5">
          {errorMsg && (
            <p className="border border-red-900 bg-red-950/20 p-2 text-[11px] leading-relaxed font-bold text-red-400 font-serif rounded">
              ⚠️ {errorMsg}
            </p>
          )}

          {solved ? (
            <div className="p-3 bg-blue-950/40 border border-blue-800 rounded flex items-center gap-3 text-cyan-400 animate-pulse">
              <CheckCircle size={18} />
              <div className="text-xs">
                <span className="font-black block">CCTV 필터 보정 성공!</span>
                <span className="font-serif mt-0.5 block">도어락 및 연구실 주 통신선에 선명하게 드러난 비밀번호는 <strong>"402"</strong>입니다. (금고 동결 완료)</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs tracking-wider transition-all cursor-pointer font-black select-none border-2 border-black rounded shadow"
            >
              CCTV 렌즈 각도 검증 및 주입 [CALIBRATE]
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
