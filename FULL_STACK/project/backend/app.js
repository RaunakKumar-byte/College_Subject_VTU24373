import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { protectSocketUser } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => res.redirect("/dashboard"));
app.use("/", authRoutes);
app.use("/", eventRoutes);
app.use("/", bookingRoutes);

let onlineUsers = 0;

io.use((socket, next) => {
  try {
    const tokenHeader = socket.handshake.headers.cookie || "";
    const user = protectSocketUser(tokenHeader);
    socket.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
});

io.on("connection", (socket) => {
  onlineUsers += 1;
  io.emit("online-users", { count: onlineUsers });
  io.emit("user-activity", { message: `${socket.user.username} joined` });

  socket.on("disconnect", () => {
    onlineUsers = Math.max(0, onlineUsers - 1);
    io.emit("online-users", { count: onlineUsers });
    io.emit("user-activity", { message: `${socket.user.username} left` });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});