import React, { useState } from "react";
import "./App.css";
import { FaTasks } from "react-icons/fa"; // FontAwesome icon
export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | done

  const addTask = () => {
    if (task.trim()) {
      setTodos([
        ...todos,
        {
          date: new Date().toLocaleDateString(),
          id: Date.now().toString(),
          text: task.trim(),
          done: false,
        },
      ]);
      setTask(""); // Clear input after adding
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.done;
    return t.done;
  });

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <FaTasks size={30} color="#fff" />
        <h1 className="headerTitle">Todo List</h1>
      </div>

      {/* Input */}
      <div className="inputRow">
        <input
          value={task}
          className="input"
          placeholder="Add a new task"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button className="addButton" onClick={addTask} disabled={!task.trim()}>
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>
          Active
        </button>
        <button onClick={() => setFilter("done")} className={filter === "done" ? "active" : ""}>
          Done
        </button>
      </div>

      {/* Task List */}
      <div className="list">
        {filteredTodos.length === 0 ? (
          <div className="empty">No tasks</div>
        ) : (
          filteredTodos.map((item) => (
            <div className="todoItem" key={item.id}>
              <label className="todoLabel">
                <input type="checkbox" checked={!!item.done} onChange={() => toggleDone(item.id)} />
                <span style={{ textDecoration: item.done ? "line-through" : "none", marginLeft: 8 }}>
                  {item.date} — {item.text}
                </span>
              </label>
              <button className="deleteButton" onClick={() => removeTask(item.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

