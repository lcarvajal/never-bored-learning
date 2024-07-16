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

interface Category {
  name: string;
  description: string;
}

export default function TasksPage() {
  const tasksCache: { [categoryName: string]: Task[] } = {};
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
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
          description: itemDescription
        }).then((response) => {
          setCategories(response.data);
          setCurrentCategory(0);
        }).catch((error) => {
          console.log(error);
        });
      }
    }
    else {
      console.log("No state")
    }
  }, [state]);

  function handleSelectCategory(index: number) {
    setSelectedCategoryIndex(index);
    setTasks([]);
    setCurrentCategory(index);
  }

  function setCurrentCategory(index: number) {
    if (categories[index].name in tasksCache) {
      setTasks(tasksCache[categories[index].name]);
    }
    else {
      axios.post('tasks', {
        description: categories[index].description
      }).then((response) => {
        tasksCache[categories[index].name] = response.data
        setTasks(response.data);
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>{title}</h1>
      <p>{description}</p>
      <TaskCategories categories={categories} selectedIndex={selectedCategoryIndex} onSelectCategory={handleSelectCategory} />
      {
        tasks.length > 0 ? <Tasks tasks={tasks} /> : <p>Loading...</p>
      }
    </div>
  )
}
