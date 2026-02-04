import { useState, useCallback, useEffect } from 'react';
import './App.css';

const NO_BUTTON_WIDTH = 120;
const NO_BUTTON_HEIGHT = 48;
const RUN_AWAY_THRESHOLD = 140;
const PADDING = 24;

function getRandomPosition() {
  const maxX = window.innerWidth - NO_BUTTON_WIDTH - PADDING;
  const maxY = window.innerHeight - NO_BUTTON_HEIGHT - PADDING;
  return {
    x: PADDING + Math.random() * Math.max(0, maxX - PADDING),
    y: PADDING + Math.random() * Math.max(0, maxY - PADDING),
  };
}

function Confetti() {
  const colors = ['#ff6b9d', '#ffb6c1', '#c9a0dc', '#ff69b4', '#ffc0cb', '#e6e6fa'];
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            '--left': `${p.left}%`,
            '--delay': `${p.delay}s`,
            '--duration': `${p.duration}s`,
            '--color': p.color,
            '--size': `${p.size}px`,
            '--rotation': `${p.rotation}deg`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 4,
    duration: 8 + Math.random() * 4,
    size: 14 + Math.random() * 18,
  }));

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 + 60 : 200,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.55 : 220,
  }));
  const moveNoButton = useCallback(() => {
    setNoButtonPos(getRandomPosition());
  }, []);

  useEffect(() => {
    setNoButtonPos({
      x: Math.max(PADDING, window.innerWidth / 2 - NO_BUTTON_WIDTH / 2 + 90),
      y: Math.max(PADDING, window.innerHeight * 0.58 - NO_BUTTON_HEIGHT / 2),
    });
  }, []);

  useEffect(() => {
    if (accepted) return;
    const onResize = () => setNoButtonPos((prev) => {
      const maxX = window.innerWidth - NO_BUTTON_WIDTH - PADDING;
      const maxY = window.innerHeight - NO_BUTTON_HEIGHT - PADDING;
      return {
        x: Math.min(maxX, Math.max(PADDING, prev.x)),
        y: Math.min(maxY, Math.max(PADDING, prev.y)),
      };
    });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [accepted]);

  const checkProximityAndMove = useCallback(
    (clientX, clientY) => {
      if (accepted) return;
      const centerX = noButtonPos.x + NO_BUTTON_WIDTH / 2;
      const centerY = noButtonPos.y + NO_BUTTON_HEIGHT / 2;
      const dist = Math.hypot(clientX - centerX, clientY - centerY);
      if (dist < RUN_AWAY_THRESHOLD) moveNoButton();
    },
    [accepted, noButtonPos, moveNoButton]
  );

  const handleMouseMove = useCallback(
    (e) => checkProximityAndMove(e.clientX, e.clientY),
    [checkProximityAndMove]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const t = e.touches[0];
      if (t) checkProximityAndMove(t.clientX, t.clientY);
    },
    [checkProximityAndMove]
  );

  return (
    <div
      className={`app ${accepted ? 'app--celebration' : 'app--landing'}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {accepted ? (
        <>
          <div className="celebration-bg" />
          <FloatingHearts />
          <Confetti />
          <div className="celebration-content">
            <p className="celebration-line celebration-line--1">
              Thanks for being my valentine 😘
            </p>
            <p className="celebration-line celebration-line--2">
              To a lifetime of Valentines with you 💕
            </p>
            <p className="celebration-line celebration-line--3">
             Kanji, I love you kure kure kureeeeee 💕 
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="landing-bg" />
          <FloatingHearts />
          <div className="landing-content">
            <h1 className="question">Dear Kanji, will you be my Valentine💝?</h1>
            <div className="buttons">
              <button
                type="button"
                className="btn btn--yes"
                onClick={() => setAccepted(true)}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn--no"
                style={{
                  left: noButtonPos.x,
                  top: noButtonPos.y,
                }}
                aria-label="No (moves when you try to click)"
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
