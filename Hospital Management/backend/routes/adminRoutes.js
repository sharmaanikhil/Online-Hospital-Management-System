const router = require("express").Router();
const User = require("../models/user");
const Message = require("../models/messages");
const DoctorRequest = require("../models/doctorRequest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/AuthMiddleware");
const upload = require("../helpers/multer");
const cloudinary = require("../helpers/cloudinary");

router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const admin = await User.findOne({ email });
    if (!admin || admin.role !== "admin") {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("vhaToken", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/dashboard-details", authMiddleware, async (req, res) => {
  try {
    const patients = await User.countDocuments({ role: "patient" });
    const doctors = await User.countDocuments({ role: "doctor" });
    const admins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      success: true,
      data: {
        patients,
        doctors,
        admins,
      },
    });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/fetch-messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/fetch-doctors-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await DoctorRequest.find()
      .populate("userId", "email name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching doctor requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/update-doctor-request/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const updatedRequest = await DoctorRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor request not found" });
    }

    const userId = updatedRequest.userId;

    if (status === "Approved") {
     
      await User.findByIdAndUpdate(userId, {
        role: "doctor",
        doctorInfo: {
          specialization: updatedRequest.specialization,
          degree: updatedRequest.degree,
          address: updatedRequest.address,
          description: updatedRequest.description,
          profilePhoto: updatedRequest.profilePhotoUrl,
        },
      });
    } else if (status === "Rejected") {
      
      await User.findByIdAndUpdate(userId, {
        role: "patient",
        doctorInfo: {
          specialization: "",
          degree: "",
          address: "",
          description: "",
          profilePhoto: "",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor request status and user updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
module.exports = router;
