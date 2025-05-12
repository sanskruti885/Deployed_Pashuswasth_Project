import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Register from '../model/RegisterModel.js'

export const registerUser = async (req, res) => {
  try {
    console.log("In register")
    const { name, email, phone, password, location, language } = req.body;

    // Check if user exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new Register({ name, email, phone, password: hashedPassword, location, language });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "User registered successfully!", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
    console.log("inside login")
    try {
      const { email, password, usertype = "Farmer" } = req.body;
      console.log(req.body)
      // Check if user exists in the database
      const user = await Register.findOne({ email,usertype});
  
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT Token
      const token = jwt.sign(
        { id: user._id, email: user.email, usertype: usertype },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Token valid for 7 days
      );
  
      // Send response without the password
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        language: user.language,
        usertype: user.usertype,
        token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


export default {registerUser,login}