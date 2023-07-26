import FormDAO from "../DAO/FormDAO.js";

export default class FormController {
  static async apipostform(req, res) {
    const { client, updateDate, mois, idClient } = req.body;

    try {
      const newFormData = await FormDAO.addForm(
        client,
        updateDate,
        mois,
        idClient
      );
      res.status(201).json({ message: "client saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getClientCommands(req, res) {
    try {
      const clientCommands = await FormDAO.getClientCommands();
      res.json({ clientCommands });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getHistorique(req, res) {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 1;
    try {
      const items = await FormDAO.getHistorique(page, limit);
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getHistoriqueByName(req, res) {
    const query = req.params.query;
    try {
      const cliente = await FormDAO.getHistoriqueByName(query);

      res.json(cliente);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
  static async getHistoriqueByid(req, res) {
    try {
      const { idClient } = req.params;
      const mylist = await FormDAO.getHistoriqueByid(idClient);

      res.json(mylist);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async getClientCommandsByEmail(req, res) {
    try {
      const { email } = req.params;
      const clientCommands = await FormDAO.getClientCommandsbyemail(email);
      res.json({ clientCommands });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async AddSchedule(req, res) {
    const { day, time, coach, cour } = req.body;

    try {
      const newFormData = await FormDAO.addSchedule(day, time, coach, cour);
      res.json({ newFormData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getSchedule(req, res) {
    try {
      const newFormData = await FormDAO.getSchedule();
      res.json({ newFormData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async deleteschedule(req, res) {
    const { id } = req.params;

    try {
      const scheduleDelete = await FormDAO.deleteSchedule(id);
      res.status(200).json(scheduleDelete);
    } catch (e) {
      console.error(`Unable to delete schedule with id ${id}: ${e}`);
      res.status(500).send({ error: e });
    }
  }
}
