export type CharacterId = 'JAEYEONG' | 'WOOJU' | 'JIYEONG' | 'JINHAN';

export interface CharacterData {
  id: CharacterId;
  name: string;
  department: string;
  role: string;
  ability: string;
  color: string;
  lightColor: string;
  darkColor: string;
  description: string;
  ui: string;
  sampleLine: string;
}

export type PlayerStatus = 'ready' | 'waiting';

export interface Player {
  nickname: string;
  characterId: CharacterId | null;
  status: PlayerStatus;
}

export type QuestStatus = 'locked' | 'active' | 'completed';

export interface Quest {
  id: string;
  title: string;
  subtitle?: string;
  act: number;
  type: 'main' | 'sub';
  mechanic: string;
  status: QuestStatus;
  assignedTo: CharacterId | null;
  objective: string;
  clues: string[];
  npcLines: string[];
}

export interface ChatMessage {
  id: string;
  sender: CharacterId | 'SYSTEM' | 'PROFESSOR';
  text: string;
  timestamp: number;
  type: 'chat' | 'system' | 'clue-share' | 'keyword' | 'professor';
}

export interface GameState {
  currentScreen: 'landing' | 'lobby' | 'ingame' | 'ending';
  currentAct: number;
  timer: number; // seconds
  hintUsed: number;
  maxHints: number;
  teamTrust: number;
  sharedClues: number;
  sqCompleted: number;
  lightLevel: number;
  stressLevel: number;
  roomCode: string;
  selectedCharacter: CharacterId;
  questStatus: Record<string, QuestStatus>;
  showQuestMap: boolean;
}

