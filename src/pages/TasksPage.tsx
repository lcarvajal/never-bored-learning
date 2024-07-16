import Tasks from '../components/Tasks/Tasks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TaskCategories from '../components/Tasks/TaskCategories';
import { mockCategories, mockTasks } from '../util/mock';

interface Task {
  id: number,
  title: string,
  url: string,
  description: string,
  type: string
}

export default function TasksPage() {
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (state) {
      const title = state.name;
      const description = state.description;

      setTitle(title);
      setDescription(description);

      if (import.meta.env.DEV) {
        setCategories(mockCategories);
        setTasks(mockTasks);
      }
      else {
        // TODO: use axios to get categories. Body should be set with title and description
      }
    }
    else {
      console.log("No state")
    }
  }, [state]);

  return (
    <div className="flex flex-col">
      <h1>{title}</h1>
      <p>{description}</p>
      <TaskCategories categories={categories} />
      <Tasks tasks={tasks} />
    </div>
  )
}
