const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      console.log("Auth Header:", authHeader); // Log the auth header
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Please authenticate.' });
      }
  
      const token = authHeader.replace('Bearer ', '');
      console.log("Token:", token); // Log the token
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Log the decoded token
  
      const user = await User.findById(decoded.id);
      console.log("User  Found:", user); // Log the user found
  
      if (!user) {
        return res.status(401).json({ error: 'User  not found.' });
      }
  
      req.user = user; // Attach user object to request
      next();
    } catch (err) {
      console.error("Authentication Error:", err); // Log the error
      res.status(401).json({ error: 'Please authenticate.' });
    }
  };

module.exports = auth;
