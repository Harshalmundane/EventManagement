require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const eventApplicationRoutes=require('./routes/eventApplications')

const app = express();
const port = 3000;
const MONGO_URI = process.env.MONGO_URI; // Load MongoDB URI from .env

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      express.json()(req, res, next);
    } else {
      next();
    }
  });

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", eventRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/event',eventApplicationRoutes)

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
