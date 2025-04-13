const WordBank = ({ options }) => {
  const { currentQuestionIndex, selectedWords, setSelectedWords } =
    useAppContext();

  const currentSelections = selectedWords[currentQuestionIndex] || {};
  const usedWords = Object.values(currentSelections);

  const handleWordSelect = (word) => {
    const blankId = `blank_${Object.keys(currentSelections).length}`;

    setSelectedWords((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        ...prev[currentQuestionIndex],
        [blankId]: word,
      },
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-medium mb-3">Word Bank:</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <OptionWord
            key={option.id}
            word={option.word}
            disabled={usedWords.includes(option.word)}
            onSelect={() => handleWordSelect(option.word)}
          />
        ))}
      </div>
    </div>
  );
};
