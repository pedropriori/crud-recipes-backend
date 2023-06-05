const prisma = require("./prisma");

const getAllRecipes = () => {
  return prisma.recipe.findMany();
};

const getRecipesByUser = (userId) => {
  return prisma.recipe.findMany({
    where: { userId },
  });
};

const createRecipe = (userId, recipe) => {
  return prisma.recipe.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      name: recipe.name,
      description: recipe.description,
      preparationTime: recipe.preparationTime,
    },
  });
};

const updateUserRecipe = (recipeId, recipes, userId) => {
  const recipe = prisma.recipe.findUnique({
    where: { id: recipeId },
    data: { recipe },
  });

  if (!recipe) throw new Error("Recipe not found.");
  if (recipe.userId !== userId) throw new Error("Not Authorized.");

  return prisma.recipe.create({
    where: { id },
    data: {
      name,
      description,
      preparationTime,
    },
  });
};

const deleteRecipe = async (userId, recipeId) => {
  const recipe = await prisma.recipe.findUnique({
    where: { recipeId },
    select: { userId: true },
  });

  if (!recipe) throw new Error("Recipe not found.");
  if (recipe.userId !== userId) throw new Error("Not authorized.");

  return prisma.recipe.delete({
    where: { id },
  });
};

module.exports = {
  getAllRecipes,
  getRecipesByUser,
  createRecipe,
  updateUserRecipe,
  deleteRecipe,
};
