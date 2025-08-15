const router = require("express").Router();
const messages = require("../models/messages");

router.post("/send-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if ((!name, !email, !message)) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const msg = new messages({ name, email, message });
    await msg.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
