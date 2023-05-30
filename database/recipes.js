const prisma = require("./prisma")

const getRecipesByUser = (userId) => {
    return prisma.recipe.findMany({
        where: { userId }
    })
}

const createRecipe = (userId, name, description, preparationTime) => {
    return prisma.recipe.create({
        data: {
            userId,
            name,
            description,
            preparationTime
        }
    })
}

const updateUserRecipe = async (recipeId, name, description, preparationTime, userId) => {
    const recipe = await prisma.recipe.findUnique({
        where: { recipeId },
        select: { userId: true}
    })

    if(!recipe) throw new Error("Recipe not found.")
    if(recipe.userId !== userId) throw new Error("Not Authorized.")

    return prisma.recipe.create({
        where: { id },
        data: {
            name,
            description,
            preparationTime
        }
    })
}

const deleteRecipe = async (userId, recipeId) => {
    const recipe = await prisma.recipe.findUnique({
        where: { recipeId },
        select: { userId: true }
    })
}

if(!recipe) throw new Error("Recipe not found.")
if(recipe.userId !== userId) throw new Error("Not authorized.")

return prisma.recipe.delete({
    where: { id }
})

module.exports = {
    getRecipesByUser,
    createRecipe,
    updateUserRecipe,
    deleteRecipe
}