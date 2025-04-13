import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const { score, results, questions, resetQuiz } = useQuiz();

  const handleRestart = () => {
    resetQuiz();
    navigate("/quiz");
  };

  const formatAnswers = (result) => {
    return {
      ...result,
      correctAnswersArray: Array.isArray(result.correctAnswer)
        ? result.correctAnswer
        : Object.values(result.correctAnswer || {}),
    };
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center mb-8 flex flex-col justify-center items-center">
        <div className="w-50 h-50 mb-7 border-8 border-green-new rounded-full flex items-center justify-center flex-col ">
          <h2 className="text-3xl font-bold mb-1 text-center"> {score}</h2>
          <h3> Overall Score</h3>
        </div>
        <p>
          While you correctly formed several sentences, there are a couple of
          areas where improvement is needed. Pay close attention to sentence
          structure and word placement to ensure clarity and correctness. Review
          your responses below for more details.
        </p>
        <div className="flex justify-center gap-4 mb-8 mt-11">
          <button
            onClick={() => navigate("/")}
            className=" text-blue-500 border-2 border-blue-500 px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      {results.map((result, index) => {
        const formatted = formatAnswers(result);
        return (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="bg-lightgrey-500 rounded-xl p-1.5">Prompt</p>
              <h3 className="font-semibold">Question {index + 1}</h3>
            </div>

            <p className="mb-3 text-gray-700">
              {result.question.split("_____________").map((part, i) => (
                <span key={i}>
                  {part}
                  {i < Object.values(result.userAnswer || {}).length && (
                    <span
                      className={`mx-1 px-2 rounded ${
                        Object.values(result.userAnswer || {})[i] ===
                        formatted.correctAnswersArray[i]
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {Object.values(result.userAnswer || {})[i]}
                    </span>
                  )}
                </span>
              ))}
            </p>

            {!result.isCorrect && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex gap-3 flex-wrap text-grey-500">
                  <span>Your response</span>
                  <span
                    className={`flex items-center ${
                      result.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Correct Answers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formatted.correctAnswersArray.map((answer, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded"
                    >
                      {answer}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Feedback;
