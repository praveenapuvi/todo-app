const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let todos = [];
let idCounter = 1;

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: idCounter++, text, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: "Todo deleted" });
});

// Toggle complete
app.put("/todos/:id/toggle", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  res.json({ message: "Todo updated" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
