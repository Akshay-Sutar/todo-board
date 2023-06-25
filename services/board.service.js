const BoardRepository = require("../repositories/boards.repository");
const { getStringId } = require("../utils/common");

class BoardService {
  constructor() {}

  async createNewBoard({ boardName }) {
    const boardId = getStringId();
    const res = await BoardRepository.createBoard({ boardId, boardName });
    return res[0]["affectedRows"] > 0 ? { boardId, boardName } : null;
  }

  async getBoards({ limit = 10, offset = 0 }) {
    const res = await BoardRepository.getBoards({ limit, offset });

    return res[0].map((board) => ({
      id: board.board_id,
      name: board.board_name,
      tasksCount: board.tasks_count,
    }));
  }

  async createTask({ boardId, taskName, taskDescription }) {
    const taskId = getStringId();
    const res = await BoardRepository.createTask({
      boardId,
      taskName,
      taskDescription,
      taskId,
    });
    return res[0]["affectedRows"] > 0
      ? { taskId, taskName, taskDescription }
      : null;
  }

  async updateTask({ taskId, status }) {
    status = status ? 1 : 0;
    const res = await BoardRepository.updateTask({ taskId, status });
    return res[0]["affectedRows"] > 0 ? { taskId } : null;
  }

  async getTasks({ boardId, limit = 10, offset = 0 }) {
    const res = await BoardRepository.getTasks({ boardId, limit, offset });
    return res[0].map((task) => ({
      id: task.task_id,
      name: task.task_name,
      description: task.task_description,
      boardId: task.board_id,
      done: task.status == 1 ? true : false,
    }));
  }
}

module.exports = new BoardService();
