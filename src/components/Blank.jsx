import { useQuiz } from "../context/QuizContext";

const Blank = ({ blankId }) => {
  const { selected, setSelected } = useQuiz();
  const selectedWord = selected[blankId];

  const handleClick = () => {
    if (selectedWord) {
      const newSelected = { ...selected };
      delete newSelected[blankId];
      setSelected(newSelected);
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`inline-block mx-1 px-3 py-1 rounded-md cursor-pointer transition-colors ${
        selectedWord
          ? "bg-blue-100 text-blue-800 border border-blue-300"
          : "bg-gray-100 text-gray-500 border border-gray-300 hover:bg-gray-200"
      }`}
    >
      {selectedWord || "________"}
    </span>
  );
};

export default Blank;
