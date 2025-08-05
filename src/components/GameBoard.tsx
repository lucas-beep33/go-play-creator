import React, { useState, useEffect, useCallback } from 'react';
import MemoryCard from './MemoryCard';
import GameStats from './GameStats';
import { cn } from '@/lib/utils';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ['🎯', '🎮', '🚀', '⭐', '🎨', '🎵', '🏆', '💎'];

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(1000);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Initialize game
  const initializeGame = useCallback(() => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setTimeElapsed(0);
    setScore(1000);
    setIsGameWon(false);
    setIsDisabled(false);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!isGameWon && cards.length > 0) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGameWon, cards.length]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameWon(true);
    }
  }, [cards]);

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (isDisabled || flippedCards.length >= 2) return;
    
    const card = cards[cardId];
    if (card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      setIsDisabled(true);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setFlippedCards([]);
          setIsDisabled(false);
          setScore(prev => Math.max(0, prev + 50));
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
          setIsDisabled(false);
          setScore(prev => Math.max(0, prev - 10));
        }, 1200);
      }
    }
  };

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Game Stats */}
        <GameStats
          moves={moves}
          timeElapsed={timeElapsed}
          score={score}
          isGameWon={isGameWon}
          onRestart={initializeGame}
        />

        {/* Game Board */}
        <div className={cn(
          "bg-gradient-to-br from-card/50 to-secondary/50 rounded-2xl p-6",
          "border border-white/10 shadow-card backdrop-blur-sm"
        )}>
          <div className="grid grid-cols-4 gap-3 justify-items-center">
            {cards.map((card) => (
              <MemoryCard
                key={card.id}
                emoji={card.emoji}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card.id)}
                isDisabled={isDisabled}
              />
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Clique nas cartas para virá-las e encontre todos os pares!</p>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;