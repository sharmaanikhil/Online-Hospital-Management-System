const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/AuthMiddleware");
const upload = require("../helpers/multer");
const cloudinary = require("../helpers/cloudinary");
const DoctorRequest = require("../models/doctorRequest");

router.post(
  "/doctor-request",
  authMiddleware,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const { specialization, degree, address, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Profile photo is required." });
      }

      const id = req.user.id;
      const user = await User.findById(id);

      const existingRequest = await DoctorRequest.findOne({ userId: user._id });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Your request has already been submitted." });
      }

      const uploadedImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "doctor-profile-photos",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const doctorRequest = new DoctorRequest({
        userId: user._id,
        name: user.name,
        email: user.email,
        specialization,
        degree,
        address,
        description,
        profilePhotoUrl: uploadedImage.secure_url,
      });

      await doctorRequest.save();

      res
        .status(201)
        .json({ message: "Doctor application submitted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

module.exports = router;
