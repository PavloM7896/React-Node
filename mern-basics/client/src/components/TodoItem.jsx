import { useState } from "react";


function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  return (
    <article className="card" onDoubleClick={() => setIsEditing(true)}>
      <button
        className={`toggle ${todo.done ? "done" : ""}`}
        onClick={() => onUpdate({...todo, done: !todo.done})}
        type="button"
      >
        {todo.done ? "Done" : "Open"}
      </button>
      { !isEditing && <p className={todo.done ? "text done" : "text"}>{todo.text}</p> }
      { isEditing && (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      )}
      { isEditing && (
        <button
          className="btn ghost"
          onClick={() => {
            onUpdate({...todo, text: editText});
            setIsEditing(false);
          }}
        >
          Save
        </button>
      )}
      { !isEditing && <button
          className="ghost"
          type="button"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      }
    </article>
  );
}

export default TodoItem;
