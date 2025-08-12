import { useState, useEffect } from "react";
import AssetCard from "@/components/molecules/AssetCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { getAssetsByType } from "@/services/api/assetService";

const AssetGrid = ({ 
  activeTab, 
  onAssetSelect, 
  selectedAssets,
  className 
}) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAssets = async () => {
    if (!activeTab) return;
    
    setLoading(true);
    setError("");
    
    try {
      const data = await getAssetsByType(activeTab);
      setAssets(data);
    } catch (err) {
      setError(err.message || "Failed to load assets");
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, [activeTab]);

  const handleAssetClick = (asset) => {
    if (asset.isPremium && !isPremiumUser()) {
      // Trigger premium upgrade flow
      window.open("https://buy.stripe.com/test_premium", "_blank");
      return;
    }
    onAssetSelect(activeTab, asset);
  };

  const isPremiumUser = () => {
    // In a real app, this would check authentication and subscription status
    return false;
  };

  const isSelected = (asset) => {
    return selectedAssets[activeTab]?.id === asset.id;
  };

  if (loading) {
    return <Loading variant="skeleton" className="p-6" />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadAssets} 
        className="p-6" 
      />
    );
  }

  if (assets.length === 0) {
    return (
      <Empty
        title="No assets available"
        description="There are no assets in this category yet."
        icon="Package"
        className="p-6"
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">
          {activeTab.replace(/([A-Z])/g, " $1").trim()}
        </h2>
        <p className="text-sm text-gray-500">
          Choose from {assets.length} available options
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {assets.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            selected={isSelected(asset)}
            onClick={() => handleAssetClick(asset)}
            disabled={asset.isPremium && !isPremiumUser()}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetGrid;