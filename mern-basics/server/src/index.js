require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectToDatabase, disconnectFromDatabase } = require("./db");
const todosRouter = require("./routes/todos");

const app = express();
const port = process.env.PORT || 5050;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todosRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong." });
});

let server;

connectToDatabase()
  .then(({ uri, inMemory }) => {
    console.log(`MongoDB connected (${inMemory ? "in-memory" : "external"})`);
    if (inMemory) {
      console.log(`MongoDB URI: ${uri}`);
    }
    server = app.listen(port, () => {
      console.log(`API running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });

async function shutdown() {
  if (server) {
    server.close();
  }
  await disconnectFromDatabase();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
