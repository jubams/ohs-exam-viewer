import { useState, useEffect } from 'react';
import { getAllExams, getExamById } from '../utils/examData';
import ExamSelector from './ExamSelector';
import ExamQuiz from './ExamQuiz';
import ExamResults from './ExamResults';
import PrankLanding from './PrankLanding';
import PrankPuzzle from './PrankPuzzle';
import './App.css';

function App() {
  const [prankPhase, setPrankPhase] = useState(() => {
    if (localStorage.getItem('ohs_prank_done') === 'true') return 'done';
    return 'landing';
  });
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('select');
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function loadData() {
      const examsData = await getAllExams();
      setExams(examsData);
      setLoading(false);
    }
    loadData();
  }, []);

  async function handleExamSelect(examId) {
    const exam = await getExamById(examId);
    setCurrentExam(exam);
    setAnswers({});
    setScore(null);
    setView('quiz');
  }

  function handleAnswer(questionNumber, answer) {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  }

  function handleSubmit() {
    let correct = 0;
    currentExam.questions.forEach(q => {
      if (answers[q.question_number]?.toLowerCase() === q.correct_answer.toLowerCase()) {
        correct++;
      }
    });
    setScore({
      correct,
      total: currentExam.questions.length,
      percentage: Math.round((correct / currentExam.questions.length) * 100)
    });
    setView('results');
  }

  function handleBackToSelect() {
    setView('select');
    setCurrentExam(null);
    setAnswers({});
    setScore(null);
  }

  function handleRetry() {
    setAnswers({});
    setScore(null);
    setView('quiz');
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading OHS exams...</p>
      </div>
    );
  }

  if (prankPhase === 'landing') {
    return <PrankLanding onUnlockAttempt={() => setPrankPhase('puzzle')} />;
  }

  if (prankPhase === 'puzzle') {
    return <PrankPuzzle onComplete={() => {
      localStorage.setItem('ohs_prank_done', 'true');
      setPrankPhase('done');
    }} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div className="badge">OHS</div>
          <h1>Occupational Health & Safety</h1>
          <p className="subtitle">Exam Practice & Review</p>
        </div>
        {view === 'select' && (
          <div className="exam-selector-wrapper">
            <ExamSelector
              exams={exams}
              onExamSelect={handleExamSelect}
            />
          </div>
        )}
        {view === 'quiz' && currentExam && (
          <div className="quiz-header">
            <button className="back-btn" onClick={handleBackToSelect}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back to Exams
            </button>
            <h2>{currentExam.exam_name}</h2>
            <span className="question-count">{Object.keys(answers).length} / {currentExam.questions.length} answered</span>
          </div>
        )}
        {view === 'results' && currentExam && (
          <div className="quiz-header">
            <button className="back-btn" onClick={handleBackToSelect}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back to Exams
            </button>
            <h2>{currentExam.exam_name} - Results</h2>
          </div>
        )}
      </header>

      <main className="app-main">
        {view === 'select' && (
          <div className="welcome-section">
            <div className="welcome-card">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <h2>Welcome to OHS Exam Practice</h2>
              <p>Select an exam below to start practicing. Test your knowledge on occupational health and safety topics.</p>
            </div>
          </div>
        )}
        {view === 'quiz' && currentExam && (
          <ExamQuiz
            exam={currentExam}
            answers={answers}
            onAnswer={handleAnswer}
            onSubmit={handleSubmit}
          />
        )}
        {view === 'results' && currentExam && score && (
          <ExamResults
            exam={currentExam}
            score={score}
            answers={answers}
            onRetry={handleRetry}
            onBack={handleBackToSelect}
          />
        )}
      </main>
    </div>
  );
}

export default App;
