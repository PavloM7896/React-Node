import { useEffect, useState } from "react";
import ErrorBanner from "../components/ErrorBanner.jsx";
import TodoForm from "../components/TodoForm.jsx";
import TodoHeader from "../components/TodoHeader.jsx";
import TodoList from "../components/TodoList.jsx";
import TodoFilters from "../components/TodoFilters.jsx";

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api";

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTodos = async (filterValue = filter) => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/todos?filterBy=${filterValue}`);
      if (!response.ok) {
        throw new Error("Failed to load todos.");
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [filter]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    try {
      setError("");
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo.");
      }
      const created = await response.json();
      setTodos((current) => [created, ...current]);
      setText("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  const updateTodo = async (todo) => {
     try {
      setError("");
      const response = await fetch(`${API_URL}/todos/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo.");
      }
      const updated = await response.json();
      setTodos((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      );
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }

  const deleteTodo = async (todoId) => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo.");
      }
      setTodos((current) => current.filter((item) => item._id !== todoId));
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };
  
  const handleFilterChange = (value) => {
    setFilter(value);
    loadTodos(value);
  }

  return (
    <div className="page">
      <main className="panel">
        <TodoHeader count={todos.length} />
        <TodoForm
          text={text}
          onTextChange={setText}
          onSubmit={handleSubmit}
        />
        <TodoFilters onFilter={handleFilterChange}/>
        <ErrorBanner error={error} />
        <TodoList
          loading={loading}
          todos={todos}
          onToggle={updateTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </main>
    </div>
  );
}

export default TodosPage;
