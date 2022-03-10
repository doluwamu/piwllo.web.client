import Task from "../../models/taskModel.js";
import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

const editTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const user = req.user;

    const task = await Task.findById(taskId);

    const owner = await User.findById(task.owner);

    if (user.id !== owner.id) {
      return next(new AppError("This task is not yours", 401));
    }

    task.task = req.body.task || task.task;
    task.rank = req.body.rank || task.rank;

    await task.save();

    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

export default editTask;
