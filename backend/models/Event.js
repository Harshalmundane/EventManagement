const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    date: { type: Date, required: true },  // Event Date
    time: { type: String, required: true },  // Event Time (HH:MM format)
    location: { type: String, required: true },  // Event Location
    description: { type: String, required: true },  // Event Description
    organizer: { type: String, required: true },  // Organizer Name
    contact: { type: String, required: true },  // Contact Info (Email or Phone)
    registrationLink: { type: String },  // Optional Registration Link
    remind: { type: Boolean, default: false },  // Reminder Boolean
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
