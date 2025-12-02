const { useState } = React;

function TodoItem({ todo, toggleComplete, index }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span>{todo.text}</span>
      <button onClick={() => toggleComplete(index)}>
        {todo.completed ? 'Riapri' : 'Completa'}
      </button>
    </li>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { text: 'Esempio: Comprare il pane', completed: false },
    { text: 'Esempio: Inviare l\'email', completed: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue.trim(), completed: false }]);
      setInputValue('');
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>ToDone - Zero Cost</h1>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Aggiungi una nuova attività"
        />
        <button onClick={addTodo}>Aggiungi</button>
      </div>
      
      <div className="filter-area">
        <button className={filter === 'all' ? 'active-filter' : ''} onClick={() => setFilter('all')}>Tutte</button>
        <button className={filter === 'active' ? 'active-filter' : ''} onClick={() => setFilter('active')}>Da Fare</button>
        <button className={filter === 'completed' ? 'active-filter' : ''} onClick={() => setFilter('completed')}>Completate</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <TodoItem key={index} todo={todo} toggleComplete={toggleComplete} index={index} />
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
