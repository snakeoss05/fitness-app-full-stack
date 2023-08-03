import express from "express";
import UserController from "../controller/UserController.js";
import multer from "multer";
import path from "path";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Destination folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename for the image
  },
});

const upload = multer({ storage });


router.post(
  "/register",
  upload.single("profilePicture"),
  UserController.registerUser
);

router.post("/login", UserController.loginUser);
router.put("/user/:id", UserController.updateUser);
router.put("/userState/:id", UserController.updateUserState);
router.get("/Search/:query", UserController.getClientsByName);
router.get("/profile", UserController.authenticateToken);
router.get("/user", UserController.getUserProfile);
router.get("/clients", UserController.getClients);
router.get("/clients/musculation", UserController.getgpMusculation);
router.delete("/delete/:id", UserController.deleteUser);

export default router;
