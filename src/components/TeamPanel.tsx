import React, { useState } from 'react';
import { CharacterId, ChatMessage } from '../types';
import { CHARACTER_DATA } from '../data/gameData';
import { MessageSquare, Heart, Lightbulb, Settings, FileText } from 'lucide-react';

interface TeamPanelProps {
  selectedCharacter: CharacterId;
  onSelectCharacter: (id: CharacterId) => void;
  teamTrust: number;
  messages: ChatMessage[];
  hintUsed: number;
  onHintRequest: () => void;
  onMenuRequest: () => void;
}

export const TeamPanel: React.FC<TeamPanelProps> = ({
  selectedCharacter,
  onSelectCharacter,
  teamTrust,
  messages,
  hintUsed,
  onHintRequest,
  onMenuRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'memos' | 'hints' | 'settings'>('memos');

  return (
    <aside id="team-panel" className="flex flex-col gap-4 select-none">
      {/* 1. Vertical Interactive Tab Menu */}
      <div className="grid grid-cols-3 gap-1 bg-[#120e0a] border border-[#3e342a] p-1 rounded-md shadow-md">
        <button
          onClick={() => setActiveTab('memos')}
          className={`py-2 text-[11px] font-bold flex flex-col items-center justify-center gap-1 rounded transition cursor-pointer active:scale-95 ${
            activeTab === 'memos'
              ? 'bg-[#c49c5e] text-black shadow-inner font-extrabold'
              : 'text-stone-300 hover:text-[#c49c5e] hover:bg-[#1f1711]'
          }`}
        >
          <FileText size={15} />
          <span>메모</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('hints');
            onHintRequest();
          }}
          className={`py-2 text-[11px] font-bold flex flex-col items-center justify-center gap-1 rounded transition cursor-pointer active:scale-95 ${
            activeTab === 'hints'
              ? 'bg-[#c49c5e] text-black shadow-inner font-extrabold'
              : 'text-stone-300 hover:text-[#c49c5e] hover:bg-[#1f1711]'
          }`}
        >
          <Lightbulb size={15} />
          <span>힌트</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('settings');
            onMenuRequest();
          }}
          className={`py-2 text-[11px] font-bold flex flex-col items-center justify-center gap-1 rounded transition cursor-pointer active:scale-95 ${
            activeTab === 'settings'
              ? 'bg-[#c49c5e] text-black shadow-inner font-extrabold'
              : 'text-stone-300 hover:text-[#c49c5e] hover:bg-[#1f1711]'
          }`}
        >
          <Settings size={15} />
          <span>설정</span>
        </button>
      </div>

      {/* Tab Content helper display */}
      {activeTab === 'hints' && (
        <div className="p-3 bg-[#1d1510] border border-[#db9e54]/30 rounded text-[10.5px] leading-relaxed text-[#f4e4bd] font-serif">
          💡 <strong>수사 조율 시스템</strong>: 수사가 막힐 땐 단원들과 정보를 조율하세요. 현재 사용한 단조 힌트: {hintUsed}개.
        </div>
      )}

      {/* 2. TEAM panel containing four members */}
      <div className="bg-[rgba(22,17,14,0.92)] border-2 border-[#3e342a] rounded-lg p-4 shadow-2xl relative">
        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-[#c49c5e]/40" />
        <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#c49c5e]/40" />

        <div className="text-center text-[10.5px] text-[#8c867c] tracking-[2px] mb-4 border-b border-[#30241b] pb-2 font-mono uppercase font-black">
          TEAM_COMM_RADIO
        </div>
        
        <div className="flex flex-col gap-3.5">
          {(Object.keys(CHARACTER_DATA) as CharacterId[]).map((id) => {
            const data = CHARACTER_DATA[id];
            const isSelected = selectedCharacter === id;
            return (
              <button
                key={id}
                onClick={() => onSelectCharacter(id)}
                className={`w-full flex items-center gap-3 p-2 rounded transition-all text-left outline-none cursor-pointer ${
                  isSelected 
                    ? 'bg-[#c49c5e]/10 border border-[#c49c5e]/50 shadow-[0_0_12px_rgba(196,156,94,0.15)]' 
                    : 'bg-black/20 border border-transparent hover:bg-stone-900/40'
                }`}
              >
                {/* Avatar Placeholder */}
                <div className="w-[34px] h-[34px] border border-[#5c493c] rounded flex items-center justify-center bg-[#17120e] relative overflow-hidden flex-shrink-0">
                  <span className="text-[12px] font-black" style={{ color: data.lightColor }}>
                    {data.name[0]}
                  </span>
                  {isSelected && (
                    <div className="absolute inset-0 border border-[#c49c5e] bg-amber-500/5 rounded" />
                  )}
                </div>

                {/* Info & Heartbeat Waveform */}
                <div className="flex-grow flex justify-between items-center overflow-hidden">
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-black text-white">{data.name}</span>
                    <span className="text-[10px] text-[#8c867c] truncate max-w-[90px]">{data.role}</span>
                  </div>

                  {/* Pulsing colored EKG waveform */}
                  <svg className="w-12 h-3.5 opacity-80 self-center animate-pulse flex-shrink-0" viewBox="0 0 45 12">
                    <path 
                      d="M0,6 L12,6 L16,1 L21,11 L25,6 L45,6" 
                      fill="none" 
                      stroke={data.lightColor} 
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom 신뢰도 Gauge with progress bar */}
      <div className="bg-[rgba(22,17,14,0.92)] border border-[#3e342a] p-4 rounded-lg shadow-md flex flex-col items-center">
        <span className="text-[10px] text-[#8c867c] font-black tracking-wider uppercase font-mono mb-1.5">INVEST_MUTUAL_TRUST</span>
        <div className="text-base font-bold text-[#c49c5e] flex items-center gap-2 leading-none">
          <Heart size={16} className="text-red-500 fill-red-600 animate-pulse" />
          <span>{teamTrust}%</span>
          <span className="text-[9px] text-[#8c867c] font-normal italic">신뢰도</span>
        </div>
        <div className="progress-bar w-full h-[6.5px] bg-[#0c0907] border border-[#30241b] rounded-full overflow-hidden mt-3">
          <div 
            className="progress-fill h-full bg-[#c49c5e] transition-all duration-700" 
            style={{ 
              width: `${teamTrust}%`, 
              boxShadow: '0 0 10px rgba(196,156,94,0.5)' 
            }}
          />
        </div>
      </div>

      {/* 4. Memos history listing integrated cleanly */}
      {activeTab === 'memos' && (
        <div className="bg-[#120e0a]/80 border border-[#30241b] rounded p-3 h-40 overflow-y-auto soft-scrollbar text-[10.5px]">
          <div className="flex items-center gap-1.5 text-[#cca35a] font-bold font-mono border-b border-stone-900 pb-1.5 mb-2">
            <MessageSquare size={13} />
            <span>수사 기록 교신 피드</span>
          </div>
          <div className="space-y-2.5">
            {messages.slice(-4).map((msg) => (
              <div key={msg.id} className="border-l-2 border-[#3e342a] pl-2 py-0.5">
                <span className="font-extrabold text-[#c49c5e] mr-1">
                  {msg.sender === 'SYSTEM' ? '시스템' : CHARACTER_DATA[msg.sender as CharacterId]?.name || msg.sender}:
                </span>
                <span className="text-stone-300 font-serif leading-relaxed text-justify">{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
