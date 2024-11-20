import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { format } from 'date-fns';
import { Task } from '../types/task';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusIcons = {
  'todo': Clock,
  'in-progress': AlertTriangle,
  'completed': CheckCircle,
};

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const StatusIcon = statusIcons[task.status];
        return (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="mt-1 text-gray-600">{task.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <StatusIcon size={16} />
                    <span>{task.status}</span>
                  </div>
                  <div>
                    Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
                  </div>
                  {task.dueDate && (
                    <div>
                      Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}