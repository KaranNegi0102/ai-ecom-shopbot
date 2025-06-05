const ResetButton = ({ onReset }: { onReset: () => void }) => {
  return (
    <button
      onClick={onReset}
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      Reset Chat
    </button>
  );
};

export default ResetButton;