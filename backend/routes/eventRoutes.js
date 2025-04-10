const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Get all events
router.get("/getAll", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single event by ID
router.get("/get/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new event
router.post("/add", async (req, res) => {
    const { title, date, time, location, description, organizer, contact, registrationLink, remind } = req.body;
    
    if (!title || !date || !time || !location || !description || !organizer || !contact) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    const event = new Event({
        title,
        date,
        time,
        location,
        description,
        organizer,
        contact,
        registrationLink,
        remind
    });

    try {
        const newEvent = await event.save();
        console.log("New Event Added:", newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: "Event not found" });

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update an event by ID
router.put("/update/:id", async (req, res) => {
    const { title, date, time, location, description, organizer, contact, registrationLink, remind } = req.body;
    
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Update fields if provided
        event.title = title || event.title;
        event.date = date || event.date;
        event.time = time || event.time;
        event.location = location || event.location;
        event.description = description || event.description;
        event.organizer = organizer || event.organizer;
        event.contact = contact || event.contact;
        event.registrationLink = registrationLink || event.registrationLink;
        event.remind = remind !== undefined ? remind : event.remind;

        await event.save();
        console.log("Event Updated:", event);
        res.json(event);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
