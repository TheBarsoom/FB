const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail } = require("../helpers/mailer");


exports.register = async(req,res)=>{
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            username,
            bYear,
            bMonth,
            bDay,
            gender,
          } = req.body;

          if (!validateEmail(email)) {
            return res.status(400).json({
              message: "invalid email address",
            });
          }
          const checkUser = await User.findOne({email})
          if(checkUser){
            return res.status(400).json({message:"The email address exists please try with different email address"})

          }

          if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
              message: "first name must between 3 and 30 characters.",
            });
          }
          if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
              message: "last name must between 3 and 30 characters.",
            });
          }
          if (!validateLength(password, 6, 40)) {
            return res.status(400).json({
              message: "password must be atleast 6 characters.",
            });
          }
 
          const cryptedPassword = await bcrypt.hash(password, 12);
          let tempUsername = first_name + last_name;
          let newUsername = await validateUsername(tempUsername);
          const user = await new User({
            first_name,
            last_name,
            email,
            password: cryptedPassword,
            username: newUsername,
            bYear,
            bMonth,
            bDay,
            gender,
          }).save();

          const emailVerificationToken = generateToken(
            { id: user._id.toString() },
            "30m"
          );

          const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`; 
          sendVerificationEmail(user.email, user.first_name, url);
          const token = generateToken({id:user._id.toString()},"7d")
          // res.json(user)
          res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register Success ! please activate your email to start",
          });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}