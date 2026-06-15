import React from 'react';
import { ArrowRight, DoorOpen, Eye, KeyRound, MousePointerClick, UsersRound } from 'lucide-react';
import { CHARACTER_DATA } from '../data/gameData';
import { CharacterId } from '../types';

interface LandingPageProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

const CHARACTER_IDS = Object.keys(CHARACTER_DATA) as CharacterId[];

export const LandingPage: React.FC<LandingPageProps> = ({ onCreateRoom, onJoinRoom }) => {
  return (
    <div className="mystery-bg min-h-screen text-[#f4e4bd] bg-[#0c0a08] ink-vignette relative">
      <div className="game-shell">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 border-b-2 border-[#1c140d]">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center border-4 border-[#1c140d] bg-[#ebd3a3] text-[#17100b] shadow-[4px_4px_0px_#1c140d] transition duration-200 hover:-rotate-6">
              <KeyRound size={22} className="animate-pulse" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <p className="typewriter-text text-[#bca374] uppercase tracking-wider font-bold">Naksan Incident · Case File 302</p>
              <h1 className="title-serif text-3xl font-black text-[#f5dfad] tracking-wide">낙산관 302호</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onJoinRoom}
              className="rustylake-dark-button cursor-pointer px-4 py-2 text-xs font-black tracking-widest hidden sm:inline-block"
            >
              방 코드 입력
            </button>
          </div>
        </header>

        <main className="mx-auto grid min-h-[calc(100vh-100px)] max-w-7xl grid-cols-1 gap-12 px-6 pb-12 pt-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2.5 border-2 border-[#1c140d] bg-[#1a120d]/95 px-4 py-2 text-xs font-black tracking-[0.2em] text-[#e3be67] shadow-[6px_6px_0px_#1c140d]">
              <span className="relative flex h-2.5 w-2.5 border border-black rounded-full bg-[#d24a3f]">
                <span className="animate-ping absolute inset-0 rounded-full bg-[#d24a3f] opacity-75"></span>
              </span>
              <span className="typewriter-text text-[#e3be67] font-bold">ACT_COOP: 60:00 · MYSTERY TIMELINE</span>
            </div>

            <div className="space-y-5">
              <h1 className="title-serif text-5xl font-black leading-[1.05] text-[#f4dba5] md:text-7xl">
                나눠야<br />
                열린다.
              </h1>
              <p className="max-w-xl text-base md:text-lg leading-8 text-[#d8c49d] font-serif italic border-l-4 border-[#8e2522] pl-4 bg-[#1a120e]/60 py-2.5 pr-2">
                "밤늦게 모인 4명의 눈앞에 드리운 오디오 채널과 잠금 타일. 
                각자가 바라보는 각자의 단서를 한 끗의 숨김없이 공유해야만 
                최교수의 중량식 금고를 해금하고 이곳을 나설 것입니다."
              </p>
              <p className="max-w-xl text-xs md:text-sm leading-6 text-[#9c8b70] font-sans">
                카세트 플레이어, 찢어진 서약서, 칠판의 분필 지도, CCTV의 입사각 배율이 기계식 금고 조합암호로 이어지는 **Rusty Lake 스타일의 밀실 2D Point & Click 협동 탈출** 게임입니다.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={onCreateRoom}
                className="rustylake-button cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-black tracking-widest text-[#17100b]"
              >
                방 개설 및 조사 시작
                <ArrowRight size={19} />
              </button>
              <button
                type="button"
                onClick={onJoinRoom}
                className="rustylake-dark-button cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-black tracking-widest"
              >
                <UsersRound size={19} />
                기존 팀 코드로 참여
              </button>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3 pt-3">
              {[
                ['01 / 관찰 수사', '기물 위 원형 점을 클릭해 수동 다이얼과 숨은 기호 장치를 확대 판독힙니다.'],
                ['02 / 상호 공유', '오직 자신에게만 해상되는 실시간 오디오/문맥 단서를 즉시 팀에 전달하세요.'],
                ['03 / 신뢰 결합', '서로의 결점을 중재해 수사 신뢰도가 높아지면 최종 승인 금고 코드가 탄생합니다.']
              ].map(([title, desc], idx) => (
                <div key={title} className="rustylake-dark-panel p-4 relative overflow-hidden">
                  <div className="absolute right-3.5 top-1 title-serif text-5xl font-black text-[#e5d3b3]/5 select-none">
                    {idx + 1}
                  </div>
                  <p className="typewriter-text text-[#ebd3a3] font-bold tracking-wider mb-2">{title}</p>
                  <p className="text-xs leading-relaxed text-[#bca27d]">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            {/* Flat Illustrated 2D Scene Stage */}
            <div className="scene-stage border-4 border-[#1c140d] relative shadow-[8px_8px_0px_#1c140d] ink-vignette">
              <div className="scene-back-wall" />
              <div className="scene-floor" />

              {/* Central Clock Danger Glow */}
              <div className="absolute left-[41%] top-[5%] z-20 border-4 border-[#1c140d] bg-[#110d0a] px-3.5 py-1.5 text-xl font-bold text-[#d24a3f] red-glow tracking-widest uppercase typewriter-text">
                60:00
              </div>

              {/* Bookcase element */}
              <div className="scene-bookcase border-4 border-[#1c140d]">
                <div className="grid h-full grid-cols-5 gap-1 p-2 bg-[#4c321d]">
                  {Array.from({ length: 30 }).map((_, index) => (
                    <span
                      key={index}
                      className="border border-[#17100b]"
                      style={{
                        backgroundColor:
                          index === 7 ? '#d0a348' : index % 5 === 0 ? '#1f3822' : index % 4 === 0 ? '#6c2f29' : '#140c08',
                        transform: index === 7 ? 'translateY(-4px) scaleY(1.08)' : undefined
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Chalkboard element */}
              <div className="scene-chalkboard border-4 border-[#1c140d] p-4 text-[#a7c98c]/40 flex flex-col justify-between">
                <div className="h-0.5 bg-[#a7c98c]/40 border-b border-[#1c140d]/10" />
                <div className="h-px w-2/3 bg-[#a7c98c]/30 mt-3" />
                <div className="h-px w-5/6 bg-[#a7c98c]/20 mt-3" />
                <div className="rotate-[-6deg] font-serif text-[10px] text-[#bddd8a]/40 italic pl-1">
                  1) AUDIO SYNCPHASE<br />
                  2) EAST ANGLE: 85°<br />
                  3) RECON ANGLE: 14°
                </div>
                <div className="self-end typewriter-text text-[9px] text-[#b4d89a]/75 bg-[#0a150e] px-1 py-0.5 border border-[#1c140d]">
                  SYS_LINK: 14°
                </div>
              </div>

              {/* Security Console element */}
              <div className="scene-security border-4 border-[#1c140d] p-2 relative">
                <div className="h-5 border-2 border-black bg-[#281c3e] shadow-[0_0_12px_rgba(40,28,62,.4)] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" />
                </div>
                <div className="mt-2.5 h-16 border-2 border-black bg-[#050505] p-1.5 font-mono text-[9px] text-green-500 overflow-hidden leading-normal">
                  STABLE_CON<br />
                  CCTV_ANG: 014<br />
                  RESOLVED_O
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-[#d24a3f] shadow-[0_0_10px_#d24a3f] border border-black" />
              </div>

              {/* Desk assembly */}
              <div className="scene-desk border-4 border-[#1c140d]">
                <div className="absolute left-[8%] top-[-38px] h-9 w-20 border-2 border-[#1c140d] bg-[#141822] flex items-center justify-center">
                  {/* Tape Recorder outline sketch */}
                  <span className="text-[9px] text-stone-500 typewriter-text">[REC]</span>
                </div>
                <div className="absolute right-[10%] top-[-24px] h-6 w-24 rotate-3 border-2 border-[#1c140d] bg-[#dfc587] shadow-lg shadow-black/40" />
                <div className="absolute left-[45%] top-2.5 h-6 w-16 rounded border border-black bg-[#110d0a]" />
              </div>

              {/* Interactive Floor Grid */}
              <div className="scene-grid opacity-80">
                {Array.from({ length: 36 }).map((_, index) => (
                  <span
                    key={index}
                    className={`transition duration-300 border border-[#1c140d] ${
                      index === 15 ? 'bg-[#cbd3a3] animate-pulse shadow-inner' : 'bg-[#5b3b24]/40'
                    }`}
                  />
                ))}
              </div>

              {/* Safe element */}
              <div className="scene-safe border-4 border-[#1c140d] bg-[#221e1a]">
                <div className="mx-auto mt-4 h-8 w-12 rounded-full border-2 border-[#1c140d] bg-[#cf9a3e] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-black" />
                </div>
                <div className="mx-auto mt-4 h-11 w-14 border-2 border-[#1c140d] bg-[#0c0a09] flex items-center justify-center">
                  <div className="w-1.5 h-4 bg-teal-500 animate-pulse border border-black" />
                </div>
              </div>

              {/* Overlay Tag */}
              <div className="absolute bottom-4 left-4 border-4 border-[#1c140d] bg-[#ebd3a3] px-3.5 py-1.5 text-xs font-bold font-black tracking-wider text-[#1c140d] shadow-[4px_4px_0px_#1c140d]">
                LAB 302 · GRID REF
              </div>
            </div>

            {/* Quick Dossier Profiles below illustration */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CHARACTER_IDS.map((id) => {
                const data = CHARACTER_DATA[id];
                return (
                  <div
                    key={id}
                    className="p-3 border-2 border-[#1c140d] bg-[#1a120d]/90 shadow-[3px_3px_0px_#1c140d] relative group hover:-translate-y-0.5 transition duration-150"
                  >
                    <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: data.color }} />
                    <p className="typewriter-text text-[9px] text-[#bca374] font-bold uppercase">{data.role}</p>
                    <p className="mt-1 title-serif text-lg font-bold" style={{ color: data.lightColor }}>{data.name}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
