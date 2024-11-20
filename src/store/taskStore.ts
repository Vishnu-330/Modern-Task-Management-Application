import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterTasks: (status?: Task['status'], priority?: Task['priority'], searchTerm?: string) => Task[];
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      filterTasks: (status, priority, searchTerm) => {
        const { tasks } = get();
        return tasks.filter((task) => {
          const statusMatch = !status || task.status === status;
          const priorityMatch = !priority || task.priority === priority;
          const searchMatch = !searchTerm || 
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
          return statusMatch && priorityMatch && searchMatch;
        });
      },
    }),
    {
      name: 'task-storage',
    }
  )
);