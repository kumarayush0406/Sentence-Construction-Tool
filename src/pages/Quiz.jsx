import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import Question from "../components/Question";
import Option from "../components/Option";
import Timer from "../components/Timer";
import Progress from "../components/Progress";

const Quiz = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentIndex,
    selected,
    nextQuestion,
    timeLeft,
    setTimeLeft,
    isLoading,
  } = useQuiz();

  useEffect(() => {
    if (questions.length > 0 && currentIndex >= questions.length) {
      navigate("/results");
    }
  }, [currentIndex, questions, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (!questions.length || currentIndex >= questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">No Questions Available</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const requiredBlanks = currentQuestion?.blanks?.length || 0;
  const allFilled = Object.keys(selected).length === requiredBlanks;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <Progress total={questions.length} current={currentIndex + 1} />
          <button
            onClick={() => window.confirm("Quit quiz?") && navigate("/")}
            className="ml-4 px-4 py-2 border-1 border-grey-500  text-black rounded-lg hover:bg-red-600"
          >
            Quit
          </button>
        </div>

        <Timer />
        <Question question={currentQuestion.question} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, i) => (
            <Option key={i} option={option} />
          ))}
        </div>

        <button
          onClick={nextQuestion}
          disabled={!allFilled}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
            allFilled
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {currentIndex === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
