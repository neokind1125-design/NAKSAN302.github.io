import { useState } from 'react';
import { CharacterId } from './types';
import { LandingPage } from './pages/LandingPage';
import { LobbyPage } from './pages/LobbyPage';
import { InGamePage } from './pages/InGamePage';
import { EndingPage } from './pages/EndingPage';

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'lobby' | 'ingame' | 'ending'>('landing');
  const [character, setCharacter] = useState<CharacterId>('JAEYEONG');

  // Ending specific final details shared state
  const [endingId, setEndingId] = useState('ENDING_B');
  const [finalTrust, setFinalTrust] = useState(76);
  const [finalHints, setFinalHints] = useState(0);
  const [finalClues, setFinalClues] = useState(0);
  const [finalResultText, setFinalResultText] = useState('');

  const handleCreateRoom = () => {
    setScreen('lobby');
  };

  const handleJoinRoom = () => {
    setScreen('lobby');
  };

  const handleStartGame = (id: CharacterId) => {
    setCharacter(id);
    setScreen('ingame');
  };

  const handleSelectEnding = (
    id: string,
    trust: number,
    hints: number,
    clues: number,
    text: string
  ) => {
    setEndingId(id);
    setFinalTrust(trust);
    setFinalHints(hints);
    setFinalClues(clues);
    setFinalResultText(text);
    setScreen('ending');
  };

  const handleRestart = () => {
    setScreen('landing');
  };

  return (
    <div className="min-h-screen bg-[#12100c] text-stone-100 selection:bg-amber-400/25">
      {screen === 'landing' && (
        <LandingPage onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      )}
      {screen === 'lobby' && (
        <LobbyPage
          onBackToLanding={() => setScreen('landing')}
          onStartGame={handleStartGame}
        />
      )}
      {screen === 'ingame' && (
        <InGamePage
          initialCharacter={character}
          onSelectEnding={handleSelectEnding}
          onBackToLanding={handleRestart}
        />
      )}
      {screen === 'ending' && (
        <EndingPage
          endingId={endingId}
          trust={finalTrust}
          hints={finalHints}
          clues={finalClues}
          resultText={finalResultText}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
