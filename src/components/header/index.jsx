import { useState, useEffect } from "react";
import styles from "./Header.module.css";

// O componente Header recebe:
// - title: Título do quiz (ex: "Quiz Interativo")
// - currentQuestionIndex: Índice da questão atual (começa em 0)
// - totalQuestions: Número total de questões
// - onTimerUpdate: Função para notificar o componente pai sobre o tempo gasto na questão
export default function Header({ title, currentQuestionIndex, totalQuestions, onTimerUpdate }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
    
      setTime((prevTime) => prevTime + 1);
    }, 1000);


    return () => {
      clearInterval(intervalId); 
      onTimerUpdate(time);

    };
  }, [currentQuestionIndex]);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };


  return (
    <header className={styles.header}>
     
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.infoBar}>
       
        <p className={styles.questionStatus}>
          Questão {currentQuestionIndex + 1} / {totalQuestions}
        </p>

        <div className={styles.timer}>
          Tempo:{formatTime(time)}
        </div>
      </div>
    </header>
  );
}