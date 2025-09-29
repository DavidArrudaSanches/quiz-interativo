import styles from "./ScoreBoard.module.css";

// Formata o tempo (em segundos) para M:SS
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(1, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// O ScoreBoard recebe o histórico completo de respostas
export default function ScoreBoard({ answersHistory }) {
  // 1. Cálculo do Resumo
  const totalQuestions = answersHistory.length;
  const correctAnswers = answersHistory.filter(answer => answer.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  
  // Calcula a pontuação total somando os pontos das respostas corretas
  const finalScore = answersHistory.reduce((total, answer) => {
    return total + (answer.isCorrect ? answer.points : 0);
  }, 0);

  // Calcula a pontuação máxima possível
  const maxScore = answersHistory.reduce((total, question) => total + question.points, 0);

  return (
    <div className={styles.container}>
      {/* Exibir resumo no topo: Pontuação final */}
      <div className={styles.summary}>
        <h1>🏆 Resultado Final do Quiz!</h1>
        <p className={styles.finalScore}>
          Pontuação Total: {finalScore} / {maxScore} pontos
        </p>
        <p>
          Acertos: <span className={styles.correctCount}>**{correctAnswers}**</span> | 
          Erros: <span className={styles.incorrectCount}>**{incorrectAnswers}**</span>
        </p>
        <p className={styles.detail}>
          Tempo total de resposta: {formatTime(answersHistory.reduce((sum, a) => sum + a.timeSpent, 0))}
        </p>
      </div>
      
      <h2>Detalhes das Respostas</h2>
      
      {/* Exibir cada questão respondida em um card */}
      <div className={styles.resultsList}>
        {answersHistory.map((answer, index) => {
          // Determina a classe para destaque visual (verde/vermelho)
          const cardClass = answer.isCorrect ? styles.correctCard : styles.incorrectCard;
          
          return (
            <div key={answer.questionId} className={`${styles.card} ${cardClass}`}>
              
              {/* Enunciado da questão */}
              <p className={styles.questionText}>
                {index + 1}. {answer.question}
              </p>
              
              <div className={styles.detailsGrid}>
                {/* Pontuação da questão */}
                <p>
                  Pontos: {answer.isCorrect ? answer.points : 0} / {answer.points}
                </p>

                {/* Tempo gasto para responder */}
                <p>
                  Tempo Gasto: {formatTime(answer.timeSpent)}
                </p>

                {/* Resposta escolhida pelo usuário (Destacada) */}
                <p className={styles.userAnswer}>
                  Sua Resposta: {answer.selectedAnswer}
                </p>

                {/* Resposta correta (Destacada apenas se incorreta) */}
                {!answer.isCorrect && (
                  <p className={styles.correctAnswer}>
                    Resposta Correta: {answer.answer}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}