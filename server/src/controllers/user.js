const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateEmail, validateLength } = require("../helpers/validation");


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
       
          const user = await new User({
            first_name,
            last_name,
            email,
            password: cryptedPassword,
            username,
            bYear,
            bMonth,
            bDay,
            gender,
          }).save();

          res.json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}