const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

// creating a post request for
router.post('/register', async (req, res) => {
  try {
    const userExist = await UserModel.findOne({ email: req.body.email });

    if (userExist) {
      res.send({ message: 'Email already exists', error: true }).status(422);
      return;
    }
    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      date: req.body.date,
    });

    const salt = await bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    user
      .save()
      .then((response) => {
        res.send(response);
      })
      .catch((err) => res.send({ error: true, message: err.message }).status(400));
  } catch (error) {
    res.send({ error: true, message: err.message }).status(400);
  }
});

// creating a POST request for login
router.post('/login', async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    res.send({ message: 'Invalid Email Or Password', error: true }).status(422);
    return;
  }
  const compare = await bcrypt.compare(req.body.password, user.password);
  if (compare) {
    const token = await user.generateAuthToken();

    res.send({ token: token }).status(201);
  } else {
    res.send({ message: 'Invalid Email or password', error: true }).status(422);
  }
});

module.exports = router;
