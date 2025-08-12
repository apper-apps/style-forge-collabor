import { useState } from "react";
import { cn } from "@/utils/cn";
import TabButton from "@/components/molecules/TabButton";
import ApperIcon from "@/components/ApperIcon";

const TabNavigation = ({ 
  activeTab, 
  onTabChange, 
  selectedRecipe, 
  isCollapsed, 
  onToggleCollapsed,
  className 
}) => {
  const baseTabs = [
    { id: "background", label: "Background", icon: "Image", count: 12 },
    { id: "model", label: "Model", icon: "User", count: 8 },
    { id: "hairstyle", label: "Hairstyle", icon: "Scissors", count: 15 }
  ];

  const accessoryTabs = [
    { id: "shoes", label: "Shoes", icon: "ShoppingBag", count: 24 },
    { id: "jewelry", label: "Jewelry", icon: "Diamond", count: 18 },
    { id: "bags", label: "Bags", icon: "Briefcase", count: 16 }
  ];

  const designTabs = selectedRecipe?.designParts?.map(part => ({
    id: part.id,
    label: part.name,
    icon: "Layers",
    count: part.assetCount || 0
  })) || [];

  const handleTabClick = (tabId) => {
    if (isCollapsed) {
      onToggleCollapsed();
    }
    onTabChange(tabId);
  };

  return (
    <div className={cn(
      "flex flex-col bg-secondary border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Collapse Toggle */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onToggleCollapsed}
          className="w-full flex items-center justify-between text-gray-600 hover:text-gray-900 transition-colors"
        >
          {!isCollapsed && <span className="font-medium text-sm">Design Tools</span>}
          <ApperIcon 
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
            size={18} 
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Base Tabs */}
        <div className={cn("py-2", !isCollapsed && "px-2")}>
          {!isCollapsed && (
            <div className="px-2 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Basics</h3>
            </div>
          )}
          {baseTabs.map(tab => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
              icon={tab.icon}
              label={isCollapsed ? "" : tab.label}
              count={isCollapsed ? undefined : tab.count}
              className={isCollapsed ? "px-4 justify-center" : ""}
            />
          ))}
        </div>

        {/* Accessories */}
        <div className={cn("py-2", !isCollapsed && "px-2")}>
          {!isCollapsed && (
            <div className="px-2 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Accessories</h3>
            </div>
          )}
          {accessoryTabs.map(tab => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
              icon={tab.icon}
              label={isCollapsed ? "" : tab.label}
              count={isCollapsed ? undefined : tab.count}
              className={isCollapsed ? "px-4 justify-center" : ""}
            />
          ))}
        </div>

        {/* Design Parts */}
        {designTabs.length > 0 && (
          <div className={cn("py-2", !isCollapsed && "px-2")}>
            {!isCollapsed && (
              <div className="px-2 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Design</h3>
              </div>
            )}
            {designTabs.map(tab => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => handleTabClick(tab.id)}
                icon={tab.icon}
                label={isCollapsed ? "" : tab.label}
                count={isCollapsed ? undefined : tab.count}
                className={isCollapsed ? "px-4 justify-center" : ""}
              />
            ))}
          </div>
        )}
      </div>

      {/* Color Palette Section */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Colors</h3>
          <div className="grid grid-cols-6 gap-2">
            {["#FF006E", "#FF3333", "#FFB800", "#00C896", "#0066FF", "#8B5CF6"].map(color => (
              <div
                key={color}
                className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabNavigation;