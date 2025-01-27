// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { validate } = require("../middlewere/validate");
const { loginSchema } = require("../validation/login.schema");
const { registSchema } = require("../validation/registration.schema");
const prismaDB = new PrismaClient();

const router = express.Router();

router.post("/register", validate(registSchema), async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prismaDB.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with this email is not available",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaDB.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Something went wrong, could not create user",
      });
    }
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prismaDB.user.findFirst({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User Doens't exists" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Wrong Password" });
    }

    const token = jwt.sign({ userId: user.id }, "sla", {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = user;

    res.status(200).json({ success: true, user: rest, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

module.exports = router;
