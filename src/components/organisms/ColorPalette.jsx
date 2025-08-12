import { useState, useEffect } from "react";
import ColorSwatch from "@/components/molecules/ColorSwatch";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { cn } from "@/utils/cn";
import { getColorPalettes } from "@/services/api/colorService";

const ColorPalette = ({ 
  selectedColor, 
  onColorSelect, 
  className 
}) => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPalettes = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await getColorPalettes();
      setPalettes(data);
    } catch (err) {
      setError(err.message || "Failed to load color palettes");
      setPalettes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPalettes();
  }, []);

  const handleColorClick = (color, isPremium) => {
    if (isPremium && !isPremiumUser()) {
      // Trigger premium upgrade flow
      window.open("https://buy.stripe.com/test_premium", "_blank");
      return;
    }
    onColorSelect(color);
  };

  const isPremiumUser = () => {
    // In a real app, this would check authentication and subscription status
    return false;
  };

  if (loading) {
    return (
      <div className={cn("bg-white border-t border-gray-200 p-4", className)}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("bg-white border-t border-gray-200 p-4", className)}>
        <Error message={error} onRetry={loadPalettes} />
      </div>
    );
  }

  return (
    <div className={cn("bg-white border-t border-gray-200 p-4", className)}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Color Palette</h3>
        <p className="text-xs text-gray-500">Apply colors to colorizable design parts</p>
      </div>

      <div className="space-y-4">
        {palettes.map(palette => (
          <div key={palette.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-medium text-gray-600">{palette.name}</h4>
              {palette.isPremium && (
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="font-semibold">PRO</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {palette.colors.map(color => (
                <ColorSwatch
                  key={`${palette.id}-${color}`}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => handleColorClick(color, palette.isPremium)}
                  isPremium={palette.isPremium}
                  disabled={palette.isPremium && !isPremiumUser()}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {selectedColor && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="text-xs font-medium text-gray-700">
              Selected: {selectedColor}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;