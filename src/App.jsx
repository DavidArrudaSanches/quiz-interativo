import { useState } from 'react';
import { questions } from './data/questions'; // Importa a lista de questões
import Header from './components/header';
import QuestionCard from './components/QuestionCard';

// Componente principal do Quiz
export default function App() {
  // 1. Estado para o índice da questão atual (0 a 9)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 2. Estado para armazenar o histórico de respostas e tempos
  // Estrutura de cada item: { questionId: 1, selectedAnswer: 'useState', timeSpent: 15 }
  const [answersHistory, setAnswersHistory] = useState([]);

  // 3. Estado temporário para armazenar o tempo gasto na última questão.
  // CRUCIAL: O timer do Header é limpo ANTES de a resposta ser processada,
  // então usamos este estado para guardar o tempo entre os dois eventos.
  const [timeSpentOnLastQuestion, setTimeSpentOnLastQuestion] = useState(0);

  // Verifica se o quiz terminou
  const isQuizFinished = currentQuestionIndex >= questions.length;

  // Variáveis para a questão atual
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  // =======================================================
  // FUNÇÕES DE MANIPULAÇÃO DE ESTADO
  // =======================================================

  /**
   * 1. Chamada pelo componente Header (na função de limpeza do useEffect)
   * Salva o tempo gasto na questão que acabou de ser respondida.
   * @param {number} time - Tempo em segundos gasto na última questão.
   */
  const handleTimerUpdate = (time) => {
    // Armazena o tempo na variável temporária antes de avançar a questão
    setTimeSpentOnLastQuestion(time);
  };

  /**
   * 2. Chamada pelo componente QuestionCard (ao clicar em uma resposta)
   * Salva a resposta do usuário e avança para a próxima questão.
   * @param {number} questionId - ID da questão respondida.
   * @param {string} selectedOption - A opção escolhida pelo usuário.
   */
  const handleAnswerSelected = (questionId, selectedOption) => {
    // 1. Cria o objeto de resposta completo, usando o tempo que foi
    // salvo pelo Header em 'timeSpentOnLastQuestion'
    const answerObject = {
      ...currentQuestion, // Inclui todos os dados da questão para o ScoreBoard
      questionId: questionId,
      selectedAnswer: selectedOption,
      timeSpent: timeSpentOnLastQuestion, // Usa o tempo salvo
      isCorrect: selectedOption === currentQuestion.answer,
    };

    // 2. Adiciona o objeto ao histórico de respostas
    setAnswersHistory((prevHistory) => [...prevHistory, answerObject]);

    // 3. Avança para a próxima questão
    // Isso forçará a re-renderização e reiniciará o timer no Header.
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  // =======================================================
  // RENDERIZAÇÃO
  // =======================================================

  return (
    <div className="app-container">
      <Header
        key={currentQuestionIndex} // CHAVE para forçar a reinicialização do timer
        title="Quiz Interativo de React Hooks"
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        onTimerUpdate={handleTimerUpdate} // Prop para salvar o tempo
      />

      {isQuizFinished ? (
        <div className="score-board">
          <h2>🎉 Quiz Finalizado!</h2>
          <p>Você respondeu {totalQuestions} questões.</p>
          <pre>{JSON.stringify(answersHistory, null, 2)}</pre>
        </div>
      ) : (
        <QuestionCard
          questionData={currentQuestion}
          onSelectAnswer={handleAnswerSelected} 
        />
      )}
    </div>
  );
}