import express from "express";
import UserController from "../controller/UserController.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.put("/user/:id", UserController.updateUser);
router.get("/Search/:query", UserController.getClientsByName);
router.get("/profile", UserController.authenticateToken);
router.get("/user", UserController.getUserProfile);
router.post("/sendmsg", UserController.userSendMsg);
router.get("/clients", UserController.getClients);
router.delete("/delete/:id", UserController.deleteUser);
export default router;
