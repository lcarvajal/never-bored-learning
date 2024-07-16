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
  const [isFetching, setIsFetching] = useState(false);
  const [tasksCache, setTasksCache] = useState<Record<string, Task[]>>({});
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (state) {
      const learning_goal = state.learning_goal;
      const itemName = state.roadmapItem.name;
      const itemDescription = state.roadmapItem.description;

      setTitle(itemName);
      setDescription(itemDescription);

      if (import.meta.env.DEV) {
        setCategories(mockCategories);
        setTasks(mockTasks);

        const tempCache: Record<string, Task[]> = {};
        for (let i = 0; i < mockCategories.length; i++) {
          const category = mockCategories[i];
          tempCache[category.name] = mockTasks;
        }
        setTasksCache(tempCache);
      }
      else {
        setIsFetching(true);
        axios.post('categories', {
          learning_goal: learning_goal,
          name: itemName,
          description: itemDescription
        }).then((response) => {
          const categories = response.data.categories;
          if (categories.length > 0) {
            setCategories(response.data.categories);
          }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setIsFetching(false);
        });
      }
    }
    else {
      console.log("No state")
    }
  }, []);

  function handleSelectCategory(index: number) {
    if (isFetching) {
      return;
    } else {
      setCurrentCategory(index);
    }
  }

  function setCurrentCategory(index: number) {
    setSelectedCategoryIndex(index);

    if (import.meta.env.DEV) {
      setTasks(mockTasks);
    }
    else {
      if (categories[index].name in tasksCache) {
        console.log("Should use from cache")
        setTasks(tasksCache[categories[index].name]);
      }
      else {
        setTasks([]);
        getCurrentTasks(index);
      }
    }
  }

  function getCurrentTasks(index: number) {
    setIsFetching(true);
    console.log("Categories: ", categories)
    console.log("current index: ", index)

    axios.post('tasks', {
      description: categories[index].description
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

      const tempCache = { ...tasksCache };
      tempCache[categories[index].name] = responseTasks;
      setTasksCache(tempCache);
      setTasks(responseTasks);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsFetching(false);
    })
  }

  return (
    <div className="flex flex-col grow gap-4 w-full md: w-3/3 lg:w-3/5 px-6">
      <h1>{title}</h1>
      <p>{description}</p>
      <TaskCategories categories={categories} selectedIndex={selectedCategoryIndex} onSelectCategory={handleSelectCategory} />
      {
        (tasks.length > 0 && selectedCategoryIndex !== -1) ? <Tasks tasks={tasks} /> : (
          <>
            {
              selectedCategoryIndex !== -1 ? <p>Loading...</p> : <p>Select a category to get started</p>
            }
          </>
        )
      }
    </div>
  )
}
