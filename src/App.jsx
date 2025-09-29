import { useState } from 'react'
import './App.module.css'
import Header from './components/header'
import { questions } from './data/questions'; // Importando a lista


function App() {
  // Estado para armazenar o índice da questão atual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Estado para armazenar o histórico de respostas e tempos
  // Exemplo: [{ questionId: 1, selectedAnswer: 'useState', timeSpent: 15 }, ...]
  const [answersHistory, setAnswersHistory] = useState([]);
  
    // Função que o Header chamará para salvar o tempo
  const handleTimerUpdate = (time) => {
    // Esta função salva o tempo e deve ser combinada com a lógica de salvar a resposta
    // Por enquanto, vamos apenas logar para ver se funciona
    console.log(`Tempo gasto na questão ${currentQuestionIndex + 1}: ${time} segundos`);
    
    // **NOTA CRÍTICA:** No quiz final, você precisará salvar o tempo junto
    // com a resposta do usuário. O ideal é que a função de avançar
    // (que é chamada pelo QuestionCard) receba tanto a resposta
    // quanto o tempo salvo aqui.
    
    // Para fins de teste inicial, você pode simplesmente avançar
    // (embora a lógica final seja mais complexa)
  };
  
  return (
    <div>
      <Header 
        title="Quiz Interativo"
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={10} // Exemplo
        // A SOLUÇÃO: Passar a função para o Header
        onTimerUpdate={handleTimerUpdate} 
        />
      {/* ... QuestionCard e outros componentes */}
    </div>
  );
}

export default App
