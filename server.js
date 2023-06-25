const express = require("express");
require("dotenv").config();
require("./utils/database");
const config = require("./config");
const boardController = require("./controller/board.controller");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json(config);
});

app.post("/board", boardController.createBoard);
app.get("/boards", boardController.getBoards);
app.post("/task", boardController.createTask);
app.post("/update-task", boardController.updateTask);
app.get("/tasks", boardController.getTasks);

app.listen(config.SERVER_PORT, () => {
  console.log(`Server started at PORT ${config.SERVER_PORT}`);
});