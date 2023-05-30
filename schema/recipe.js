const z = require("zod")

const recipeSchema = z.object({
    name: z.string({
        required_error: "Invalid name."
    }),
    description: z.string({
        required_error: "Invalid description."
    }),
    preparationTime: z.number({
        required_error: "Invalid preparation time."
    }).min(3)
})

module.exports = { recipeSchema }