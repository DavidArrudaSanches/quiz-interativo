import styles from "./QuestionCard.module.css";

// Mapeamento de índice para letra da opção (A, B, C, D, E)
const optionLetters = ["A", "B", "C", "D", "E"];

// O componente QuestionCard recebe:
// - questionData: Objeto com id, question, options e answer da questão atual.
// - onSelectAnswer: Função a ser chamada ao clicar em uma resposta.
//   Deve receber (questionId, selectedAnswer)
export default function QuestionCard({ questionData, onSelectAnswer }) {
  // A função para lidar com o clique na resposta
  const handleAnswerClick = (selectedOption) => {
    // 1. Guarda a resposta selecionada e chama a função para avançar a questão
    // O componente pai (App.jsx) será responsável por guardar o tempo e a resposta
    onSelectAnswer(questionData.id, selectedOption);
  };

  // Se, por algum motivo, a questão não for carregada, retorna null
  if (!questionData) {
    return null;
  }

  return (
    <div className={styles.card}>
      {/* 1. Exibir o enunciado da questão em destaque [cite: 23] */}
      <p className={styles.questionText}>{questionData.question}</p>

      <div className={styles.optionsContainer}>
        {/* 2. Listar as alternativas como botões clicáveis  */}
        {questionData.options.map((option, index) => (
          <button
            key={index}
            className={styles.optionButton}
            onClick={() => handleAnswerClick(option)}
          >
            {/* Prefixo com letra (A, B, C, D, E)  */}
            <span className={styles.optionLetter}>
              {optionLetters[index]}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}