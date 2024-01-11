const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

router.get("^/$|index(.html)?", (req, res) => {
  res.render("home");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  const existingUser = await Users.findOne({ userName });
  if (existingUser) {
    return res.status(400).send({ error: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ userName, password: hashedPassword });
    await user.save();
  }
  res.redirect('/login')
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await Users.findOne({ userName });
  if (!user) {
    return res.status(400).send({ error: "User does not exist" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).send({ error: "Password is incorrect" });
  }
  res.cookie("token", "my-token", { httpOnly: true });
  res.redirect('/secure')
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
