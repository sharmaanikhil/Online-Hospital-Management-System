const router = require("express").Router();
const User = require("../models/user");
const Appointment = require("../models/appointment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/AuthMiddleware");
const upload = require("../helpers/multer");
const cloudinary = require("../helpers/cloudinary");

router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password, gender, contact } = req.body;
    if (!name || !email || !password || !gender || !contact) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (contact.length < 10) {
      return res.status(400).json({ error: "Number must be of 10 digits" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      gender,
      contact,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.role === "admin") {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("vhaToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    const { password: pwd, ...safeUser } = user._doc;

    if (safeUser.role !== "doctor") {
      safeUser.doctorInfo = null;
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    const { password, ...safeUser } = user._doc;

    return res.status(200).json({
      user: {
        ...safeUser,
        doctorInfo: user.role === "doctor" ? user.doctorInfo : null,
      },
    });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/reset-password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/logout", authMiddleware, (req, res) => {
  res.clearCookie("vhaToken", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out successfully" });
});


router.post(
  "/upload-report",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(req.file.buffer);
      });
      await User.findByIdAndUpdate(req.user.id, {
        patientReport: result.secure_url,
      });
      res
        .status(201)
        .json({ success: "Report updated", patientReport: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload" });
    }
  }
);


router.get("/my-appointments", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({ patient: userId })
      .populate("doctor")
      .select("-password")
      .lean();
    appointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    res.status(200).json({ message: "success", appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});



router.get("/get-openRouter-key", authMiddleware, async (req, res) => {
  const key = process.env.OPENROUTER_API_KEY;
  res.status(200).json({ key });
});
module.exports = router;
