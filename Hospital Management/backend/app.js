const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./conn/conn");
const cookieParser = require("cookie-parser");
const usersAPI = require("./routes/user");
const messagesAPI = require("./routes/messages");
const doctorsAPI = require("./routes/doctor");
const doctorRequestsAPI = require("./routes/doctoreRequest");
const adminAPI = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1", usersAPI);
app.use("/api/v1", messagesAPI);
app.use("/api/v1", doctorsAPI);
app.use("/api/v1", doctorRequestsAPI);
app.use("/api/v1", adminAPI);


const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
