import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const AssetCard = ({ 
  asset, 
  selected, 
  onClick, 
  disabled = false,
  className 
}) => {
  const { url, name, isPremium } = asset;

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "relative aspect-square bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer group",
        "hover:border-accent hover:shadow-lg hover:scale-102",
        selected && "border-accent shadow-lg ring-2 ring-accent/20",
        disabled && "opacity-50 cursor-not-allowed",
        !selected && !disabled && "border-gray-200",
        className
      )}
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        <img
          src={url}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {selected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
          <ApperIcon name="Check" size={14} className="text-white" />
        </div>
      )}

      {isPremium && (
        <div className="absolute top-2 right-2">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
            <ApperIcon name="Crown" size={10} />
            <span className="font-semibold">PRO</span>
          </div>
        </div>
      )}
      
      {name && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-2 rounded-b-md">
          <p className="text-xs font-medium text-gray-700 truncate">{name}</p>
        </div>
      )}
    </div>
  );
};

export default AssetCard;