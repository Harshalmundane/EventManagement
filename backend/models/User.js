const mongoose = require("mongoose");

const EventUserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["User", "Event Poster"], required: true }, 
    canPostEvents: { type: Boolean, default: false } // Determines if the user can post events
}, { timestamps: true });

module.exports = mongoose.model("User", EventUserSchema);
