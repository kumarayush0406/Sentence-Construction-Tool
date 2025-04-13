const Progress = ({ total, current }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Progress</span>
        <span className="font-semibold text-blue-600">
          {current} / {total}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
