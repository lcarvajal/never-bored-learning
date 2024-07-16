import Tasks from '../components/Tasks/Tasks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TaskCategories from '../components/Tasks/TaskCategories';
import { mockCategories, mockTasks } from '../util/mock';
import axios from 'axios';

interface Task {
  title: string,
  url: string,
  content: string,
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
          setCategories(response.data.categories);
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setCurrentCategory(0);
        });
      }
    }
    else {
      console.log("No state")
    }
  }, []);

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
      getCurrentTasks();
    }
  }

  function getCurrentTasks() {
    axios.post('tasks', {
      description: categories[selectedCategoryIndex].description
    }).then((response) => {
      const resources = response.data.results
      console.log("resources", resources)

      interface ResponseTask {
        "title": string,
        "url": string,
        "content": string,
        "score": number,
        "raw_content": string | null
      }

      const responseTasks = resources.map((responseTask: ResponseTask) => {
        return {
          title: responseTask.title,
          url: responseTask.url,
          content: responseTask.content,
          type: "url"
        }
      })

      tasksCache[categories[selectedCategoryIndex].name] = responseTasks
      setTasks(responseTasks);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="flex flex-col grow gap-4 w-full md: w-3/3 lg:w-4/5 px-6">
      <h1>{title}</h1>
      <p>{description}</p>
      <TaskCategories categories={categories} selectedIndex={selectedCategoryIndex} onSelectCategory={handleSelectCategory} />
      {
        tasks.length > 0 ? <Tasks tasks={tasks} /> : <p>Loading...</p>
      }
    </div>
  )
}
