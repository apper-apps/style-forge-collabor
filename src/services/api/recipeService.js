import recipeCategories from "@/services/mockData/recipeCategories.json";
import recipes from "@/services/mockData/recipes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getRecipeCategories = async () => {
  await delay(300);
  return [...recipeCategories];
};

export const getRecipesByCategory = async (categoryId) => {
  await delay(400);
  const filteredRecipes = recipes.filter(recipe => recipe.categoryId === categoryId);
  return [...filteredRecipes];
};

export const getRecipeById = async (id) => {
  await delay(200);
  const recipe = recipes.find(r => r.Id === parseInt(id));
  if (!recipe) {
    throw new Error("Recipe not found");
  }
  return { ...recipe };
};