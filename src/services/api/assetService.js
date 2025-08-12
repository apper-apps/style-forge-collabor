import backgroundAssets from "@/services/mockData/backgroundAssets.json";
import modelAssets from "@/services/mockData/modelAssets.json";
import hairstyleAssets from "@/services/mockData/hairstyleAssets.json";
import shoesAssets from "@/services/mockData/shoesAssets.json";
import jewelryAssets from "@/services/mockData/jewelryAssets.json";
import bagsAssets from "@/services/mockData/bagsAssets.json";
import basesAssets from "@/services/mockData/basesAssets.json";
import sleevesAssets from "@/services/mockData/sleevesAssets.json";
import necklinesAssets from "@/services/mockData/necklinesAssets.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const assetMap = {
  background: backgroundAssets,
  model: modelAssets,
  hairstyle: hairstyleAssets,
  shoes: shoesAssets,
  jewelry: jewelryAssets,
  bags: bagsAssets,
  bases: basesAssets,
  sleeves: sleevesAssets,
  necklines: necklinesAssets
};

export const getAssetsByType = async (type) => {
  await delay(350);
  const assets = assetMap[type] || [];
  return [...assets];
};

export const getAssetById = async (id) => {
  await delay(200);
  
  for (const assets of Object.values(assetMap)) {
    const asset = assets.find(a => a.Id === parseInt(id));
    if (asset) {
      return { ...asset };
    }
  }
  
  throw new Error("Asset not found");
};