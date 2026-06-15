import React, { useState } from 'react';
import { Home, RefreshCw, Share2, Award, ClipboardCheck } from 'lucide-react';

interface EndingPageProps {
  endingId: string;
  trust: number;
  hints: number;
  clues: number;
  resultText: string;
  onRestart: () => void;
}

export const EndingPage: React.FC<EndingPageProps> = ({
  endingId,
  trust,
  hints,
  clues,
  resultText,
  onRestart
}) => {
  const [stampNotification, setStampNotification] = useState<string | null>(null);

  const isTrueEnding = endingId === 'ENDING_A';
  const isFailEnding = endingId === 'ENDING_C';

  const title = isTrueEnding
    ? 'True Ending: 공감의 동행 (A+)'
    : isFailEnding
      ? 'Fail Ending: 폐쇄된 낙산관 (F)'
      : 'Normal Ending: 타협된 탈출 (B)';

  const gradeChar = isTrueEnding ? 'A+' : isFailEnding ? 'F' : 'B';

  const description = isTrueEnding
    ? '네 명의 학생들은 단서의 결핍을 우정으로 채우며 교수의 마지막 은밀한 시험을 만점으로 완수했습니다. 금고 속에는 성적표 대신 진정한 연대의 가치가 쓰인 일지가 들어있었습니다.'
    : isFailEnding
      ? '시간이 만료되자 302호의 서약서 파쇄장치와 기계식 잠금이 영구히 가동되었습니다. 서로를 의심하고 비밀번호 완성에 실패하여 조는 낙제 처분을 면치 못했습니다.'
      : '금고의 문은 기어코 열렸지만, 끝내 서로에게 말하지 못했던 정황 조각들이 미결로 남아 잔영처럼 남아 있습니다.';

  const handleActionClick = (actionName: string, msg: string) => {
    setStampNotification(`${actionName}: ${msg}`);
    window.setTimeout(() => setStampNotification(null), 3000);
  };

  const getThemeStyles = () => {
    if (isTrueEnding) {
      return {
        cardClass: 'border-[#9fb471] bg-gradient-to-b from-[#1b251a] to-[#111610] shadow-[0_30px_70px_rgba(159,180,113,0.12)]',
        accentColor: '#9fb471',
        stampBg: 'border-[#9fb471] text-[#9fb471] bg-[#9fb471]/10',
        kicker: 'text-[#9fb471]',
        quoteBorder: 'border-[#9fb471]/20'
      };
    }
    if (isFailEnding) {
      return {
        cardClass: 'border-[#8d2522] bg-gradient-to-b from-[#251313] to-[#120a0a] shadow-[0_30px_70px_rgba(141,37,34,0.18)]',
        accentColor: '#d24a3f',
        stampBg: 'border-[#d24a3f] text-[#d24a3f] bg-[#d24a3f]/10 animate-pulse',
        kicker: 'text-[#d24a3f]',
        quoteBorder: 'border-[#8d2522]/30'
      };
    }
    return {
      cardClass: 'border-[#3d2a1c] bg-gradient-to-b from-[#1c1511] to-[#0f0b09] shadow-2xl',
      accentColor: '#dfb36b',
      stampBg: 'border-[#cca35a] text-[#cca35a] bg-[#cca35a]/5',
      kicker: 'text-[#cca35a]',
      quoteBorder: 'border-[#3d2a1c]'
    };
  };

  const theme = getThemeStyles();

  return (
    <div className="mystery-bg min-h-screen grid place-items-center p-6 text-[#f4e4bd] bg-[#0c0a08]">
      <div className="game-shell w-full max-w-3xl relative">
        {/* Dynamic Notification Toast */}
        {stampNotification && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 border-2 border-[#cca35a] bg-[#110d0a] text-[#f5dfad] font-bold text-xs px-5 py-3 tracking-wide shadow-2xl flex items-center gap-2.5 animate-bounce">
            <ClipboardCheck size={15} className="text-[#9fb471]" />
            {stampNotification}
          </div>
        )}

        {/* Outer casing */}
        <main className={`paper-panel text-[#1b130c] rounded-none p-8 md:p-12 relative overflow-hidden ${theme.quoteBorder}`}>
          
          {/* Authentic Confidentiality Seal line */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#8d2522] via-[#e6c987] to-[#263829]" />

          {/* Massive Grade Stamp visualizer */}
          <div className={`absolute right-8 md:right-16 top-10 md:top-14 w-28 h-28 md:w-32 md:h-32 rounded-full border-4 ${theme.stampBg} flex flex-col items-center justify-center rotate-[16deg] font-mono select-none z-10 shadow-lg`}>
            <span className="text-[10px] tracking-widest font-black uppercase">EVAL_GRADE</span>
            <span className="text-4xl md:text-5xl font-black tracking-tighter mt-1">{gradeChar}</span>
            <span className="text-[8px] tracking-[0.2em] font-bold uppercase mt-1">Naksan Lab</span>
          </div>

          <div className="border-b-2 border-[#1c130d]/30 pb-6 mb-8">
            <p className="text-[10px] font-black tracking-[0.25em] text-[#8d2522] uppercase">
              Official Academic Tribunal CaseReport
            </p>
            <h1 className="title-serif text-3xl md:text-5xl font-black text-[#1c130d] tracking-tight mt-2.5">
              {title}
            </h1>
            <p className="text-xs text-[#52443a] font-serif italic mt-3">
              사건번호: NAKS-302-C (일련번호: {endingId}) · 담당관: 조교 및 지도교수진 합동 종합배점표
            </p>
          </div>

          {/* Narrative Document Paragraph */}
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8d2522]">
              결정 요지 및 정황서
            </p>
            <p className="text-sm md:text-base leading-8 text-[#2c2016] font-serif text-justify font-medium">
              {description}
            </p>
          </div>

          {/* Thematic quote from professor */}
          <blockquote className="mt-8 border-l-4 border-[#1c130d] bg-[#1c130d]/5 p-5 text-[#302116] font-serif text-xs md:text-sm leading-7 italic">
            "{resultText || '방문을 여는 일은 손끝이 아니라 마음이 마주하는 일이다. 네 기호의 진실을 숨기지 않았기를.'}"
          </blockquote>

          {/* Forensic statistics card table */}
          <div className="mt-8 border-2 border-[#1c130d]/80 bg-[#1c130d]/5 grid grid-cols-2 gap-px divide-x divide-y divide-[#1c130d]/20 overflow-hidden text-center md:grid-cols-4 font-serif">
            {[
              ['합동 신뢰지수', `${trust}%`, isTrueEnding ? 'text-[#263829] font-black' : ''],
              ['조사 힌트 소비', `${hints} / 10`, hints > 4 ? 'text-[#8d2522]' : ''],
              ['실시간 공유 단서', `${clues}개`, ''],
              ['결과 부코드', endingId, 'font-mono text-xs']
            ].map(([label, value, customCls]) => (
              <div key={label} className="p-4 bg-gradient-to-b from-[#eedebc] to-[#e4cb98]/70">
                <p className="text-[10px] font-black tracking-widest text-[#5e4b3c] uppercase">{label}</p>
                <p className={`mt-2 text-xl font-bold ${customCls || 'text-[#1c130d]'}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Tactile Dossier actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row pt-6 border-t border-[#1c130d]/10">
            <button
              type="button"
              onClick={onRestart}
              className="cursor-pointer inline-flex flex-1 items-center justify-center gap-2 border-2 border-[#1c130d] bg-[#eedebc] hover:bg-[#e7bf81] text-[#1c130d] py-3 text-xs font-black tracking-widest transition"
            >
              <RefreshCw size={14} />
              새로운 학기 수사 시작 (다시하기)
            </button>

            {isTrueEnding && (
              <button
                type="button"
                onClick={() => handleActionClick('A+ 학점원부', '교무처 주전산망의 성적으로 영구 동록되었습니다.')}
                className="cursor-pointer inline-flex flex-1 items-center justify-center gap-2 border-2 border-[#1c130d] bg-[#263829] hover:bg-[#344d38] text-white py-3 text-xs font-black tracking-widest transition"
              >
                <Award size={14} />
                A+ 성적 증명서 발급
              </button>
            )}

            <button
              type="button"
              onClick={() => handleActionClick('사건 공유', '결과 결정서 전문이 복사용 장치에 전송되었습니다.')}
              className="cursor-pointer inline-flex flex-1 items-center justify-center gap-2 border-2 border-[#1c130d]/80 hover:border-[#1c130d] hover:bg-[#1c130d]/10 text-[#1cb30d] py-3 text-xs font-black tracking-widest text-[#1c130d] transition"
            >
              {isFailEnding ? <Home size={14} strokeWidth={2.5} /> : <Share2 size={14} />}
              학내 수서원 공유 (결과 복사)
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
