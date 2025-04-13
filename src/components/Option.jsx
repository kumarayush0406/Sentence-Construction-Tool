import { useQuiz } from "../context/QuizContext";

const Option = ({ option }) => {
  const { selected, setSelected, currentIndex, questions } = useQuiz();
  const currentQuestion = questions[currentIndex];

  const blankIds = currentQuestion?.blanks?.map((b) => b.id) || [];

  const availableBlank = blankIds.find((id) => !selected[id]);

  const handleClick = () => {
    if (availableBlank) {
      setSelected((prev) => ({
        ...prev,
        [availableBlank]: option,
      }));
    }
  };

  const isUsed = Object.values(selected).includes(option);

  return (
    <button
      onClick={handleClick}
      disabled={!availableBlank || isUsed}
      className={`p-4 rounded-lg text-left transition-all ${
        isUsed
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-blue-50 border border-blue-200 cursor-pointer"
      }`}
    >
      {option}
    </button>
  );
};

export default Option;
