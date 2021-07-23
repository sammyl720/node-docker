const User = require('../models/userModel');
const bcryptj = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcryptj.hash(password, 12);
    const newUser = await User.create({ username, password:hashedPassword });
    req.session.user = newUser;
    res.status(201).json({
      status: 201,
      data: {
        newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: {
        message: err.message
      }
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const isValid = await bcryptj.compare(password, user.password);
      if (isValid) {
        req.session.user = user;
        res.status(200).json({
          status: 200,
          data: {
            user
          }
        });
      } else {
        res.status(401).json({
          status: 401,
          data: {
            message: 'Invalid username or password'
          }
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        data: {
          message: 'Invalid username or password'
        }
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: {
        message: err.message
      }
    });
  }
}