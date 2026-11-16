import React, { useState } from 'react';

export default function TaskCard({ task, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const priorityColors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700',
  };

  const handleSave = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    // HIGHLIGHT HIGH PRIORITY: Thick red border if priority is High
    <div className={`p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-3 ${task.priority === 'High' ? 'border-red-400 border-2' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start gap-2">
        {isEditing ? (
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="font-semibold text-gray-800 border-b-2 border-indigo-500 focus:outline-none w-full"
          />
        ) : (
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
        )}
        
        {/* ALLOW CHANGE PRIORITY */}
        <select 
          value={task.priority} 
          onChange={(e) => onUpdate(task.id, { priority: e.target.value })}
          className={`px-2 py-1 text-xs font-bold rounded-full border-0 cursor-pointer ${priorityColors[task.priority] || 'bg-gray-100'}`}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      
      {isEditing ? (
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="text-sm text-gray-600 border rounded p-1 w-full"
          rows={2}
        />
      ) : (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}
      
      {task.due_date && (
        <p className="text-sm text-red-600 font-medium">
          ⏰ Due: {new Date(task.due_date).toLocaleString()}
        </p>
      )}
      
      <div className="mt-2 pt-3 border-t border-gray-100 flex items-center justify-between">
        {/* ALLOW UPDATE STATUS */}
        <select 
          value={task.status} 
          onChange={(e) => onUpdate(task.id, { status: e.target.value })}
          className="text-sm border border-gray-300 rounded-md p-1.5 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* ALLOW EDIT TASK */}
        {isEditing ? (
          <button onClick={handleSave} className="text-xs bg-green-500 text-white px-3 py-1 rounded">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-xs text-indigo-600 hover:underline font-medium">Edit Task</button>
        )}
      </div>
    </div>
  );
}