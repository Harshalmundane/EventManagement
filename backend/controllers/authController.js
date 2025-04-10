const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    console.log("📥 Register request received:", req.body); // Log request body

    try {
        const { username, email, password, phone, role } = req.body;

        if (!username || !email || !password || !phone || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate role
        if (!["User", "Event Poster"].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Choose 'User' or 'Event Poster'." });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Determine if the user can post events
        const canPostEvents = role === "Event Poster";

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Save hashed password
            phone,
            role,
            canPostEvents
        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ User registered successfully:", newUser);
        res.status(201).json({
            message: "User registered successfully!",
            user: newUser,
            token // Return token for automatic login
        });

    } catch (error) {
        console.error("❌ Registration Error:", error); // Log full error
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      const safeUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        canPostEvents: user.canPostEvents,
      };
  
      res.json({
        message: "Login successful!",
        token,         // ✅ token sent here
        user: safeUser
      });
  
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  };
  
// Logout function (Frontend handles token removal)
exports.logout = (req, res) => {
    res.json({ message: "User logged out successfully" });
};
