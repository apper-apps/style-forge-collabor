import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const TabButton = ({ 
  active, 
  onClick, 
  icon, 
  label, 
  count,
  disabled = false,
  className 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex items-center gap-3 w-full px-4 py-3 text-left transition-all duration-200",
        "border-r-2 border-transparent hover:bg-gray-50",
        active && "bg-white border-r-accent shadow-sm",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <ApperIcon 
        name={icon} 
        size={18} 
        className={cn(
          "text-gray-500 transition-colors",
          active && "text-accent"
        )} 
      />
      <span className={cn(
        "font-medium text-gray-700 transition-colors",
        active && "text-accent"
      )}>
        {label}
      </span>
      {count !== undefined && (
        <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export default TabButton;