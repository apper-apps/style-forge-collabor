import { cn } from "@/utils/cn";

const DesignCanvas = ({ 
  composition, 
  selectedColor,
  className 
}) => {
  const renderLayer = (layer, index) => {
    if (!layer || !layer.asset) return null;

    const style = {
      zIndex: layer.displayOrder || index,
      ...(layer.colorizable && selectedColor && {
        filter: `hue-rotate(${getHueFromColor(selectedColor)}deg) saturate(1.2)`
      })
    };

    return (
      <img
        key={`${layer.type}-${layer.asset.id}`}
        src={layer.asset.url}
        alt={layer.asset.name}
        className="absolute inset-0 w-full h-full object-contain canvas-layer"
        style={style}
      />
    );
  };

  const getHueFromColor = (color) => {
    // Simple color to hue mapping - in production this would be more sophisticated
    const colorMap = {
      "#FF006E": 320,
      "#FF3333": 0,
      "#FFB800": 45,
      "#00C896": 160,
      "#0066FF": 220,
      "#8B5CF6": 260,
      "#F97316": 25,
      "#10B981": 150
    };
    return colorMap[color] || 0;
  };

  return (
    <div className={cn(
      "relative w-full h-full bg-white rounded-lg shadow-inner border-2 border-gray-100",
      "flex items-center justify-center overflow-hidden",
      className
    )}>
      <div className="relative w-full h-full max-w-md max-h-[600px] aspect-[3/4]">
        {composition.background && renderLayer(composition.background, 1)}
        {composition.model && renderLayer(composition.model, 2)}
        {composition.hairstyle && renderLayer(composition.hairstyle, 3)}
        {composition.designParts?.map((part, index) => renderLayer(part, 10 + index))}
        {composition.accessories?.map((accessory, index) => renderLayer(accessory, 50 + index))}
        
        {Object.keys(composition).length === 0 && (
          <div className="text-center text-gray-400 p-8">
            <p className="text-lg font-medium mb-2">Your Design Canvas</p>
            <p className="text-sm">Select a recipe and start building your design</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignCanvas;