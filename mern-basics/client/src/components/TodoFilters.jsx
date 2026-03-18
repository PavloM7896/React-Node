function TodoFilters({ onFilter }) {
  return (
    <div className="filters">
      <p>Filters</p>
      <button className="ghost" type="button" onClick={() => onFilter('all')}>
        All
      </button>
      <button className="ghost" type="button" onClick={() => onFilter('open')}>
        Open
      </button>
      <button className="ghost" type="button" onClick={() => onFilter('done')}>
        Done
      </button>
    </div>
  );
}

export default TodoFilters;
