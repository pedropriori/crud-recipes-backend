const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  findUsersByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../database/users");
const auth = require("../middleware/auth");
const { UserSchema, LoginSchema } = require("../schema/user");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const user = UserSchema.parse(req.body);
    const isEmailAlreadyUsed = await findUsersByEmail(user.email);

    if (isEmailAlreadyUsed)
      return res.status(400).json({
        message: "Email already is being used.",
      });

    const savedUser = await createUser(user);
    delete savedUser.password;
    res.status(201).json({
      user: savedUser,
    });
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(422).json({
        message: err.errors,
      });
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = LoginSchema.parse(req.body);
    const user = await findUsersByEmail(data.email);
    if (!user) return res.status(401).json({ message: "Not Authorized." });

    const isSamePassword = bcrypt.compareSync(data.password, user.password);
    if (!isSamePassword)
      return res.status(401).json({ message: "Not Authorized." });

    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
      },
      process.env.SECRET
    );

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(422).json({
        message: err.errors,
      });
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    res.json({
      user,
    });
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(422).json({
        message: err.errors,
      });
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.put("/user/:id", auth, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = UserSchema.parse(req.body);
    const updatedUser = await updateUser(userId, user);
    delete updatedUser.password;
    res.json({ updatedUser });
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(422).json({
        message: err.errors,
      });
      
      res.status(500).json({ message: "Server error" });
  }
});

router.delete("/user/:id", auth, async (req, res) => {
  const id = Number(req.params.id);

  try {
    if(req.user.id !== id) return res.status(401).json({ message: "Not Authorized." });
    const deletedUser = await deleteUser(id);
    delete deleteUser.password;
    res.json({ deletedUser });

  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(422).json({
        message: err.errors,
      });
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { router };
