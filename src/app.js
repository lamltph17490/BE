import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { readdirSync } from "fs";
import Notification from "./models/notification";
require("dotenv").config();

import http from "http";
import { Server } from "socket.io";
import { getUserListNotification, newNotification } from "./controllers/notification";
// import { newNotification, getUserListNotification } from './notification.js';
import {
    addNewUser,
    onlineUsers,
    getUser,
    removeUser,
  } from "./utils/socket.js"
const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET"],
  },
});
io.on("connection", async (socket) => {
  socket.on("newUser", async (token) => {
    if (token) {
        const id = token;
        addNewUser(id, socket.id);
        console.log("Danh sách user :", onlineUsers);
        const user = getUser(id);
      
        if (user) {
          const userList = await getUserListNotification(id);
          io.to(user.socketId).emit("userListNotification", userList);
        }
    } else {
      return new Error("Authentication error");
    }
  })
  socket.on("newNotification", async (data) => {
      const notification = {
          orderId: data.orderId,
          text: data.text,
          userId: data.userId,
        };
        const response = await newNotification(notification);
        const sendNotification = await Notification.findOne({
          _id: response._id,
        }).exec();
        const receiver = getUser(data.userId);
        if (receiver) {
          io.to(receiver.socketId).emit("newNotification", sendNotification);
          const userList = await getUserListNotification(data.userId);
          io.to(receiver.socketId).emit("userListNotification", userList);
        }})
        socket.on("disconnect", (reason) => {
          removeUser(socket.id);
        });
})
// middleware
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// autoload route
readdirSync("./src/routes").forEach((route) => {
  app.use("/api", require(`./routes/${route}`));
});

// connect db
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connect successfully"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log("Server is running on port", PORT));
