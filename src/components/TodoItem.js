import React from 'react';
import checkedIcon from '../assets/checked.png';
import uncheckedIcon from '../assets/unchecked.png';

function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="todo-item" onClick={toggleTask}>
      <img
        src={task.checked ? checkedIcon : uncheckedIcon}
        alt="status"
        className="status-icon"
        onClick={(e) => {
          e.stopPropagation(); 
          toggleTask();
        }}
      />

      {/* Task Text */}
      <span className={`todo-text ${task.checked ? 'checked' : ''}`}>
        {task.text}
      </span>

      {/* Delete Button with "X" */}
      <button className="delete-btn" onClick={(e) => {
        e.stopPropagation(); 
        deleteTask();
      }}>
        <span>X</span> {/* Using 'X' instead of an image */}
      </button>
    </li>
  );
}

export default TodoItem;
