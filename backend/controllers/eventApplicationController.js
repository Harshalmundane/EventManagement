const EventApplication = require("../models/EventApplication");
const User = require("../models/User"); // Ensure this path is correct


const applyToEvent = async (req, res) => {
  try {
    const { eventId, phone, message } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const application = new EventApplication({
      user: req.user.id,
      event: eventId,
      name: user.name,               // make sure this exists
      eventName: event.title,        // use correct field name
      email: user.email,
      address: user.address,
      phone,
      message,
    });

    await application.save();

    res.status(201).json({ message: "Applied successfully!" });
  } catch (error) {
    console.error("Application Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const getApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await EventApplication.find({ user: userId })
      .populate('user', 'username')      // populate 'username' from User model
      .populate('event', 'title');       // populate 'title' from Event model

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Export both controllers
module.exports = {
  applyToEvent,
  getApplications,
};
