const express = require("express")
const z = require("zod")
const router = express.Router()
const auth = require("../middleware/auth")
const { recipeSchema } = require("../schema/recipe")
const { getAllRecipes, getRecipesByUser, createRecipe, deleteRecipe, updateUserRecipe } = require("../database/recipes")

router.get("/recipes", auth, async (req, res) => {
    const recipes = await getRecipesByUser
    res.json({ recipes })
})

router.post("/recipes", auth, async (req, res) => {
    try {
        const recipe = recipeSchema.parse(req.body)
        const userId = req.user.id
        const savedRecipe = await createRecipe(userId, recipe)

        res.status(201).json({
            recipe: savedRecipe
        })

    } catch (err) {
        if (err instanceof z.ZodError)
        return res.status(422).json({
          message: err.errors,
        });
  
      res.status(500).json({ message: "Server error" });
    }
})

router.put("/recipes/:id", auth, async (req, res) => {
    const id = Number(req.params.id)
    const userId = Number(req.user.id)

    try {
        const recipe = recipeSchema.parse(req.body)
        const updatedRecipe = await updateUserRecipe(id, recipe, userId)
        res.json({ updatedRecipe })

    } catch (err) {
        if (err instanceof z.ZodError)
        return res.status(422).json({
          message: err.errors,
        });
  
      res.status(500).json({ message: "Server error" });
    }
})

router.delete("/recipe/:id", auth, async (req, res) => {
    const id = Number(req.params.id)
    const userId = Number(req.user.id)

    try {
        const deletedRecipe = await deleteRecipe(userId, id)
        res.json({ deletedRecipe })

    } catch (err) {
        if (err instanceof z.ZodError)
        return res.status(422).json({
          message: err.errors,
        });
  
      res.status(500).json({ message: "Server error" });
    }
})

module.exports = { router }