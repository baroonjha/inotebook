const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//create a user using :POST "/api/auth"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors ,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user email already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with thie email already exist" });
      }
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date,
      });
      res.json(user);
      //sending error message
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured")
    }
  }
);

module.exports = router;
