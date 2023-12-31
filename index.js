const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoutes = require("./routes/comment");

const router = express.Router();
const path = require("path");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.MONGO_URL;

//middleware
app.use(express.json({limit:"10mb"}));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.urlencoded({ limit: '10mb',extended: false }));


app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.get("/", (req, res) => res.send("Hello World"));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoutes);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Backend server is running!${PORT}`);
    })
  )
  .catch((err) => console.log(err));
