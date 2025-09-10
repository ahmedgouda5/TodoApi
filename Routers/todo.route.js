import express from "express";
import { Router } from "express";
import { GetAllTodos, CreateTodo, DeleteTodo, UpdateTodo } from "../controllers/todo.controller.js";
import verifyToken from "../middlewares/varefiyToken.js";

const todoRouter = Router();

// GET all todos
todoRouter.get("/todos",verifyToken, GetAllTodos);
// POST create new todo
todoRouter.post("/create",verifyToken, CreateTodo);

todoRouter.delete("/delete/:id",verifyToken, DeleteTodo);
todoRouter.patch("/update/:id",verifyToken, UpdateTodo);

export default todoRouter;