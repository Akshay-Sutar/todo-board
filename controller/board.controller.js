const BoardService = require("../services/board.service");

class BoardController {
  constructor() {
    this.createBoard = this.createBoard.bind(this);
  }
  async createBoard(req, res) {
    const { boardName } = req.body;

    try {
      const board = await BoardService.createNewBoard({ boardName });
      return res.json(board);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong!", err });
    }
  }

  async getBoards(req, res) {
    const { limit, offset } = req.body;

    try {
      const boards = await BoardService.getBoards({ limit, offset });
      return res.json(boards);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
  }

  async createTask(req, res) {
    const { boardId, taskName, taskDescription } = req.body;
    try {
      const task = await BoardService.createTask({
        boardId,
        taskName,
        taskDescription,
      });
      return res.json(task);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
  }
  async updateTask(req, res) {
    const { taskId, status } = req.body;
    try {
      const task = await BoardService.updateTask({ taskId, status });
      return res.json(task);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
  }
  async getTasks(req, res) {
    const { boardId } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    try {
      const tasks = await BoardService.getTasks({
        boardId,
        limit,
        offset,
      });
      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong!" });
    }
  }
}

module.exports = new BoardController();
