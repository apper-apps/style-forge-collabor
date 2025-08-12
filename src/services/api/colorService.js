import colorPalettes from "@/services/mockData/colorPalettes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getColorPalettes = async () => {
  await delay(200);
  return [...colorPalettes];
};

export const getColorPaletteById = async (id) => {
  await delay(150);
  const palette = colorPalettes.find(p => p.Id === parseInt(id));
  if (!palette) {
    throw new Error("Color palette not found");
  }
  return { ...palette };
};