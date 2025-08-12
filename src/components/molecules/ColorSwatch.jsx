import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ColorSwatch = ({ 
  color, 
  selected, 
  onClick, 
  isPremium = false,
  disabled = false,
  className 
}) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={cn(
        "relative w-10 h-10 rounded-lg transition-all duration-200 group",
        "hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
        selected && "ring-2 ring-accent ring-offset-2 shadow-lg",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div
        className="w-full h-full rounded-lg border-2 border-white shadow-sm"
        style={{ backgroundColor: color }}
      />
      
      {selected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon 
            name="Check" 
            size={16} 
            className="text-white drop-shadow-sm" 
          />
        </div>
      )}

      {isPremium && (
        <div className="absolute -top-1 -right-1">
          <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <ApperIcon name="Crown" size={8} className="text-white" />
          </div>
        </div>
      )}
    </button>
  );
};

export default ColorSwatch;