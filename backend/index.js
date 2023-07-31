import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import FormDAO from "./api/DAO/FormDAO.js";
import UserDao from "./api/DAO/UserDAO.js";
import multer from "multer";
import path from "path"
dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename for the image
  },
});


MongoClient.connect(process.env.URI_PRODUCT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})



  .catch((err) => console.log("MongoDB connection error", err))
  .then(async (client) => {
    await FormDAO.injectDB(client);
    await UserDao.injectDB(client);
    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  });
