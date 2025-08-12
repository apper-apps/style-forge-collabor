import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const RecipeCard = ({ 
  recipe, 
  selected, 
  onClick, 
  className 
}) => {
  const { name, category, previewImage, isPremium } = recipe;

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer group",
        "hover:border-accent hover:shadow-lg hover:scale-102",
        selected && "border-accent shadow-lg ring-2 ring-accent/20",
        !selected && "border-gray-200",
        className
      )}
    >
      <div className="aspect-[4/3] rounded-t-md overflow-hidden">
        <img
          src={previewImage}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>

      {selected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
          <ApperIcon name="Check" size={14} className="text-white" />
        </div>
      )}

      {isPremium && (
        <div className="absolute top-3 right-3">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
            <ApperIcon name="Crown" size={10} />
            <span className="font-semibold">PRO</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;