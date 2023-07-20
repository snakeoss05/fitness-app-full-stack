import express from "express";
import FormController from "../controller/formController.js";

const router = express.Router();

router.route("/post").post(FormController.apipostform);
router.get("/clientCommands", FormController.getClientCommands);
router.get("/historique", FormController.getHistorique);
router.get("/clientCommandst/:email", FormController.getClientCommandsByEmail);
router.get("/filterhistorique/:query", FormController.getHistoriqueByName);

router.get("/gethistorique/:idClient", FormController.getHistoriqueByid);
export default router;
