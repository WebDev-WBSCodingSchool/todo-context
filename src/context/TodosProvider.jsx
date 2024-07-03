import { createContext, useState } from 'react';

export const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [filter, setFilter] = useState('all');

  const toggleTodo = id => {
    setTodos(prevTodos => {
      const newState = prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <TodosContext.Provider value={{ todos, setTodos, filter, setFilter, toggleTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
