const { signupValidation, loginValidation } = require('../validation');
const User = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const dotenv = require("dotenv");
const mailgun = require("mailgun-js");

dotenv.config();

const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

const signup = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  try {
    const { error } = signupValidation(req.body);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    if (error) {
      return res.status(400).json({
        error: 'Failed to create new User',
        message: error.details[0].message,
      });
    }
      
    await newUser.save();
      
    return res.status(200).json({
        message: 'Created new User',
        user: newUser,
      });
  } catch (error) {
    throw error;
  }
};

const login = async (req, res) => {
  const { error } = await loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).json({ message: 'Email or Password wrong' });
  }
  try {
    const invalidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!invalidPassword) {
      res.status(400).json({ message: 'Email or Password wrong' });
    }
    res.status(200).json({ message: 'logged in!' });
  } catch (error) {
    throw error;
  }
};

const forgotPassword = (req, res) => {
    const {email} = req.body;

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({error: "User with this email does not exist."});
        }

        const token = jwt.sign(
            {_id: user._id},
            process.env.RESET_PASSWORD_KEY,
            {
                expiresIn: "5h",
            }
        );
        const data = {
            from: 'noreply@thepowerteam.com',
            to: email,
            subject: 'Password reset link',
            html: `<h2>Please click on given link to reset password</h2>
                    <p>${process.env.CLIENT_URI}/resetpassword/${token}</p>`
        };

        return user.updateOne({resetLink: token}, function(err, success) {
            if(err) {
            return res.status(400).json({error: "Reset password link error."});
            } else {
            mg.messages().send(data, function (error, body) {
                if(error) {
                    return res.json({error: err});
                }
                return res.json({message: "Email has been sent. Kindly follow the instructions"});
            });
            }
        });
    });
}

const resetPassword = (req, res) => {
    const {resetLink, newPassword} = req.body;
    if(resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(error, decodedData) {
            if(error) {
            return res.status(401).json({error: "Incorrect token or it is expired."});
            }
            User.findOne({resetLink}, (err, user) => {
                if(err || !user) {
                return res.status(400).json({error: "User with this token does not exist."});
                }

                //encrypt the reset password
                // encryptedUserPassword = bcrypt.hash(newPassword, 10);

                const obj = {
                    password: newPassword,
                    resetLink: ''
                }

                user = _.extend(user, obj);
                user.save((err, result) => {
                    if(err) {
                    return res.status(400).json({error: "Reset password error."});
                    } else {
                        return res.status(200).json({message: "Your password has been changed"});                
                    }
                });
            });
        });
    } else {
        return res.status(401).json({error: "Authentication error!!!."});
    }
}

module.exports = { signup, login, forgotPassword, resetPassword };
