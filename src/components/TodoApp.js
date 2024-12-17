import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios'; // Import Axios
import '../style.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todo/todos'); // Backend URL for fetching tasks
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to add a new task to the backend and state
  const addTask = async (task) => {
    if (task.trim() === '') {
      alert('Error! You must write something.');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/todo/todos', { text: task });
        setTasks([...tasks, response.data]); // Add new task to the state
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Function to toggle the task's checked status
  const toggleTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/todo/todos/${id}`); // Add '/' before the id
      setTasks(tasks.map((task) =>
        task._id === id ? { ...task, checked: response.data.checked } : task
      ));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // Function to delete a task from the backend and state
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/todos/${id}`); // Add '/' before the id
      setTasks(tasks.filter((task) => task._id !== id)); // Remove deleted task from the state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="todo">
      <h2>
        <img src={require('../assets/icon.png')} alt="icon" className="heading-icon" />
        My Todo List
      </h2>
      <div className="bar">
        <input
          type="text"
          id="input-bar"
          placeholder="Add a new task"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button onClick={() => {
          const input = document.getElementById('input-bar');
          addTask(input.value);
          input.value = '';
        }}>
          + Add
        </button>
      </div>
      <ul id="list-container">
        {tasks.map((task) => (
          <TodoItem
            key={task._id} // Use the unique task ID for the key
            task={task}
            toggleTask={() => toggleTask(task._id)}
            deleteTask={() => deleteTask(task._id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
