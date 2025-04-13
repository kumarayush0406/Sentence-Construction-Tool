import Blank from "./Blank";

const Question = ({ question }) => {
  const parts = question.split(/(_____________)/g);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Select the missing words in the correct order
      </h2>
      <div className="text-lg leading-relaxed">
        {parts.map((part, index) =>
          part === "_____________" ? (
            <Blank key={index} blankId={`blank_${Math.floor(index / 2)}`} />
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </div>
    </div>
  );
};

export default Question;
