function TodoForm({ text, onTextChange, onSubmit }) {
  return (
    <form className="composer" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Add a todo you want to learn next..."
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
