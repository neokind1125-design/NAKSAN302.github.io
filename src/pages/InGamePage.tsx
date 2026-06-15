import React, { useEffect, useMemo, useState } from 'react';
import { CharacterId, ChatMessage, QuestStatus } from '../types';
import { CHARACTER_DATA } from '../data/gameData';
import {
  ArrowLeft,
  BookOpen,
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock,
  Grid3X3,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Lock,
  Map,
  MessageSquare,
  Music2,
  Search,
  Shield,
  ShieldCheck,
  Settings,
  X
} from 'lucide-react';

// Import our newly created scene components for modularity and page sizing control
import { SceneEntrance } from '../components/scenes/SceneEntrance';
import { SceneDesk } from '../components/scenes/SceneDesk';
import { SceneBookcase } from '../components/scenes/SceneBookcase';
import { SceneCctv } from '../components/scenes/SceneCctv';
import { SceneVault } from '../components/scenes/SceneVault';

// Import our interactive puzzle modals
import { DeskPuzzle } from '../components/puzzles/DeskPuzzle';
import { BookcasePuzzle } from '../components/puzzles/BookcasePuzzle';
import { BlackboardPuzzle } from '../components/puzzles/BlackboardPuzzle';
import { CctvPuzzle } from '../components/puzzles/CctvPuzzle';
import { VaultPuzzle } from '../components/puzzles/VaultPuzzle';
import { TilePuzzle } from '../components/puzzles/TilePuzzle';
import { DoorlockPuzzle } from '../components/puzzles/DoorlockPuzzle';
import { CaesarPuzzle } from '../components/puzzles/CaesarPuzzle';

// Import newly created layout components
import { GameLayout } from '../components/GameLayout';
import { TopBar } from '../components/TopBar';
import { SceneViewer } from '../components/SceneViewer';
import { InventoryBar } from '../components/InventoryBar';
import { TeamPanel } from '../components/TeamPanel';

interface InGamePageProps {
  initialCharacter: CharacterId;
  onSelectEnding: (endingId: string, trust: number, hints: number, clues: number, text: string) => void;
  onBackToLanding: () => void;
}

type HotspotId =
  | 'cassette'
  | 'note'
  | 'books'
  | 'floor'
  | 'board'
  | 'cctv'
  | 'safe'
  | 'caesar'
  | 'doorlock';

interface Hotspot {
  id: HotspotId;
  title: string;
  short: string;
  description: string;
  clue: string;
  x: number;
  y: number;
  icon: React.ReactNode;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'doorlock',
    title: '현관 전자식 도어락',
    short: '도어락',
    description: '교수실 외곽 방어 보안 격벽을 개폐하는 전자식 번호식 잠금장치입니다. 전력 동축 보정이 성공해야 정합 연동이 이루어집니다.',
    clue: '도어락 암호: CCTV의 14도 중계 렌즈 정렬을 성공해야 격문 잠금이 풀립니다.',
    x: 82,
    y: 65,
    icon: <Lock size={16} />
  },
  {
    id: 'caesar',
    title: '전자식 도어락',
    short: '도어락',
    description: 'CCTV 보안 제어기 우측 벽면에 연동된 부가 잠금 제어기입니다. "QBXJTLOH"라는 훼손된 암호 픽셀 배열과 함께 올바른 알파벳 정점 보정을 요구하고 있습니다.',
    clue: '도어락 해독 성공: 카이사르 영점 시프트(+3) 복조를 통해 획득한 암호 키워드는 "TEAMWORK"입니다.',
    x: 82,
    y: 65,
    icon: <Lock size={16} />
  },
  {
    id: 'cassette',
    title: '낡은 카세트 플레이어',
    short: '오디오',
    description: '책상 위 주전원에 수신 장치와 맞물려 네 명의 잡음 서브트랙이 중첩되어 있습니다. 각각의 단선 채널을 복원해야 실마리가 재생됩니다.',
    clue: '오디오 채널 복원 완료: "서로의 부족함을 믿음과 강점으로 치환하라"는 문장이 들립니다.',
    x: 42,
    y: 57,
    icon: <Music2 size={16} />
  },
  {
    id: 'note',
    title: '찢어진 서약서',
    short: '서약본',
    description: '교수가 남겨둔 찢어지고 연소된 조각입니다. "공동의 이익"을 위한 서문의 핵심 붉은 도장이 마지막 금고의 키워드를 암시합니다.',
    clue: '서약서 수사 완료: 찢어진 중심에 붉게 도인 단어는 "공감"입니다. 최종 잠금 패스워드의 초성부입니다.',
    x: 53,
    y: 54,
    icon: <ClipboardList size={16} />
  },
  {
    id: 'books',
    title: '뒤틀린 책장',
    short: '도서단',
    description: '서가 7번째 줄 고서들이 비정상인 경사도로 눕혀 있습니다. 가죽 책장의 단면 배색 순서가 바닥 기계식 타일 격자의 좌표 지침을 가리킵니다.',
    clue: '책장 정밀수사 완료: 장식 책등 배색의 수열로 보아 6x6 바닥 격자에서 3행 4열을 먼저 가리낌을 나타냅니다.',
    x: 18,
    y: 33,
    icon: <BookOpen size={16} />
  },
  {
    id: 'floor',
    title: '6x6 전산 바닥 타일',
    short: '전산재',
    description: '책장 해독 지침과 물리적으로 연결되는 배바닥 보드입니다. 해당 좌표의 구리를 들춰내면 숨은 은폐 배선이 흘러나옵니다.',
    clue: '바닥 격자 해금: 3행 4열 철판 보드를 기어올리자 내부 금속 단자에 칠판 암호 주소 "동쪽 85"가 각인되어 있습니다.',
    x: 36,
    y: 78,
    icon: <Grid3X3 size={16} />
  },
  {
    id: 'board',
    title: '칠판 분필 측량도',
    short: '벽도화',
    description: '복잡한 대학 지도와 삼합 좌표가 가혹하게 흰 분필로 갈겨져 있습니다. 폐쇄 기계와 CCTV 전송 각도를 보정하는 고유 대입 제어기입니다.',
    clue: '칠판 해독: 북쪽 전위차 14도와 바닥에서 찾은 동쪽 85가 CCTV 감시 차폐 회선과 금고 주입 권한을 활성화합니다.',
    x: 50,
    y: 22,
    icon: <Map size={16} />
  },
  {
    id: 'cctv',
    title: 'CCTV 보안 제어기',
    short: '감시관',
    description: '조소적인 감시 화면에 붉고 거친 전자 주사선이 침입 사건을 추적합니다. 렌즈 각도의 입사각을 기어 조율하여 복원해야 숫자가 표기됩니다.',
    clue: 'CCTV 복원: 동조 각도를 정밀 14도로 조정하자, 거친 주사 노이즈 사이로 보안 키워드 "402"가 인쇄되듯 떠오릅니다.',
    x: 77,
    y: 34,
    icon: <Camera size={16} />
  },
  {
    id: 'safe',
    title: '지도교수 중량금고',
    short: '금고',
    description: '문 앞에 위압감을 뿜으며 설치된 황동 기어식 금고입니다. 네 수사원의 오디오 복원과 5개 정황 조끼를 모두 마쳐야 수치가 맞춰져 개방됩니다.',
    clue: '금고 조사: 해독 완료된 문자 "공감"에 현재 팀 신뢰도 수치인 % 단위를 직접 이식하는 것이 최종 결속 규칙입니다.',
    x: 80,
    y: 70,
    icon: <Lock size={16} />
  }
];

const QUEST_ORDER = ['MQ-01', 'SQ-04', 'SQ-03', 'SQ-02', 'SQ-01', 'MQ-03'];

const QUEST_LABELS: Record<string, string> = {
  'MQ-01': '네 명의 성적 이의 제기 오디오 중첩 스크랩 해제',
  'SQ-04': '파쇄된 서약서 붉은 도장 키워드 복원',
  'SQ-03': '서서 격자 3행 4열 지중 동축 전선 조사',
  'SQ-02': '감시 단말 및 칠판 영점 동서 위도 조정',
  'SQ-01': '감시 제어 카메라 각도 14도 영점 분리',
  'MQ-03': '중량식 금고 최종 자물쇠 열림 결속'
};

export const InGamePage: React.FC<InGamePageProps> = ({
  initialCharacter,
  onSelectEnding,
  onBackToLanding
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId>(initialCharacter);
  const [timer, setTimer] = useState(3582); // Initialized closer to the 59:42 scene setup
  const [hintUsed, setHintUsed] = useState(0);
  const [teamTrust, setTeamTrust] = useState(62); // Image specifies a Trust value of exactly 62%
  const [sharedClues, setSharedClues] = useState(0);
  const [currentAct, setCurrentAct] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<HotspotId | null>('cassette');
  const [openedPuzzle, setOpenedPuzzle] = useState<HotspotId | string | null>(null);
  const [showFinalPanel, setShowFinalPanel] = useState(false);
  const [finalPassword, setFinalPassword] = useState('');
  const [finalPanelError, setFinalPanelError] = useState('');
  const [cctvAngle, setCctvAngle] = useState(180);
  
  // Rotating Scene State
  const [currentSceneIndex, setCurrentSceneIndex] = useState(1); // Defaulting to Scene 2 (Desk) as standard starting point

  // CASSETTE CAESAR PUZZLE & MQ02 BOOKCASE PUZZLE ADDED STATES
  const [cassetteSolved, setCassetteSolved] = useState(false);
  const [caesarSolved, setCaesarSolved] = useState(false);
  const [bookcaseStage, setBookcaseStage] = useState(1);
  const [bookcaseFeedback, setBookcaseFeedback] = useState('');

  const handleBookcaseChoice = (choice: number) => {
    if (bookcaseStage === 1 && choice === 2) {
      setBookcaseStage(2);
      setBookcaseFeedback('지영이가 기계장치 우회를 시작했습니다. 이제 진한이의 대조가 필요합니다.');
      pushMessage('JIYEONG', '잠금 장치의 구조 파악을 완료했습니다. 진한아, 네 기억 속 강의실 착석 순서를 환기해줘!', 'clue-share');
    } else if (bookcaseStage === 2 && choice === 1) {
      setBookcaseStage(3);
      setBookcaseFeedback('진한이의 보정 완료. 책장에서 대상을 순서대로 입력하십시오.');
      pushMessage('JINHAN', '기억이 납니다! 1학기 한성대 강의실 첫 수업 당시 재영, 나(진한), 우주, 지영 순으로 앉았습니다.', 'clue-share');
    } else if (bookcaseStage === 3 && choice === 2) {
      setBookcaseStage(4);
      setBookcaseFeedback('책장 잠금 해제 성공!');
      
      // Complete quest SQ-03 and unlock SQ-02
      completeQuest('SQ-03', 'SQ-02');
      rewardProgress(8);
      addClue('바닥 동회선 암시: 책장을 3행 4열로 조율하여 비밀 공간을 활성화하고 전자기판을 발견해 냈습니다.');
      pushMessage('WOOJU', '책장 수열 조율 완료! 숨겨진 보관고에서 우주의 쪽지와 전자기판 회로 단선도를 손에 넣었습니다.', 'clue-share');
      
      // Also sync hotspot/puzzle closure
      setActiveHotspot(null);
    }
  };

  const [questStatus, setQuestStatus] = useState<Record<string, QuestStatus>>({
    'MQ-01': 'active',
    'SQ-04': 'locked',
    'SQ-03': 'locked',
    'SQ-02': 'locked',
    'SQ-01': 'locked',
    'MQ-03': 'locked'
  });

  const [audiotrackRestored, setAudiotrackRestored] = useState<Record<CharacterId, boolean>>({
    JAEYEONG: false,
    WOOJU: false,
    JIYEONG: false,
    JINHAN: false
  });

  const [clueBag, setClueBag] = useState<string[]>([
    '일지 기록: 결핍을 강점으로 보완하여 한 호흡으로 합쳐라',
    '금고 키워드 규칙: 공감'
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'SYSTEM',
      text: '낙산관 302호 주임교수실에 안전 격벽이 차단되었습니다. 실시간 단서를 상호 보정하십시오.',
      timestamp: Date.now() - 60000,
      type: 'system'
    },
    {
      id: 'init-2',
      sender: 'PROFESSOR',
      text: '너희는 각자 타인의 결핍을 욕하나 고정된 눈으로는 구도를 볼 수 없다. 채널을 합치는 것이 첫 번째 단추이다.',
      timestamp: Date.now() - 42000,
      type: 'professor'
    }
  ]);

  const active = HOTSPOTS.find((spot) => spot.id === activeHotspot) || HOTSPOTS[0];
  const restoredCount = Object.values(audiotrackRestored).filter(Boolean).length;
  const expectedPassword = `공감${teamTrust}`;

  const activeQuest = useMemo(() => {
    const activeId = QUEST_ORDER.find((id) => questStatus[id] === 'active');
    return activeId ? QUEST_LABELS[activeId] : '모든 수사 단서 수집 완료';
  }, [questStatus]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          onSelectEnding('ENDING_C', teamTrust, hintUsed, sharedClues, '가혹한 종이 울리고 최종 퇴실시간이 만료되어 연구실 격문이 폐쇄되었습니다.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hintUsed, onSelectEnding, sharedClues, teamTrust]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const pushMessage = (
    sender: ChatMessage['sender'],
    text: string,
    type: ChatMessage['type'] = 'system'
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender,
        text,
        timestamp: Date.now(),
        type
      }
    ]);
  };

  const addClue = (text: string) => {
    setClueBag((prev) => {
      if (prev.includes(text)) return prev;
      setSharedClues((count) => count + 1);
      return [...prev, text];
    });
  };

  const rewardProgress = (amount = 7) => {
    setTeamTrust((prev) => Math.min(100, prev + amount));
  };

  const completeQuest = (completeId: string, unlockId?: string, nextAct?: number) => {
    setQuestStatus((prev) => ({
      ...prev,
      [completeId]: 'completed',
      ...(unlockId ? { [unlockId]: 'active' as QuestStatus } : {})
    }));
    if (nextAct) setCurrentAct(nextAct);
  };

  const inspectOnly = () => {
    addClue(active.clue);
    pushMessage(selectedCharacter, `${active.title}: 단서 기록 - [ ${active.clue} ]`, 'clue-share');
  };

  const handleRestoreTrack = (id: CharacterId) => {
    if (questStatus['MQ-01'] !== 'active' || audiotrackRestored[id]) return;

    const charName = CHARACTER_DATA[id].name;
    const next = { ...audiotrackRestored, [id]: true };
    const nextCount = Object.values(next).filter(Boolean).length;
    setAudiotrackRestored(next);
    addClue(`${charName} 스크랩 채널 복원: ${CHARACTER_DATA[id].sampleLine}`);
    pushMessage('SYSTEM', `${charName} 수사원의 통화 음질 변조 채널 복원을 승인했습니다. (${nextCount}/4)`, 'system');

    if (nextCount === 4) {
      completeQuest('MQ-01', 'SQ-04', 2);
      rewardProgress(10);
      pushMessage('PROFESSOR', '흥미롭군. 오디오 배선이 열렸다. 이제 서약조각, 위도 칠판, CCTV 중계 축을 동조하여 중심에 도달해라.', 'professor');
    }
  };

  const handleResolveHotspot = () => {
    if (!activeHotspot) return;

    if (activeHotspot === 'doorlock') {
      const isFloorSolved = questStatus['SQ-02'] === 'completed';
      const isCctvSolved = questStatus['SQ-01'] === 'completed';
      if (!isFloorSolved || !isCctvSolved) {
        pushMessage('SYSTEM', '작동 거부: 먼저 하위 연산 수사 과제인 전산 바닥 보정 및 카메라 조작 영점 조율을 완벽하게 오프라인 결착해 주십시오.', 'system');
        return;
      }
    }

    setOpenedPuzzle(activeHotspot);
    setActiveHotspot(null);
  };

  const handleRequestHint = () => {
    if (hintUsed >= 10) return;
    setHintUsed((prev) => prev + 1);
    setTeamTrust((prev) => Math.max(0, prev - 4));

    let hint = '현재 진행 방향에 맞게 활성화된 구역 지점을 적극적으로 클릭 조사하십시오.';
    if (questStatus['MQ-01'] === 'active') hint = `각 탐색원의 소리를 한 호흡으로 합쳐야 합니다. 현재 복원 상태: [ ${restoredCount} / 4 ]`;
    else if (questStatus['SQ-04'] === 'active') hint = '우측 조사창에서 서약서의 훼손된 문장 중앙에 도인 붉은 글자를 식별하십시오.';
    else if (questStatus['SQ-03'] === 'active') hint = '서가의 비틀린 책 배치 수열에 따라 격자 바닥의 3행 4열을 찾아 관찰 지칭하십시오.';
    else if (questStatus['SQ-02'] === 'active') hint = '칠판에 수놓인 동서 측위의 기입값을 다른 장치 제어에 각각 연산하십시오.';
    else if (questStatus['SQ-01'] === 'active') hint = 'CCTV 수동 슬라이더를 정확히 14도로 조정하고 하단 [조사/적용]을 누르십시오.';
    else if (questStatus['MQ-03'] === 'active') hint = `최종 조합 공식은 해금 키워드명인 "공감" 뒤에 현재의 실시간 신뢰 지수 %를 기입하는 것입니다. (현재 입력값: ${expectedPassword})`;

    pushMessage('SYSTEM', `[교수실 유선 힌트통신 ${hintUsed + 1}/10] ${hint}`, 'system');
  };

  const handleFinalPasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (finalPassword.trim() !== expectedPassword) {
      setFinalPanelError(`자물쇠 기어 미스매치: 비밀코드는 "분합 키워드" + "수치값"의 정밀한 규칙을 필요로 합니다. (예상 입력: ${expectedPassword})`);
      return;
    }

    if (teamTrust >= 85) {
      onSelectEnding('ENDING_A', teamTrust, hintUsed, sharedClues, '네 수사원이 모든 관찰 지식을 투명하게 교환한 결과, 자물쇠 중량이 조용히 하락하며 진실의 금고가 열렸습니다.');
    } else {
      onSelectEnding('ENDING_B', teamTrust, hintUsed, sharedClues, '문은 열렸을지언정, 서로 끝까지 발설하지 못한 일부 진영의 욕망과 의혹의 일편이 방치된 채 남았습니다.');
    }
  };

  const handleNextScene = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % 5);
  };

  const handlePrevScene = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + 5) % 5);
  };

  // Maps scene indices to hotspot IDs for seamless tooltip syncing
  const sceneHotspotMap: Record<number, HotspotId> = {
    0: 'doorlock', // Entrance connects to Door lock
    1: 'cassette', // Desk connects to Cassette player
    2: 'books',    // Bookcases connect to suspicious book
    3: 'cctv',     // CCTV panel connects to surveillance console
    4: 'safe',     // Heavy Vault
  };

  // Sync active hotspot on scene rotation
  useEffect(() => {
    const synchedSpot = sceneHotspotMap[currentSceneIndex];
    if (synchedSpot) {
      setActiveHotspot(synchedSpot);
    }
  }, [currentSceneIndex]);

  return (
    <GameLayout>
      {/* Top Bar Navigation & Utilities */}
      <TopBar
        timerSeconds={timer}
        clueCount={clueBag.length}
        hintCount={hintUsed}
        onOpenClues={() => {
          pushMessage('SYSTEM', '획득한 단서함 보관 정보: ' + clueBag.join(' | '), 'system');
        }}
        onOpenSettings={onBackToLanding}
      />

      {/* Main 3-Column Escape Workspace */}
      <main className="grid grid-cols-1 xl:grid-cols-[290px_1fr_390px] gap-5 items-stretch p-4 md:p-6 flex-grow overflow-hidden">
        
        {/* ================= LEFT COLUMN: QUEST DIRECTIVES ================= */}
        <aside className="space-y-4 flex flex-col justify-start">
          {/* Current Directives Card */}
          <div className="rustylake-dark-panel p-4.5 relative overflow-hidden bg-[#16120e] border-3 border-[#2a2016] shadow-xl">
            <div className="absolute right-0 top-0 h-1 bg-[#8d2522] w-1/3" />
            <p className="typewriter-text text-[9px] font-black text-[#b39971] tracking-widest uppercase mb-1">Current Directive</p>
            <h2 className="title-serif text-sm font-black text-[#f5dfad] leading-relaxed border-b border-[#2b2016] pb-2.5">
              {activeQuest}
            </h2>
            
            <div className="mt-3.5 space-y-2 max-h-[200px] overflow-y-auto pr-1 soft-scrollbar">
              {QUEST_ORDER.map((id) => {
                const status = questStatus[id];
                const isActive = status === 'active';
                const isComp = status === 'completed';
                return (
                  <div
                    key={id}
                    className={`flex items-center justify-between gap-3 p-2.5 border-2 text-[10.5px] rounded-sm transition-all ${
                      isComp
                        ? 'border-[#5c7533]/80 bg-[#1e2e1a]/30 opacity-75'
                        : isActive
                          ? 'border-[#cca35a]/90 bg-[#221a12] shadow-sm shadow-[#cca35a]/10'
                          : 'border-[#1f1710] bg-[#0c0907]/60 opacity-40'
                    }`}
                  >
                    <span className={`font-serif tracking-tight pr-1 leading-tight line-clamp-2 ${isComp ? 'line-through text-stone-500' : 'text-[#cfae84]'}`}>
                      {QUEST_LABELS[id]}
                    </span>
                    <span className={`text-[8px] font-mono font-black tracking-widest uppercase flex-shrink-0 typewriter-text ${
                      isComp ? 'text-[#9fb471]' : isActive ? 'text-[#cca35a]' : 'text-stone-600'
                    }`}>
                      {isComp ? 'RESOLVED' : isActive ? 'ACTIVE' : 'LOCKED'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Local Receiver Link (Character Switcher) */}
          <div className="rustylake-dark-panel p-4.5 bg-[#16120e] border-3 border-[#2a2016] shadow-xl flex-grow justify-between flex flex-col">
            <div>
              <p className="typewriter-text text-[9px] font-black text-[#b39971] tracking-widest uppercase mb-1">Local Receiver Link</p>
              <div className="mt-3.5 space-y-2.5">
                {(Object.keys(CHARACTER_DATA) as CharacterId[]).map((id) => {
                  const data = CHARACTER_DATA[id];
                  const selected = selectedCharacter === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedCharacter(id)}
                      className={`cursor-pointer transition-all w-full duration-125 p-2.5 text-left border-2 relative rounded-sm ${
                        selected
                          ? 'border-[#dcb35f] bg-[#e6ceab] text-[#1a110a] shadow-[2px_2px_0px_#1c140d] translate-x-[-1px] translate-y-[-1px]'
                          : 'border-[#261f17] bg-[#110d09]/95 text-[#e5d4b8] hover:bg-[#1a130e]'
                      }`}
                    >
                      <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: data.color }} />
                      <p className={`title-serif text-[12.5px] font-black pl-2 ${selected ? 'text-[#1c140d]' : 'text-[#f5dfad]'}`}>{data.name}</p>
                      <p className={`typewriter-text text-[9px] pl-2 mt-0.5 ${selected ? 'text-[#563c25]' : 'text-[#877764]'}`}>{data.role}</p>
                      {audiotrackRestored[id] && (
                        <p className={`mt-1.5 pl-2 inline-flex items-center gap-1 text-[8px] font-mono font-black tracking-widest uppercase typewriter-text ${selected ? 'text-[#2e4d1b]' : 'text-[#9fb471]'}`}>
                          ✓ TRK_SYNC
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleRequestHint}
              disabled={hintUsed >= 10}
              className="rustylake-button cursor-pointer inline-flex w-full items-center justify-center gap-2 px-4 py-3 mt-4 text-[10px] tracking-widest text-[#17100b] disabled:cursor-not-allowed disabled:opacity-40 typewriter-text font-black rounded-sm"
            >
              힌트 청원 및 조율 ({hintUsed} / 10)
            </button>
          </div>
        </aside>

        {/* ================= CENTER COLUMN: PANORAMIC GAME STAGE ================= */}
        <section className="flex flex-col gap-5 justify-between">
          <SceneViewer onPrevScene={handlePrevScene} onNextScene={handleNextScene}>
            {/* Dynamic scene components inside */}
            {currentSceneIndex === 0 && (
              <SceneEntrance onInspect={(id) => setActiveHotspot(id as HotspotId)} questStatus={questStatus} activeHotspot={activeHotspot || ''} onResolve={handleResolveHotspot} />
            )}
            {currentSceneIndex === 1 && (
              <SceneDesk onInspect={(id) => setActiveHotspot(id as HotspotId)} questStatus={questStatus} audiotrackRestored={audiotrackRestored} activeHotspot={activeHotspot || ''} onRestoreTrack={handleRestoreTrack} onResolve={handleResolveHotspot} />
            )}
            {currentSceneIndex === 2 && (
              <SceneBookcase
                onInspect={(id) => setActiveHotspot(id as HotspotId)}
                questStatus={questStatus}
                activeHotspot={activeHotspot || ''}
                bookcaseStage={bookcaseStage}
                handleBookcaseChoice={handleBookcaseChoice}
                bookcaseFeedback={bookcaseFeedback}
              />
            )}
            {currentSceneIndex === 3 && (
              <SceneCctv onInspect={(id) => setActiveHotspot(id as HotspotId)} questStatus={questStatus} cctvAngle={cctvAngle} activeHotspot={activeHotspot || ''} onResolve={handleResolveHotspot} />
            )}
            {currentSceneIndex === 4 && (
              <SceneVault onInspect={(id) => setActiveHotspot(id as HotspotId)} questStatus={questStatus} activeHotspot={activeHotspot || ''} onResolve={handleResolveHotspot} />
            )}
          </SceneViewer>

          {/* Bottom Inventory Bar Component */}
          <InventoryBar
            activeItemId={activeHotspot}
            onSelectItem={(id, sceneIdx) => {
              setActiveHotspot(id as HotspotId);
              if (sceneIdx !== undefined) {
                setCurrentSceneIndex(sceneIdx);
              }
            }}
            onBagClick={() => {
              pushMessage('SYSTEM', '가방 내부: 현재 수집한 단서 총 ' + clueBag.length + '개 보관 상태', 'system');
            }}
          />
        </section>

        {/* ================= RIGHT COLUMN: INTERACTIVE DOSSIER & TEAM COMM ================= */}
        <aside className="space-y-4 flex flex-col justify-start">
          {/* Active Investigation Dossier */}
          <div className="rustylake-panel p-4.5 bg-[#ebd3a3] text-[#1c140d] border-4 border-[#2b241e] shadow-2xl relative overflow-hidden flex flex-col justify-between rounded-sm">
            <div className="absolute right-[-15px] top-[-15px] w-12 h-12 bg-[#8d2522] rotate-45 border-b-2 border-black opacity-15" />
            
            <div>
              <div className="flex items-start justify-between gap-3 border-b-2 border-[#1c140d]/10 pb-2.5 mb-3">
                <div>
                  <p className="typewriter-text text-[9px] font-black text-[#8d2522] uppercase tracking-wider">Inspect Dossier</p>
                  <h2 className="title-serif mt-1 text-base font-black text-[#1c140d] leading-none">{active.title}</h2>
                </div>
                <span className="border-2 border-[#1c140d] bg-[#1c140d]/10 text-[9.5px] font-bold text-[#1c140d] px-2 py-0.5 typewriter-text uppercase tracking-wider">
                  {active.short}
                </span>
              </div>
              
              <p className="text-[11.5px] leading-relaxed text-[#2d1d11] font-medium text-justify font-serif">
                {active.description}
              </p>

              {/* Unique action widgets linked to selected object */}
              {activeHotspot === 'cassette' && (
                <div className="mt-3.5 border-t-2 border-[#1c140d]/10 pt-3.5 select-none">
                  <p className="typewriter-text text-[9px] font-black text-[#8d2522] mb-2 uppercase tracking-wide">Audio Scraps Recovery</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(CHARACTER_DATA) as CharacterId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleRestoreTrack(id)}
                        disabled={audiotrackRestored[id]}
                        className="cursor-pointer border-2 border-[#1c140d] bg-[#ebd6b1] hover:bg-[#cca35a] text-[#1c140d] py-1.5 text-[10.5px] font-black transition rounded-sm disabled:border-emerald-800 disabled:bg-emerald-950/20 disabled:text-emerald-800"
                      >
                        {CHARACTER_DATA[id].name} {audiotrackRestored[id] ? 'OK' : 'SYNC'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeHotspot === 'cctv' && questStatus['SQ-01'] === 'active' && (
                <div className="mt-3.5 border-t-2 border-[#1c140d]/10 pt-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1c140d] mb-2">
                    <span className="font-serif font-black">수동 감시기 감율 다이얼</span>
                    <span className="typewriter-text bg-[#1c140d] text-[#eedeb1] px-2 py-0.5 font-bold border border-black rounded-sm">{cctvAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={cctvAngle}
                    onChange={(event) => setCctvAngle(Number(event.target.value))}
                    className="w-full accent-[#8d2522] cursor-pointer mt-1"
                  />
                  <p className="typewriter-text text-[8.5px] text-[#5e4125] mt-1.5 italic font-black">※ 칠판 보정 각도 (14°)를 수립하십시오.</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleResolveHotspot}
              className="rustylake-dark-button font-black mt-4 inline-flex w-full items-center justify-center gap-2 py-3 text-xs tracking-widest typewriter-text text-amber-100 bg-[#1c140d] hover:bg-[#34261b] border-2 border-black rounded-sm shadow cursor-pointer text-center"
            >
              <span>조사 확인 / 수사 적용</span>
            </button>
          </div>

          {/* Right Side Team Progress Panel Widget */}
          <TeamPanel
            selectedCharacter={selectedCharacter}
            onSelectCharacter={setSelectedCharacter}
            teamTrust={teamTrust}
            messages={messages}
            hintUsed={hintUsed}
            onHintRequest={handleRequestHint}
            onMenuRequest={onBackToLanding}
          />
        </aside>

      </main>

      {/* Vault Password Form overlay */}
      {showFinalPanel && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#070706]/92 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm border-4 border-[#1e140d] bg-[#ebd3a3] p-5.5 shadow-[8px_8px_0px_#1c140d] relative text-[#1c140d] rounded-sm">
            <div className="absolute right-3 top-3">
              <button
                type="button"
                onClick={() => setShowFinalPanel(false)}
                className="rustylake-dark-button cursor-pointer p-1 transition"
                aria-label="닫기"
              >
                <X size={15} />
              </button>
            </div>
            
            <div className="pb-2.5 border-b-2 border-dashed border-[#1c140d]/30 mb-3.5 text-center">
              <p className="typewriter-text text-[8.5px] font-black tracking-widest text-[#8d2522]">VAULT_COMBO_FORM</p>
              <h2 className="title-serif text-xl font-black text-[#1c140d] mt-1">최종 중량 철식 금고 개방</h2>
            </div>

            <p className="text-[11.5px] leading-relaxed text-[#2d2116] font-serif text-justify">
              최종 자물쇠 합치는 비밀번호는 수수께끼에서 풀어낸 핵심어 뒤에 띄어쓰기 없이 실시간 측정된 신뢰도 수치(<span className="font-black text-[#8d2522]">{teamTrust}</span>)를 같이 영점 결착하는 비밀 조항을 준수해야 개방됩니다.
            </p>

            <form onSubmit={handleFinalPasswordSubmit} className="mt-4 space-y-3.5 select-none">
              <input
                type="text"
                value={finalPassword}
                onChange={(event) => {
                  setFinalPassword(event.target.value);
                  setFinalPanelError('');
                }}
                placeholder="예: 공감85"
                className="w-full bg-[#0c0907] border-3 border-[#1c140d] py-3.5 text-center font-mono text-xl font-black text-[#dfc491] tracking-widest outline-none transition focus:border-[#8e2522]"
              />
              {finalPanelError && (
                <p className="border-2 border-[#8e2522] bg-[#8e2522]/10 p-2 text-[10.5px] leading-relaxed font-bold text-[#8e2522] font-serif leading-tight">
                  {finalPanelError}
                </p>
              )}
              <button
                type="submit"
                className="rustylake-dark-button cursor-pointer inline-flex w-full items-center justify-center gap-2 py-3.5 text-xs font-black tracking-widest bg-stone-900 text-amber-200 hover:bg-stone-850 rounded border-2 border-black"
              >
                자물쇠 기어 동조 (금고 오픈)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Puzzle Modal Overlays */}
      {openedPuzzle === 'caesar' && (
        <CaesarPuzzle
          onClose={() => setOpenedPuzzle(null)}
          initiallySolved={caesarSolved}
          onSolved={() => {
            setCaesarSolved(true);
            rewardProgress(8);
            addClue('CCTV 전자도어락 암호 해독 단서: 암호문 "QBXJTLOH"를 +3 시프트 해독하여 교수실 진입 및 탐색 중심 정체 키워드인 "TEAMWORK"를 완벽 도출했습니다.');
            pushMessage('JAEYEONG', 'CCTV 전자도어락 하위 암호 해독 성공! 도출된 핵심 암호 키워드는 "TEAMWORK"입니다.', 'clue-share');
            setOpenedPuzzle(null);
          }}
        />
      )}

      {openedPuzzle === 'cassette' && (
        <DeskPuzzle
          onClose={() => setOpenedPuzzle(null)}
          audiotrackRestored={audiotrackRestored}
          onRestoreTrack={handleRestoreTrack}
          cassetteSolved={cassetteSolved}
          onCaesarSolved={() => {
            setCassetteSolved(true);
            rewardProgress(8);
            addClue('오디오 주파수 동조 단서: 네 개 채널의 음성 주파수를 완전히 동조하여 교수의 성적 비리 녹취 파일 데이터를 복원하였습니다.');
            pushMessage('JAEYEONG', '카세트 테이프 오디오 주파수 동조 성공! 음성 기록이 성공적으로 복구되었습니다.', 'clue-share');
          }}
        />
      )}

      {openedPuzzle === 'books' && (
        <BookcasePuzzle
          onClose={() => setOpenedPuzzle(null)}
          onSolved={() => {
            completeQuest('SQ-03', 'SQ-02');
            rewardProgress();
            addClue('바닥 동회선 암시: 책가 구조의 가죽책등 돌출 수열(Ⅰ-Ⅴ)을 해독하니 바닥 격자의 좌표 3행 4열을 지목하고 있습니다.');
            pushMessage('WOOJU', '책장 수열을 정리하고 바닥 격자 3행 4열 철바닥판을 기계 해방 좌표로 찾아냈습니다.', 'clue-share');
            setBookcaseStage(4);
            setOpenedPuzzle(null);
          }}
        />
      )}

      {openedPuzzle === 'floor' && (
        <TilePuzzle
          onClose={() => setOpenedPuzzle(null)}
          onSolved={() => {
            completeQuest('SQ-02', 'SQ-01');
            rewardProgress();
            addClue('바닥 격판 동회선: 격자 3행 4열 철판을 정교하게 절개하여 암호 "동쪽 85"를 마침내 발견해냈습니다.');
            pushMessage('WOOJU', '바닥 기계식 타일 격판 3행 4열을 해방하여 전력 주소 코드 "동쪽 85"를 발견해냈습니다.', 'clue-share');
            setOpenedPuzzle(null);
          }}
        />
      )}

      {(openedPuzzle === 'note' || openedPuzzle === 'board') && (
        <BlackboardPuzzle
          onClose={() => setOpenedPuzzle(null)}
          onSolved={() => {
            if (questStatus['SQ-04'] === 'active') {
              completeQuest('SQ-04', 'SQ-03');
              rewardProgress();
              addClue('서약서 수사 완료: 찢어진 서약서 중심에 붉게 쓰인 도인 단어는 "공감"입니다.');
              pushMessage('JIYEONG', '파쇄 서약서의 소실구절 중심에서 핵심 비밀 키워드 "공감"을 완벽 복구해냈습니다.', 'clue-share');
            } else if (questStatus['SQ-02'] === 'active') {
              pushMessage('SYSTEM', '바닥 3행 4열의 메커니즘을 먼저 해독하여 황동선 각도 필터를 도출하십시오.', 'system');
            } else if (questStatus['SQ-01'] === 'active') {
              completeQuest('SQ-02', 'SQ-01'); // Fallback trigger
              rewardProgress();
              addClue('칠판 측밀도: 동위수 85도에 맞춰 북위 14도의 보정이 CCTV 중계 필터에 입력되었습니다.');
              pushMessage('JINHAN', '흰 분필 측량도에서 도출된 북위 14도 보정값을 CCTV 중계 채널에 연산 접착했습니다.', 'clue-share');
            } else {
              pushMessage('SYSTEM', '서약서와 칠판 보정이 접착 완료되었습니다.', 'system');
            }
            setOpenedPuzzle(null);
          }}
        />
      )}

      {openedPuzzle === 'cctv' && (
        questStatus['SQ-01'] === 'active' || questStatus['SQ-01'] === 'completed' ? (
          <CctvPuzzle
            angle={cctvAngle}
            onChangeAngle={setCctvAngle}
            onClose={() => setOpenedPuzzle(null)}
            onSolved={() => {
              completeQuest('SQ-01', 'MQ-03', 3);
              rewardProgress();
              addClue('CCTV 슬라이더 동조완료: 노출 각도를 14도로 맞대자, 노이즈 사이로 전자식 비밀번호 "402"가 인쇄되듯 드러납니다.');
              pushMessage('JAEYEONG', '감시망 14° 물리 동조 완료. 동조단서 비밀코드 "402"를 획득했습니다. 입실 도어락 결착에 입력하십시오.', 'clue-share');
              setOpenedPuzzle(null);
            }}
          />
        ) : (
          <div id="cctv-not-ready" className="fixed inset-0 z-[100] grid place-items-center bg-[#070706]/94 p-4 backdrop-blur-md">
            <div className="w-full max-w-sm border-4 border-[#2b241e] bg-[#181615] text-[#ebd3a3] p-6 shadow-2xl relative rounded-sm text-center select-none">
              <h3 className="title-serif text-lg font-black text-red-500 mb-2">CCTV 제어 차폐</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-serif mb-4">
                감시 카메라 회선 제어기에 공급 전원이 연결되지 않았습니다. 바닥 격판 전산 보정 및 칠판 영점 조율을 먼저 완수하십시오.
              </p>
              <button 
                type="button"
                onClick={() => setOpenedPuzzle(null)} 
                className="rustylake-dark-button py-2 px-5 text-xs font-black cursor-pointer bg-stone-900 border border-black rounded text-amber-200"
              >
                닫기 [X]
              </button>
            </div>
          </div>
        )
      )}

      {openedPuzzle === 'doorlock' && (
        <DoorlockPuzzle
          onClose={() => setOpenedPuzzle(null)}
          onSolved={() => {
            setOpenedPuzzle(null);
            onSelectEnding('ENDING_A', Math.max(teamTrust, 95), hintUsed, sharedClues, '단점은 강점의 다른 이름이었다. 서로의 구멍을 메웠을 때 비로소 진짜 팀이 된다. 탈출 성공!');
          }}
        />
      )}

      {openedPuzzle === 'safe' && (
        <VaultPuzzle
          teamTrust={teamTrust}
          onClose={() => setOpenedPuzzle(null)}
          onSolved={() => {
            setOpenedPuzzle(null);
            addClue('지도교수 중량금고 해제 단서: 암호 "과깊예섬"을 입력하여 금고 개방에 성공했습니다.');
            pushMessage('SYSTEM', '황동 기어 금고 해제 완료! 금고가 힘차게 열리며 숨겨진 통로 전원이 작동하기 시작했습니다. 이제 현관의 전자식 도어락을 공략하여 최종 승인을 쟁취하고 성적표 영수증을 갱신 받으십시오!', 'system');
            pushMessage('WOOJU', '우와, 금고가 정말 열렸어요! 어서 현관 전자도어락으로 가서 탈출 및 학점 승급 처리를 최종 완료해요!', 'clue-share');
          }}
        />
      )}
    </GameLayout>
  );
};
