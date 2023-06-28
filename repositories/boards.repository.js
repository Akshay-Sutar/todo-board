const dbConnection = require("../utils/database");

class BoardRepository {
  async createBoard({ boardId, boardName }) {
    const query =
      "INSERT INTO `boards` (`board_name`,`board_id`) VALUES (?,?) ";
    const queryParams = [boardName, boardId];
    const res = await dbConnection.execute(query, queryParams);
    dbConnection.releaseConnection();
    return res;
  }

  async getBoards({ limit = 10, offset = 0 }) {
    const query =
      "SELECT *,  (SELECT COUNT(*) from `tasks` where `tasks`.`board_id` = `boards`.`board_id` and `tasks`.`deleted`=0) as tasks_count from `boards` WHERE `deleted` = 0 LIMIT ? OFFSET ?";
    const queryParams = [limit, offset];
    const res = await dbConnection.execute(query, queryParams);
    dbConnection.releaseConnection();
    return res;
  }

  async createTask({ boardId, taskName, taskDescription, taskId }) {
    const query =
      "INSERT INTO `tasks` (`task_name`,`task_description`,`task_id`,`board_id`) VALUES (?,?,?,?)";
    const queryParams = [taskName, taskDescription, taskId, boardId];

    const res = await dbConnection.execute(query, queryParams);
    dbConnection.releaseConnection();
    return res;
  }

  async updateBoard({ boardId, boardName }) {
    const query = "UPDATE `boards` SET `board_name` = ? where `board_id` = ?";
    const queryParams = [boardName, boardId];

    const res = await dbConnection.execute(query, queryParams);
    dbConnection.releaseConnection();
    return res;
  }

  async updateTask({ taskId, status }) {
    const query = "UPDATE `tasks` SET `status` = ? where `task_id` = ?";
    const queryParams = [status, taskId];

    const res = await dbConnection.execute(query, queryParams);
    dbConnection.releaseConnection();
    return res;
  }

  async getTasks({ boardId, limit = 10, offset = 0 }) {
    const query =
      "SELECT * from `tasks` WHERE `deleted` = 0 AND `board_id`= ? LIMIT ? OFFSET ?";

    const queryParams = [boardId, limit, offset];

    const res = await dbConnection.execute(query, queryParams);
    dbConnection.releaseConnection();
    return res;
  }

  async removeTask({ taskId, boardId }) {
    const query =
      "UPDATE `tasks` SET `deleted` = 1 where `task_id` = ? AND `board_id` = ?";
    const queryParams = [taskId, boardId];

    const res = await dbConnection.execute(query, queryParams);
    dbConnection.releaseConnection();
    return res;
  }
}

module.exports = new BoardRepository();
