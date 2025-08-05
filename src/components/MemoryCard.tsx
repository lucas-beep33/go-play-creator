import React from 'react';
import { cn } from '@/lib/utils';

interface MemoryCardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  emoji,
  isFlipped,
  isMatched,
  onClick,
  isDisabled
}) => {
  return (
    <div
      className={cn(
        "relative w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-all duration-300",
        "hover:scale-105 hover:shadow-lg",
        isDisabled && "cursor-not-allowed"
      )}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div
        className={cn(
          "relative w-full h-full rounded-xl transition-transform duration-500 preserve-3d",
          isFlipped && "rotate-y-180"
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-xl",
            "bg-gradient-to-br from-game-primary to-game-secondary",
            "flex items-center justify-center backface-hidden",
            "shadow-card border border-white/10"
          )}
        >
          <div className="text-2xl">🎮</div>
        </div>
        
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-xl rotate-y-180",
            "bg-gradient-to-br from-card to-secondary",
            "flex items-center justify-center backface-hidden",
            "border-2 transition-all duration-300",
            isMatched 
              ? "border-game-success shadow-[0_0_20px_hsl(var(--game-success)/0.5)]" 
              : "border-white/20 shadow-card-hover"
          )}
        >
          <div className={cn(
            "text-2xl md:text-3xl transition-all duration-300",
            isMatched && "animate-pulse-success"
          )}>
            {emoji}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;