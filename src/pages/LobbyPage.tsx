import React, { useState } from 'react';
import { CharacterId, Player, PlayerStatus } from '../types';
import { CharacterCard } from '../components/CharacterCard';
import { ArrowLeft, CheckCircle2, Copy, FileText, Play, UsersRound } from 'lucide-react';
import { CHARACTER_DATA } from '../data/gameData';

interface LobbyPageProps {
  onBackToLanding: () => void;
  onStartGame: (selectedId: CharacterId) => void;
}

export const LobbyPage: React.FC<LobbyPageProps> = ({ onBackToLanding, onStartGame }) => {
  const roomCode = 'NAKS-4821';
  const [copied, setCopied] = useState(false);
  const [selectedChar, setSelectedChar] = useState<CharacterId>('JAEYEONG');
  const [myStatus, setMyStatus] = useState<PlayerStatus>('waiting');

  const initialPlayers: Record<CharacterId, { nickname: string; status: PlayerStatus }> = {
    JAEYEONG: { nickname: '민우', status: 'ready' },
    WOOJU: { nickname: '서현', status: 'ready' },
    JIYEONG: { nickname: '다은', status: 'ready' },
    JINHAN: { nickname: '정우', status: 'ready' }
  };

  const players: Player[] = (Object.keys(initialPlayers) as CharacterId[]).map((charId) => ({
    nickname: charId === selectedChar ? '나 (본인)' : initialPlayers[charId].nickname,
    characterId: charId,
    status: charId === selectedChar ? myStatus : initialPlayers[charId].status
  }));

  const allReady = players.every((player) => player.status === 'ready');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mystery-bg min-h-screen text-[#f4e4bd] bg-[#0c0a08] ink-vignette relative">
      <div className="game-shell">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 border-b-2 border-[#1c140d]">
          <button
            type="button"
            onClick={onBackToLanding}
            className="rustylake-dark-button cursor-pointer inline-flex items-center gap-2 px-3 py-2 text-xs font-bold"
          >
            <ArrowLeft size={14} />
            타이틀로 돌아가기
          </button>
          <div className="flex items-center gap-2 border-2 border-[#1c140d] bg-[#120d0a]/60 px-3.5 py-1.5 text-xs text-[#9fb471] typewriter-text">
            <span className="h-2 w-2 rounded-full bg-[#9fb471] animate-pulse border border-black" />
            RECEIVER_STABLE: CONNECTED
          </div>
        </header>

        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1fr_380px]">
          <section className="space-y-6">
            <div className="border-b-2 border-[#1c140d] pb-3">
              <p className="typewriter-text text-[#b39971] tracking-widest font-black uppercase">Incident Dossier: Characters</p>
              <h1 className="title-serif text-3xl font-black text-[#f5dfad] tracking-wide mt-1">
                낙산관 302호 사건조사원 선택
              </h1>
              <p className="mt-2 text-xs leading-6 text-[#9c8b70]">
                각 수사원은 사건 해결을 위한 고유한 정황 해석력과 가혹한 단서 보정 채널을 소지합니다. 한 명의 수사원을 선택하십시오. 중복 선택은 제한됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {(Object.keys(CHARACTER_DATA) as CharacterId[]).map((id) => (
                <CharacterCard
                  key={id}
                  id={id}
                  size="md"
                  status={selectedChar === id ? myStatus : 'active'}
                  selected={selectedChar === id}
                  onClick={() => {
                    setSelectedChar(id);
                    setMyStatus('waiting');
                  }}
                />
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            {/* Classified Office Stamped Envelope */}
            <div className="rustylake-dark-panel p-5 relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] w-16 h-16 bg-[#8d2522] rotate-45 opacity-20 border-b-2 border-black" />
              <div className="flex items-center gap-2 mb-3">
                <FileText size={16} className="text-[#ebd3a3]" />
                <span className="typewriter-text font-bold text-[#ebd3a3]">STAMPED_ACCESS_KEY</span>
              </div>
              <p className="text-xs text-[#a0907d] mb-4 leading-relaxed font-serif">
                공동 조사를 위한 기계식 합동 연결 암호입니다. 다른 수사원들을 초대할 때 전송하십시오.
              </p>
              <div className="flex items-center justify-between gap-3 bg-[#0d0907] border-2 border-[#1c140d] p-3">
                <span className="typewriter-text text-xl font-bold tracking-[0.25em] text-[#ebd3a3] pl-1">
                  {roomCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rustylake-dark-button cursor-pointer p-2 rounded-none transition"
                  aria-label="방 코드 복사"
                >
                  <Copy size={15} />
                </button>
              </div>
              {copied && (
                <p className="mt-2 text-right text-xs font-bold text-[#9fb471] typewriter-text animate-pulse">COPIED TO BRIEFCASE</p>
              )}
            </div>

            {/* Dossier Players list */}
            <div className="rustylake-dark-panel p-5">
              <div className="flex items-center gap-2 mb-4">
                <UsersRound size={17} className="text-[#ebd3a3]" />
                <span className="typewriter-text font-bold text-[#ebd3a3]">TEAM_SUSTAINABILITY</span>
              </div>
              <div className="space-y-3">
                {players.map((player) => {
                  const data = CHARACTER_DATA[player.characterId || 'JAEYEONG'];
                  const isReady = player.status === 'ready';
                  return (
                    <div
                      key={player.characterId}
                      className="flex items-center justify-between border-2 border-[#1c140d] bg-[#16100c] p-3 text-left relative"
                    >
                      <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: data.color }} />
                      <div className="pl-2">
                        <p className="text-xs font-black text-[#f3e5c3]">{player.nickname}</p>
                        <p className="typewriter-text text-[10px] text-[#9c8b70] mt-0.5">{data.name} · {data.role}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 border-2 typewriter-text ${
                        isReady
                          ? 'border-[#9fb471] bg-[#192b1a]/40 text-[#9fb471]'
                          : 'border-[#ea984a] bg-[#2b1a10]/40 text-[#ea984a]'
                      }`}>
                        {isReady ? 'READY' : 'WAIT'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ready state control */}
            <button
              type="button"
              onClick={() => setMyStatus(myStatus === 'ready' ? 'waiting' : 'ready')}
              className={`w-full cursor-pointer transition py-3 text-xs font-bold tracking-widest uppercase typewriter-text ${
                myStatus === 'ready'
                  ? 'rustylake-dark-button'
                  : 'rustylake-button'
              }`}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                {myStatus === 'ready' ? '수조 지휘 대기' : '조서 서명 완료 (준비)'}
              </span>
            </button>

            {/* Launch Game control */}
            <button
              type="button"
              disabled={!allReady}
              onClick={() => onStartGame(selectedChar)}
              className={`inline-flex w-full items-center justify-center gap-2 py-4 text-xs font-black tracking-widest transition border-3 ${
                allReady
                  ? 'bg-gradient-to-b from-[#df4d41] to-[#8d2522] border-[#1c140d] text-white cursor-pointer hover:brightness-105 hover:-translate-y-0.5 shadow-[4px_4px_0px_#1c140d]'
                  : 'cursor-not-allowed border-[#1c140d] bg-[#1a120d] text-[#55473a] opacity-50'
              }`}
            >
              <Play size={15} />
              사건 파일 실시간 수사 시작
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
};
