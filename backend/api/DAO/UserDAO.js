import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import mongodb from "mongodb";
import mongoose from "mongoose";
import User from "../Models/Userschema.js";
import bcrypt from "bcrypt";

const ObjectId = mongodb.ObjectId;
dotenv.config();
let connection;

export default class UserDao {
  static async injectDB() {
    if (connection) {
      return;
    }

    try {
      const client = await MongoClient.connect(process.env.URI_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      connection = client.db("Productlist").collection("ClientList");

      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error(`Unable to connect to MongoDB: ${error}`);
    }
  }

  static async registerUser(
    name,
    lastname,
    address,
    startdate,
    finDate,
    phonenumber,
    musculation,
    boxe,
    hashedPassword,
    cardio,
    taekwondo
  ) {
    try {
      const existingUser = await connection.findOne({
        phonenumber: phonenumber,
      });
      if (existingUser) {
        return { error: "User already exists" };
      }

      const newUser = new User({
        name: name,
        lastname: lastname,
        address: address,
        startdate: startdate,
        finDate: finDate,
        phonenumber: phonenumber,
        musculation: musculation,
        boxe: boxe,
        hashedPassword: hashedPassword,
        cardio: cardio,
        taekwondo: taekwondo,
      });

      const savedUser = await connection.insertOne(newUser);

      return { user: savedUser };
    } catch (error) {
      console.log(error);
      return { error: "Server error" };
    }
  }

  static async loginUser(phonenumber) {
    try {
      const user = await connection.findOne({ phonenumber: phonenumber });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getClientse(page, limit) {
    const totalItems = await connection.countDocuments(); // Total number of items in the collection
    const totalPages = Math.ceil(totalItems / limit); // Total number of pages
    const startIndex = (page - 1) * limit; // Offset to skip items based on the current page
    const endIndex = page * limit;
    const results = {};

    if (endIndex < totalItems) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await connection
        .find()
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
  }
  static async deleteUserDao(id) {
    try {
      const deletedClient = await connection.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
      });
      return new ClientCommands(deletedClient.value);
    } catch (e) {
      console.error(`Unable to delete client command with id ${id}: ${e}`);
      return { error: e };
    }
  }
  static async getClientByName(query) {
    try {
      if (query) {
        const cliente = await connection
          .find({
            $or: [
              { name: { $regex: query, $options: "i" } },
              { lastname: { $regex: query, $options: "i" } },
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
  static async updateUserProfile(id, updateDate) {
    try {
      const updatedUser = await connection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { finDate: updateDate } }, // Enclose field name in quotes
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async findUserById(id) {
    try {
      const user = await connection.findOne(
        { _id: new ObjectId(id) },
        { maxTimeMS: 30000 }
      );

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
