import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  // Load todos when the app starts
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!text.trim()) return;

    axios.post('http://localhost:5000/api/todos', { text })
      .then(res => {
        setTodos([...todos, res.data]);
        setText('');
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>📝 My Todo List</h2>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a todo..."
      />
      <button onClick={addTodo} style={{ marginLeft: '10px' }}>Add</button>

      <ul style={{ marginTop: '20px' }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginBottom: '10px' }}>
            {todo.text}
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
