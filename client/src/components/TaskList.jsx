import React from 'react';

export default function TaskList({ tasks, onToggle, onDelete }){
  if(!tasks.length) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create your first task above!</p>
      </div>
    );
  }
  
  return (
    <ul className="task-list">
      {tasks.map(t => (
        <li key={t._id} className={`task-item ${t.completed ? 'completed' : ''}`}>
          <input 
            type="checkbox" 
            className="task-checkbox"
            checked={t.completed} 
            onChange={()=>onToggle(t)} 
          />
          <div className="task-content">
            <div className={`task-title ${t.completed ? 'completed' : ''}`}>
              {t.title}
            </div>
            {t.description && (
              <div className="task-description">{t.description}</div>
            )}
            <div className="task-meta">
              <div className="task-date">
                📅 {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No deadline'}
              </div>
            </div>
          </div>
          <div className="task-actions">
            <button 
              className="btn-delete" 
              onClick={()=>onDelete(t._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
