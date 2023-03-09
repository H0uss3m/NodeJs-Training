const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  const { password, email } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "user created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {};
