import { CharacterData, Quest } from '../types';

export const CHARACTER_DATA: Record<string, CharacterData> = {
  JAEYEONG: {
    id: 'JAEYEONG',
    name: '재영',
    department: '시각정보학과',
    role: '관찰자',
    ability: 'CCTV와 사각지대 판독',
    color: '#7c3aed',
    lightColor: '#a78bfa',
    darkColor: '#2e1065',
    description: '작은 화면 노이즈와 각도 변화에서 숨은 숫자를 찾아내는 역할입니다.',
    ui: '보라색 관찰 채널',
    sampleLine: '화면이 흔들리는 지점이 오히려 단서야.'
  },
  WOOJU: {
    id: 'WOOJU',
    name: '우주',
    department: '공간디자인학과',
    role: '구조 해석',
    ability: '타일 배열과 공간 퍼즐 복원',
    color: '#0f766e',
    lightColor: '#5eead4',
    darkColor: '#134e4a',
    description: '방의 바닥, 선반, 격자 배치처럼 반복되는 구조를 읽어냅니다.',
    ui: '청록색 공간 채널',
    sampleLine: '방은 늘 같은 문법으로 힌트를 남겨.'
  },
  JIYEONG: {
    id: 'JIYEONG',
    name: '지영',
    department: '문헌정보학과',
    role: '기록 해독',
    ability: '쪽지, 일기, 문서 단서 정리',
    color: '#b45309',
    lightColor: '#fbbf24',
    darkColor: '#78350f',
    description: '찢어진 문장과 오래된 문서를 읽어 퍼즐의 맥락을 회복합니다.',
    ui: '호박색 기록 채널',
    sampleLine: '문장의 빠진 부분이 정답보다 먼저 보여.'
  },
  JINHAN: {
    id: 'JINHAN',
    name: '진한',
    department: '정보보안학과',
    role: '시스템 복구',
    ability: '칠판 좌표와 잠금 장치 동기화',
    color: '#2563eb',
    lightColor: '#93c5fd',
    darkColor: '#1e3a8a',
    description: '좌표, 규칙, 보안 장치의 연결을 찾아 최종 잠금을 해제합니다.',
    ui: '파란색 보안 채널',
    sampleLine: '규칙이 보이면 잠금은 이미 절반쯤 열린 거야.'
  }
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'MQ-01',
    title: '카세트 네 채널 복원',
    subtitle: 'Act 1',
    act: 1,
    type: 'main',
    mechanic: '팀원별 오디오 단서 수집',
    status: 'active',
    assignedTo: null,
    objective: '네 명의 채널을 모두 복원해 연구실의 첫 번째 잠금을 해제하세요.',
    clues: ['낡은 카세트 플레이어', '교수의 경고 음성'],
    npcLines: ['서로 다른 결핍이 같은 문을 두드린다.']
  },
  {
    id: 'MQ-02',
    title: '교수 연구실의 좌표',
    subtitle: 'Act 2',
    act: 2,
    type: 'main',
    mechanic: '문서, 격자, CCTV, 칠판 단서 연결',
    status: 'locked',
    assignedTo: null,
    objective: '문서와 공간 단서를 연결해 금고 접근 권한을 얻으세요.',
    clues: ['찢어진 서약서', '6x6 바닥 격자', 'CCTV 사각지대', '칠판 좌표'],
    npcLines: ['단서는 혼자 있을 때보다 함께 있을 때 더 정확해진다.']
  },
  {
    id: 'MQ-03',
    title: '최종 금고',
    subtitle: 'Act 3',
    act: 3,
    type: 'main',
    mechanic: '키워드와 신뢰도 조합',
    status: 'locked',
    assignedTo: null,
    objective: '키워드 "공감"과 현재 신뢰도를 조합해 금고를 여세요.',
    clues: ['공감', '현재 팀 신뢰도'],
    npcLines: ['마지막 비밀번호는 정답보다 태도에 가깝다.']
  }
];

export const REFRAMING_DATA = [
  { character: 'WOOJU', weakness: '조급함', strength: '빠른 구조 파악', keyword: '공' },
  { character: 'JINHAN', weakness: '단정', strength: '깊이 있는 분석', keyword: '감' },
  { character: 'JAEYEONG', weakness: '방치', strength: '예리한 관찰', keyword: '관찰' },
  { character: 'JIYEONG', weakness: '침묵', strength: '차분한 중재', keyword: '기록' }
];
