import React, { useState } from 'react';
import { CheckCircle, ListTodo } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilters } from './components/TaskFilters';
import { useTaskStore } from './store/taskStore';
import { Task } from './types/task';

function App() {
  const [status, setStatus] = useState<Task['status']>();
  const [priority, setPriority] = useState<Task['priority']>();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filterTasks = useTaskStore((state) => state.filterTasks);
  const filteredTasks = filterTasks(status, priority, searchTerm);
  const totalTasks = useTaskStore((state) => state.tasks.length);
  const completedTasks = useTaskStore((state) => 
    state.tasks.filter(task => task.status === 'completed').length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ListTodo className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Task Manager</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <ListTodo className="h-5 w-5 mr-1" />
                <span>Total: {totalTasks}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-1 text-green-500" />
                <span>Completed: {completedTasks}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <TaskForm />
          </div>

          <TaskFilters
            status={status}
            priority={priority}
            searchTerm={searchTerm}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onSearchChange={setSearchTerm}
          />

          {filteredTasks.length > 0 ? (
            <TaskList />
          ) : (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new task.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;