import './ExamSelector.css';

function ExamSelector({ exams, onExamSelect }) {
  return (
    <div className="exam-selector">
      <h3>Select an Exam</h3>
      <div className="exam-grid">
        {exams.map(exam => (
          <button
            key={exam.id}
            className="exam-card"
            onClick={() => onExamSelect(exam.id)}
          >
            <div className="exam-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="exam-info">
              <span className="exam-name">{exam.name}</span>
              <span className="exam-questions">{exam.questionCount} questions</span>
            </div>
            <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExamSelector;
