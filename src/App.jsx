// src/App.jsx
import { useState } from 'react';
// Caminho correto: ./data/questions
import { questions } from './data/questions'; 
import Header from './components/header';
import QuestionCard from './components/QuestionCard';
import ScoreBoard from './components/ScoreBoard'; 

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [timeSpentOnLastQuestion, setTimeSpentOnLastQuestion] = useState(0);

  const isQuizFinished = currentQuestionIndex >= questions.length;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

 
  const handleTimerUpdate = (time) => {
    setTimeSpentOnLastQuestion(time);
  };


  const handleAnswerSelected = (questionId, selectedOption) => {
    if (isQuizFinished) return;
      

    const answerObject = {
      ...currentQuestion,
      questionId: questionId,
      selectedAnswer: selectedOption,
      timeSpent: timeSpentOnLastQuestion, 
      isCorrect: selectedOption === currentQuestion.answer,
    };

    // 2. Adiciona ao histórico
    setAnswersHistory((prevHistory) => [...prevHistory, answerObject]);

    // 3. Avança para a próxima questão (isso dispara a limpeza do timer)
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  return (
    <div className="app-container">
      {/* A KEY é essencial para forçar o reinício do timer */}
      <Header
        key={currentQuestionIndex} 
        title="Quiz Interativo de React Hooks"
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onTimerUpdate={handleTimerUpdate} 
      />

      <main className="quiz-content">
        {isQuizFinished ? (

          <ScoreBoard 
            answersHistory={answersHistory} 
          />
        ) : (
          <QuestionCard
            questionData={currentQuestion}
            onSelectAnswer={handleAnswerSelected}
          />
        )}
      </main>
    </div>
  );
}