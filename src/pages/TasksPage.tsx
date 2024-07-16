import Tasks from '../components/Tasks/Tasks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TaskCategories from '../components/Tasks/TaskCategories';
import { mockCategories, mockTasks } from '../util/mock';
import axios from 'axios';

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
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (state) {
      const learning_goal = state.learning_goal;
      const itemName = state.roadmapItem.name;
      const itemDescription = state.roadmapItem.description;

      setTitle(itemName);
      setDescription(itemDescription);
      setSelectedCategoryIndex(0);

      if (import.meta.env.DEV) {
        setCategories(mockCategories);
        setTasks(mockTasks);
      }
      else {
        axios.post('categories', {
          learning_goal: learning_goal,
          name: itemName,
          desctiption: itemDescription
        }).then((response) => {
          setCategories(response.data);
        }).catch((error) => {
          console.log(error);
        });
      }
    }
    else {
      console.log("No state")
    }
  }, [state]);

  function handleSelectCategory(index: number, category: string) {
    setSelectedCategoryIndex(index);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>{title}</h1>
      <p>{description}</p>
      <TaskCategories categories={categories} selectedIndex={selectedCategoryIndex} onSelectCategory={handleSelectCategory} />
      <Tasks tasks={tasks} />
    </div>
  )
}
