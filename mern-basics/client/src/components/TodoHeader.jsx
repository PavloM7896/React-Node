function TodoHeader({ count }) {
  return (
    <header className="panel__header">
      <div>
        <p className="eyebrow">MERN Starter</p>
        <h1>Build a tiny todo API + UI</h1>
        <p className="subtitle">
          React talks to Express, Express talks to MongoDB. You can swap the
          in-memory DB for a real one when you are ready.
        </p>
      </div>
      <div className="stat">
        <span className="stat__label">Todos</span>
        <span className="stat__value">{count}</span>
      </div>
    </header>
  );
}

export default TodoHeader;
