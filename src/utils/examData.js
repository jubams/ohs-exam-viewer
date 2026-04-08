let examsData = null;

async function loadExamsData() {
  if (examsData) return examsData;

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}exams.json`);
    if (!response.ok) {
      throw new Error(`Failed to load exams.json: ${response.status}`);
    }
    examsData = await response.json();
    return examsData;
  } catch (error) {
    console.error('Error loading exams data:', error);
    examsData = [];
    return examsData;
  }
}

export async function getAllExams() {
  const data = await loadExamsData();
  return data.map((exam, index) => ({
    id: index,
    name: exam.exam_name,
    questionCount: exam.questions.length
  }));
}

export async function getExamById(id) {
  const data = await loadExamsData();
  const exam = data[id];
  if (!exam) {
    console.warn(`Exam at index ${id} not found`);
    return null;
  }
  return exam;
}

export async function getExamCount() {
  const data = await loadExamsData();
  return data.length;
}

export { loadExamsData };
