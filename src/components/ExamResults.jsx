import { useState } from 'react';
import './ExamResults.css';

function ExamResults({ exam, score, answers, onRetry, onBack }) {
  const [showReview, setShowReview] = useState(false);

  function getScoreColor() {
    if (score.percentage >= 80) return 'success';
    if (score.percentage >= 60) return 'warning';
    return 'danger';
  }

  function getScoreMessage() {
    if (score.percentage >= 90) return 'Excellent! You have a strong understanding of OHS.';
    if (score.percentage >= 80) return 'Great job! You\'re well prepared.';
    if (score.percentage >= 60) return 'Good effort! Review the questions you missed.';
    return 'Keep studying! Review the material and try again.';
  }

  return (
    <div className="exam-results">
      <div className={`score-card ${getScoreColor()}`}>
        <div className="score-circle">
          <span className="score-percentage">{score.percentage}%</span>
        </div>
        <h2>{getScoreMessage()}</h2>
        <div className="score-stats">
          <div className="stat">
            <span className="stat-value correct">{score.correct}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat">
            <span className="stat-value incorrect">{score.total - score.correct}</span>
            <span className="stat-label">Incorrect</span>
          </div>
          <div className="stat">
            <span className="stat-value total">{score.total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="score-actions">
          <button className="action-btn retry" onClick={onRetry}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Retry Exam
          </button>
          <button className="action-btn review" onClick={() => setShowReview(!showReview)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {showReview ? 'Hide' : 'Review'} Answers
          </button>
          <button className="action-btn back" onClick={onBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            All Exams
          </button>
        </div>
      </div>

      {showReview && (
        <div className="review-section">
          <h3>Answer Review</h3>
          {exam.questions.map(q => {
            const userAnswer = answers[q.question_number];
            const isCorrect = userAnswer?.toLowerCase() === q.correct_answer.toLowerCase();
            return (
              <div key={q.question_number} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="review-header">
                  <span className="review-q-number">Q{q.question_number}</span>
                  <span className={`review-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Correct</>
                    ) : (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Incorrect</>
                    )}
                  </span>
                </div>
                <p className="review-question">{q.question_text}</p>
                <div className="review-answers">
                  {!isCorrect && userAnswer && (
                    <div className="review-answer your-answer">
                      <span className="answer-label">Your answer:</span>
                      <span className="answer-value">{userAnswer}) {q.options[userAnswer]}</span>
                    </div>
                  )}
                  <div className="review-answer correct-answer">
                    <span className="answer-label">Correct answer:</span>
                    <span className="answer-value">{q.correct_answer}) {q.options[q.correct_answer]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExamResults;
