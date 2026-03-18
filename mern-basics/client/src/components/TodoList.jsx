import TodoItem from "./TodoItem.jsx";

function TodoList({ loading, todos, onDelete, onUpdate }) {
  return (
    <section className="list">
      {loading ? <p className="muted">Loading...</p> : null}
      {!loading && todos.length === 0 ? (
        <p className="muted">No todos yet. Add one above.</p>
      ) : null}
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </section>
  );
}

export default TodoList;
