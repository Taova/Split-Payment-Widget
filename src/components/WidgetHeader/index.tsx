interface WidgetHeaderProps {
  onClick: () => void;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({ onClick }) => (
  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
    <span>Págalo en</span>

    <button
      type="button"
      className="text-blue-600 hover:underline focus:outline-none cursor-pointer bg-transparent border-0 p-0"
      onClick={onClick}
    >
      Más info
    </button>
  </div>
);

export default WidgetHeader;
