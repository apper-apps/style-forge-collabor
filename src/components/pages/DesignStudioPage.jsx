import { useState } from "react";
import { toast } from "react-toastify";
import DesignCanvas from "@/components/organisms/DesignCanvas";
import TabNavigation from "@/components/organisms/TabNavigation";
import AssetGrid from "@/components/organisms/AssetGrid";
import RecipeSelector from "@/components/organisms/RecipeSelector";
import ColorPalette from "@/components/organisms/ColorPalette";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DesignStudioPage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("background");
  const [composition, setComposition] = useState({});
  const [selectedAssets, setSelectedAssets] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setComposition({});
    setSelectedAssets({});
    setActiveTab("background");
    toast.success(`Selected recipe: ${recipe.name}`);
  };

  const handleAssetSelect = (tabId, asset) => {
    const updatedAssets = { ...selectedAssets, [tabId]: asset };
    setSelectedAssets(updatedAssets);

    // Update composition
    const newComposition = { ...composition };
    
    switch (tabId) {
      case "background":
        newComposition.background = { 
          type: "background", 
          asset, 
          displayOrder: 1,
          colorizable: false 
        };
        break;
      case "model":
        newComposition.model = { 
          type: "model", 
          asset, 
          displayOrder: 2,
          colorizable: false 
        };
        break;
      case "hairstyle":
        newComposition.hairstyle = { 
          type: "hairstyle", 
          asset, 
          displayOrder: 3,
          colorizable: false 
        };
        break;
      case "shoes":
      case "jewelry":
      case "bags":
        if (!newComposition.accessories) {
          newComposition.accessories = [];
        }
        // Remove existing accessory of same type
        newComposition.accessories = newComposition.accessories.filter(
          acc => acc.type !== tabId
        );
        // Add new accessory
        newComposition.accessories.push({
          type: tabId,
          asset,
          displayOrder: 50,
          colorizable: false
        });
        break;
      default:
        // Design parts
        if (!newComposition.designParts) {
          newComposition.designParts = [];
        }
        // Remove existing design part of same type
        newComposition.designParts = newComposition.designParts.filter(
          part => part.type !== tabId
        );
        // Add new design part
        newComposition.designParts.push({
          type: tabId,
          asset,
          displayOrder: 10,
          colorizable: true
        });
        break;
    }

    setComposition(newComposition);
    toast.success(`Selected ${asset.name}`);
    
    // Close mobile nav after selection
    setIsMobileNavOpen(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    toast.success(`Applied color: ${color}`);
  };

  const handleExportDesign = () => {
    // In a real app, this would export/save the design
    toast.success("Design exported successfully!");
  };

  const handleSaveDesign = () => {
    // In a real app, this would save to user's account
    toast.success("Design saved to your collection!");
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Recipe Selector */}
      <RecipeSelector
        selectedRecipe={selectedRecipe}
        onRecipeSelect={handleRecipeSelect}
      />

      {selectedRecipe && (
        <>
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h1 className="font-semibold text-gray-900">Design Studio</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleExportDesign}>
                <ApperIcon name="Download" size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleMobileNav}>
                <ApperIcon name="Menu" size={18} />
              </Button>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                selectedRecipe={selectedRecipe}
                isCollapsed={isNavigationCollapsed}
                onToggleCollapsed={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
              />
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileNavOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setIsMobileNavOpen(false)}
                />
                <div className="relative bg-white w-80 max-w-[85vw] shadow-2xl">
                  <TabNavigation
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                      setActiveTab(tab);
                      setIsMobileNavOpen(false);
                    }}
                    selectedRecipe={selectedRecipe}
                    isCollapsed={false}
                    onToggleCollapsed={() => {}}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {/* Asset Panel */}
              <div className={cn(
                "bg-white border-r border-gray-200 overflow-y-auto",
                "w-full lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
              )}>
                <AssetGrid
                  activeTab={activeTab}
                  onAssetSelect={handleAssetSelect}
                  selectedAssets={selectedAssets}
                />
              </div>

              {/* Canvas and Controls */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Canvas */}
                <div className="flex-1 p-6 lg:p-8">
                  <div className="h-full min-h-[400px] lg:min-h-[600px]">
                    <DesignCanvas
                      composition={composition}
                      selectedColor={selectedColor}
                      className="h-full"
                    />
                  </div>
                </div>

                {/* Desktop Action Bar */}
                <div className="hidden lg:flex items-center justify-between p-6 bg-white border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      {Object.keys(composition).length} layers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={handleSaveDesign}>
                      <ApperIcon name="Save" size={16} className="mr-2" />
                      Save Design
                    </Button>
                    <Button variant="primary" onClick={handleExportDesign}>
                      <ApperIcon name="Download" size={16} className="mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <ColorPalette
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
          />

          {/* Mobile Action Bar */}
          <div className="lg:hidden bg-white border-t border-gray-200 p-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {Object.keys(composition).length} layers
            </span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={handleSaveDesign}>
                <ApperIcon name="Save" size={14} className="mr-1" />
                Save
              </Button>
              <Button variant="primary" size="sm" onClick={handleExportDesign}>
                <ApperIcon name="Download" size={14} className="mr-1" />
                Export
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DesignStudioPage;