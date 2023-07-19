import { MongoClient } from "mongodb";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

import ClientCommands from "../Models/FormData.js";
dotenv.config();
const ObjectId = mongodb.ObjectId;
let form;
let ClientList;
export default class FormDAO {
  static async injectDB() {
    if (form) {
      return;
    }
    try {
      const client = await MongoClient.connect(process.env.URI_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      ClientList = client.db("Productlist").collection("ClientList");
      form = client.db("Productlist").collection("historique");
    } catch (e) {
      console.error(`Unable to connect to MongoDB: ${e}`);
    }
  }

  static async addForm(client, updateDate, mois, idClient) {
    const currentTime = new Date();
    try {
      const newClientCommand = {
        finDate: updateDate,
        client: client,
        mois: mois,
        idClient: idClient,
        postDate: currentTime,
      };

      await form.insertOne(newClientCommand);
    } catch (e) {
      console.error(`Unable to post Form ${e}`);
      return { error: e };
    }
  }
  static async getHistorique(page,limit) {
    
      const totalItems = await form.countDocuments(); // Total number of items in the collection
      const totalPages = Math.ceil(totalItems / limit); // Total number of pages
      const startIndex = (page - 1) * limit; // Offset to skip items based on the current page
      const endIndex=page * limit
      const results = {}

      if(endIndex<totalItems){
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if(startIndex>0){
        results.prev={
          page:page-1,
          limit:limit
        }
      }
      try {
        results.results = await form
          .find()
          .sort({ postDate :-1})
          .limit(limit)
          .skip(startIndex)
          .toArray();

        return {
          results,
          currentPage: page,
          totalPages,
          totalItems,
        };
      } catch (e) {
        console.error(`Unable to retrieve client Historique ${e}`);
        return { error: e };
      }
      
      // Prepare and send the response
  
  }
  static async getHistoriqueByName(query) {
    try {
      if (query) {
        const cliente = await form

          .find({
            $or: [
              { "client.lastname": { $regex: query, $options: "i" } },
              { "client.name": { $regex: query, $options: "i" } },
            ],
          })
          .limit(6)
          .toArray();
        return cliente;
      }
    } catch (e) {
      console.error(`Unable to retrieve products with query ${query}: ${e}`);
      return { error: e };
    }
  }
  static async getHistoriqueByid(idClient) {
    try {
      const matchingData = await form.find({ idClient: idClient }).toArray();

      return matchingData;
    } catch (e) {
      console.error(`Unable to retrieve products with query ${idClient}: ${e}`);
      return { error: e };
    }
  }
  static async getClients() {
    try {
      const ClientsList = await ClientList.find().toArray();
      return ClientsList;
    } catch (e) {
      console.error(`Unable to retrieve client commands ${e}`);
      return { error: e };
    }
  }
  static async getClientCommandsbyemail(email) {
    try {
      const clientByemail = await ClientList.find({
        email: email,
      }).toArray();
      return clientByemail;
    } catch (e) {
      console.error(`Unable to retrieve client commands ${e}`);
      return { error: e };
    }
  }
  static async deleteClientCommands(id) {
    try {
      const deletedClient = await ClientList.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });
      return new ClientCommands(deletedClient.value);
    } catch (e) {
      console.error(`Unable to delete client command with id ${id}: ${e}`);
      return { error: e };
    }
  }
}
