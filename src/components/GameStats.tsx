import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameStatsProps {
  moves: number;
  timeElapsed: number;
  score: number;
  isGameWon: boolean;
  onRestart: () => void;
}

const GameStats: React.FC<GameStatsProps> = ({
  moves,
  timeElapsed,
  score,
  isGameWon,
  onRestart
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Game Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">
          🧠 Jogo da Memória
        </h1>
        <p className="text-muted-foreground mt-2">Encontre todos os pares!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className={cn(
          "bg-gradient-to-br from-card to-secondary rounded-xl p-3 text-center",
          "border border-white/10 shadow-card"
        )}>
          <Target className="w-4 h-4 mx-auto mb-1 text-game-primary" />
          <div className="text-lg font-bold text-foreground">{moves}</div>
          <div className="text-xs text-muted-foreground">Jogadas</div>
        </div>

        <div className={cn(
          "bg-gradient-to-br from-card to-secondary rounded-xl p-3 text-center",
          "border border-white/10 shadow-card"
        )}>
          <Clock className="w-4 h-4 mx-auto mb-1 text-game-secondary" />
          <div className="text-lg font-bold text-foreground">{formatTime(timeElapsed)}</div>
          <div className="text-xs text-muted-foreground">Tempo</div>
        </div>

        <div className={cn(
          "bg-gradient-to-br from-card to-secondary rounded-xl p-3 text-center",
          "border border-white/10 shadow-card"
        )}>
          <Trophy className="w-4 h-4 mx-auto mb-1 text-game-accent" />
          <div className="text-lg font-bold text-foreground">{score}</div>
          <div className="text-xs text-muted-foreground">Pontos</div>
        </div>
      </div>

      {/* Restart Button */}
      <Button
        onClick={onRestart}
        className={cn(
          "w-full bg-gradient-to-r from-game-primary to-game-secondary",
          "hover:from-game-secondary hover:to-game-accent",
          "text-primary-foreground font-semibold",
          "shadow-button border-0",
          "transition-all duration-300 hover:scale-105"
        )}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Novo Jogo
      </Button>

      {/* Win Message */}
      {isGameWon && (
        <div className={cn(
          "text-center p-4 rounded-xl animate-bounce-in",
          "bg-gradient-to-r from-game-success/20 to-game-accent/20",
          "border border-game-success/30"
        )}>
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-lg font-bold text-game-success">Parabéns!</div>
          <div className="text-sm text-muted-foreground">
            Você completou em {moves} jogadas!
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStats;