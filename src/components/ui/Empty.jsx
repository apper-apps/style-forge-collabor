import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "Nothing here yet",
  description = "Get started by making your first selection",
  action,
  actionLabel,
  icon = "Package",
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center",
      className
    )}>
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={28} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{description}</p>
      {action && actionLabel && (
        <Button onClick={action} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;