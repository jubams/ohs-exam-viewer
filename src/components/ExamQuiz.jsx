import { useState } from 'react';
import './ExamQuiz.css';

function ExamQuiz({ exam, answers, onAnswer, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = exam.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const optionKeys = Object.keys(currentQuestion.options);
  const userAnswer = answers[currentQuestion.question_number];
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer.toLowerCase() === currentQuestion.correct_answer.toLowerCase();

  function handleOptionSelect(key) {
    if (isAnswered) return;
    onAnswer(currentQuestion.question_number, key);
  }

  function handlePrev() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <div className="exam-quiz">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="question-card">
        <div className="question-header">
          <span className="question-number">Question {currentQuestion.question_number}</span>
          <span className="question-progress">{currentQuestionIndex + 1} / {questions.length}</span>
        </div>

        <p className="question-text" style={{ whiteSpace: 'pre-line' }}>{currentQuestion.question_text}</p>

        <div className="options-list">
          {optionKeys.map(key => {
            const isSelected = userAnswer === key;
            const isCorrectOption = key.toLowerCase() === currentQuestion.correct_answer.toLowerCase();
            const showResult = isAnswered;

            let optionClass = 'option';
            if (showResult) {
              if (isCorrectOption) {
                optionClass += ' correct';
              } else if (isSelected && !isCorrect) {
                optionClass += ' incorrect';
              } else {
                optionClass += ' disabled';
              }
            } else if (isSelected) {
              optionClass += ' selected';
            }

            return (
              <button
                key={key}
                className={optionClass}
                onClick={() => handleOptionSelect(key)}
                disabled={isAnswered}
              >
                <span className="option-letter">{key}</span>
                <span className="option-text">{currentQuestion.options[key]}</span>
                {showResult && isCorrectOption && (
                  <svg className="result-icon correct-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
                {showResult && isSelected && !isCorrect && (
                  <svg className="result-icon wrong-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`feedback-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Correct!</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                <span>Incorrect — Correct answer: {currentQuestion.correct_answer}) {currentQuestion.options[currentQuestion.correct_answer]}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="question-navigation">
        <button
          className="nav-btn"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Previous
        </button>

        <div className="question-dots">
          {questions.map((q, idx) => {
            const qAnswer = answers[q.question_number];
            const qCorrect = qAnswer?.toLowerCase() === q.correct_answer.toLowerCase();
            return (
              <button
                key={q.question_number}
                className={`dot ${idx === currentQuestionIndex ? 'active' : ''} ${qAnswer ? (qCorrect ? 'correct' : 'wrong') : ''}`}
                onClick={() => setCurrentQuestionIndex(idx)}
                title={`Question ${q.question_number}`}
              />
            );
          })}
        </div>

        {currentQuestionIndex < questions.length - 1 ? (
          <button className="nav-btn primary" onClick={handleNext}>
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ) : (
          <button
            className="nav-btn submit-btn"
            onClick={onSubmit}
            disabled={!allAnswered}
          >
            See Results
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        )}
      </div>

      {!allAnswered && (
        <p className="unanswered-warning">
          {questions.length - answeredCount} question{questions.length - answeredCount !== 1 ? 's' : ''} remaining
        </p>
      )}
    </div>
  );
}

export default ExamQuiz;
