import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { timeLeft, setTimeLeft, currentIndex, questions } = useQuiz();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimeLeft, currentIndex]);

  useEffect(() => {
    if (timeLeft === 0 && currentIndex < questions.length) {
      nextQuestion();
    }
  }, [timeLeft]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Time Remaining:</span>
        <span
          className={`font-bold ${
            timeLeft <= 10 ? "text-red-600" : "text-blue-600"
          }`}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-1000"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
