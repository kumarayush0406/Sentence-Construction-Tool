import { createContext, useContext, useState, useEffect } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/questions.json");
      const data = await response.json();

      if (data.status === "SUCCESS") {
        const transformed = data.data.questions.map((q) => ({
          ...q,
          blanks: q.correctAnswer.map((_, i) => ({ id: `blank_${i}` })),
          answer: q.correctAnswer.reduce((acc, val, i) => {
            acc[`blank_${i}`] = val;
            return acc;
          }, {}),
        }));

        setQuestions(transformed);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = Object.entries(selected).every(
      ([blankId, answer]) => answer === currentQuestion.answer[blankId]
    );

    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: { ...selected },
        correctAnswer: { ...currentQuestion.answer },
        isCorrect,
      },
    ]);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    checkAnswer();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected({});
      setTimeLeft(30);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setSelected({});
    setScore(0);
    setResults([]);
    setTimeLeft(30);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentIndex,
        selected,
        setSelected,
        score,
        results,
        timeLeft,
        setTimeLeft,
        isLoading,
        fetchQuestions,
        nextQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
