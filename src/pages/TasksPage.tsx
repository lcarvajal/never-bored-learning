

import Tasks from '../components/Tasks/Tasks';
import { useEffect, useState } from 'react';
import { requestPermission, showNotification } from '../util/firebase';
import { useLocation } from 'react-router-dom';

interface Task {
  id: number,
  title: string,
  year: number,
  url: string,
  description: string,
  type: string,
}

export default function TasksPage() {
  const { state } = useLocation();
  const [currentTask, setCurrentTask] = useState<Task>({} as Task)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNotificationSent, setIsNoitificationSent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (state) {
      const title = state.name;
      const description = state.description;

      setTitle(title);
      setDescription(description);
    }
    else {
      console.log("No state")
    }
  }, [state]);

  function addTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function completeCurrentTask() {
    setCurrentTask({} as Task);
  }

  function completeCurrentTaskLater() {
    setTasks([...tasks, currentTask]);
    setCurrentTask({} as Task);
  }

  async function startTask(id: number) {
    const taskToStart = tasks.find(t => t.id === id);
    let tasksWithoutTaskToStart: Task[] = tasks.filter(t => t.id !== id);

    if (currentTask.id && currentTask.id != id) {
      tasksWithoutTaskToStart.push(currentTask);
    }

    if (taskToStart) {
      setCurrentTask(taskToStart);
      setTasks(tasksWithoutTaskToStart);
      requestPermission();
      window.open(taskToStart.url, '_blank')?.focus();

      if (!isNotificationSent) {
        setIsNoitificationSent(true);
        try {
          const title = "Off course?";
          const options = {
            body: "If you're bored, switch tasks"
          };

          const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
          await delay(10000);
          const notification = await showNotification(title, options);
          if (notification) {
            console.log("Notification shown:", notification);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error showing notification:", error.message);
          } else {
            console.error("Unknown error showing notification");
          }
        }
      }
    }
    else {
      console.error(`Task with id ${id} not found`);
    }
  }

  function removeTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className="flex flex-col">
      <h1>{title}</h1>
      <p>{description}</p>
      <Tasks currentTask={currentTask} tasks={tasks} onAddTask={addTask} onCompleteTask={completeCurrentTask} onCompleteTaskLater={completeCurrentTaskLater} onStartTask={startTask} onRemoveTask={removeTask} />
    </div>
  )
}
