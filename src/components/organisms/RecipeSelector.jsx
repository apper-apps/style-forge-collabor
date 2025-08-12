import React, { useEffect, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import RecipeCard from "@/components/molecules/RecipeCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import { getRecipeCategories, getRecipesByCategory } from "@/services/api/recipeService";
import { cn } from "@/utils/cn";

const RecipeSelector = ({ 
  selectedRecipe, 
  onRecipeSelect, 
  className 
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSelector, setShowSelector] = useState(!selectedRecipe);

  const loadCategories = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await getRecipeCategories();
      setCategories(data);
      if (data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0].id);
      }
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const loadRecipes = async (categoryId) => {
    if (!categoryId) return;
    
    setLoading(true);
    setError("");
    
    try {
      const data = await getRecipesByCategory(categoryId);
      setRecipes(data);
    } catch (err) {
      setError(err.message || "Failed to load recipes");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadRecipes(selectedCategory);
    }
  }, [selectedCategory]);

  const handleRecipeSelect = (recipe) => {
    if (recipe.isPremium && !isPremiumUser()) {
      // Trigger premium upgrade flow
      window.open("https://buy.stripe.com/test_premium", "_blank");
      return;
    }
    onRecipeSelect(recipe);
    setShowSelector(false);
  };

  const isPremiumUser = () => {
    // In a real app, this would check authentication and subscription status
    return false;
  };

  if (!showSelector && selectedRecipe) {
    return (
      <div className={cn("bg-white border-b border-gray-200 p-4", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={selectedRecipe.previewImage}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{selectedRecipe.name}</h2>
              <p className="text-sm text-gray-500">{selectedRecipe.category}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowSelector(true)}
            size="sm"
          >
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Change Recipe
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white border-b border-gray-200 p-6", className)}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Recipe</h1>
        <p className="text-gray-600">Select a category and recipe to start designing</p>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Recipes */}
      {loading && <Loading variant="skeleton" />}
      
      {error && (
        <Error 
          message={error} 
          onRetry={() => loadRecipes(selectedCategory)} 
        />
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recipes available in this category</p>
        </div>
      )}

{!loading && !error && recipes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {categories.find(c => c.id === selectedCategory)?.name} Recipes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id || recipe.Id || `recipe-${Math.random()}`}
                recipe={recipe}
                selected={selectedRecipe?.id === recipe.id || selectedRecipe?.Id === recipe.Id}
                onClick={() => handleRecipeSelect(recipe)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSelector;