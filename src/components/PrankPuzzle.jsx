import { useState, useEffect } from 'react';
import './PrankPuzzle.css';

const WORDS = [
  { word: 'SALMAN' },
  { word: 'IS' },
  { word: 'THE' },
  { word: 'ULTIMATE' },
  { word: 'AMAZING' },
  { word: 'HUMAN' }
];

function PrankPuzzle({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [shake, setShake] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const currentWord = WORDS[step];

  function initStep() {
    const letters = currentWord.word.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setAvailableLetters(shuffled.map((l, i) => ({ letter: l, id: i, used: false })));
    setSelectedLetters([]);
  }

  useEffect(() => {
    initStep();
  }, [step]);

  function handleLetterClick(index) {
    const letter = availableLetters[index];
    if (letter.used) return;

    const newAvailable = [...availableLetters];
    newAvailable[index] = { ...letter, used: true };
    setAvailableLetters(newAvailable);
    setSelectedLetters([...selectedLetters, { letter: letter.letter, fromIndex: index }]);
  }

  function handleSelectedClick(index) {
    const item = selectedLetters[index];
    const newAvailable = [...availableLetters];
    newAvailable[item.fromIndex] = { ...newAvailable[item.fromIndex], used: false };
    setAvailableLetters(newAvailable);
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  }

  function checkAnswer() {
    const guess = selectedLetters.map(s => s.letter).join('');
    if (guess === currentWord.word) {
      if (step < WORDS.length - 1) {
        setStep(step + 1);
      } else {
        setShowFinal(true);
        setTimeout(() => onComplete(), 3000);
      }
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        initStep();
      }, 600);
    }
  }

  return (
    <div className="prank-puzzle">
      <div className="puzzle-content">
        {!showFinal ? (
          <>
            <div className="verify-header">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <h2>Human Verification</h2>
              <p>To prove you're not a bot, unscramble each word below.</p>
            </div>

            <div className="progress-steps">
              {WORDS.map((_, i) => (
                <div key={i} className={`step-dot ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                  {i < step ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
              ))}
            </div>

            <div className={`puzzle-area ${shake ? 'shake' : ''}`}>
              <p className="puzzle-instruction">
                Step {step + 1} of {WORDS.length} — Tap the letters below to spell the word:
              </p>

              <div className="answer-slots">
                {Array.from({ length: currentWord.word.length }).map((_, i) => (
                  <div key={i} className={`answer-slot ${selectedLetters[i] ? 'filled' : ''}`}>
                    {selectedLetters[i] ? (
                      <button onClick={() => handleSelectedClick(i)}>
                        {selectedLetters[i].letter}
                      </button>
                    ) : (
                      <span className="slot-placeholder">{i + 1}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="letter-bank">
                {availableLetters.map((item, i) => (
                  <button
                    key={item.id}
                    className={`letter-btn ${item.used ? 'used' : ''}`}
                    onClick={() => handleLetterClick(i)}
                    disabled={item.used}
                  >
                    {item.letter}
                  </button>
                ))}
              </div>

              <p className="tap-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V5a2 2 0 0 0-4 0v9"/><path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6z"/></svg>
                Tap the scrambled letters in the correct order
              </p>

              <button
                className="check-btn"
                onClick={checkAnswer}
                disabled={selectedLetters.length !== currentWord.word.length}
              >
                Check Answer
              </button>
            </div>
          </>
        ) : (
          <div className="final-message">
            <div className="confetti">
              <span>🎉</span>
              <span>🎉</span>
              <span>🎉</span>
            </div>
            <h2>You've Been Pranked!</h2>
            <div className="reveal-text">
              <p className="reveal-line">SALMAN</p>
              <p className="reveal-line">IS</p>
              <p className="reveal-line">THE</p>
              <p className="reveal-line">ULTIMATE</p>
              <p className="reveal-line">AMAZING</p>
              <p className="reveal-line">HUMAN</p>
              <p className="reveal-line">/ GENIUS</p>
            </div>
            <p className="reveal-sub">No payment needed. The exams are free. Now go study. 😄</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrankPuzzle;
