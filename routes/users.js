const express = require("express")
const router = express.Router()
const { getAllUsers, getUserById, findUsersByEmail, createUser, updateUser, deleteUser } = require("../database/users")
const auth = require("../middleware/auth")
const { UserSchema } = require("../schema/user")
const z = require("zod")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        const user = UserSchema.parse(req.body)
        
        const isEmailAlreadyUsed = await findUsersByEmail(user.email)
        if (isEmailAlreadyUsed)
            return res.status(400).json({
                message: "Email already is being used.",
            })

        const savedUser = await createUser(user)
        delete savedUser.password
        res.status(201).json({
            user: savedUser
        })
        
    } catch (err) {
        if (err instanceof z.ZodError)
            return res.status(422).json({
                message: err.errors,
            })
        res.status(500).json({
            message: "Server error"
        })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await findUsersByEmail(email)
    if (!user) return res.status(401).json({ message: "Not Authorized."})
    
    const isSamePassword = bcrypt.compareSync(password, user.password)
    if (!isSamePassword) return res.status(401).json({ message: "Not Authorized."})

    const token = jwt.sign(
        {
            userId: user.id,
            name: user.name
        },
        process.env.SECRET
    )

    res.json({
        success: true,
        token
    })
})

router.get("/profile", auth, async (req, res) => {
    const user = await getUserById(req.user.userId)
    res.json({
        user
    })
})

module.exports = { router }


