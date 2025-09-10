import Todo from "../models/todo.model.js";
import { SUCCESS, ERROR, FAIL } from "../utils/HttpsRequests.js";

const GetAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }); // جلب التودوز الخاصة بالمستخدم
    res.status(SUCCESS).json(todos);
  } catch (error) {
    res.status(ERROR).json({ error: error.message });
  }
};



// ! Create new todo

const CreateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
      user: req.user.id, 
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ! Delete todo by ID

const DeleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res
        .status(ERROR)
        .json({ message: "Not authorized to delete this todo" });
    }

    await todo.deleteOne();

    res.status(SUCCESS).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(FAIL).json({ message: "Server error" });
  }
};

const UpdateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res
        .status(ERROR)
        .json({ message: "Not authorized to update this todo" });
    }

    const { title, description } = req.body;
    todo.title = title;
    todo.description = description;

    await todo.save();

    res.status(SUCCESS).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.error(error);
    res.status(FAIL).json({ message: "Server error" });
  }
};

export { GetAllTodos, CreateTodo, DeleteTodo, UpdateTodo };
