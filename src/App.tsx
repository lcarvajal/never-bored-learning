import './App.css'
import Chatpanel from './components/Chatpanel/Chatpanel'
import Tasks from './components/Tasks/Tasks'
import { useState } from 'react'

interface Task {
  id: number,
  title: string,
  year: number,
  url: string,
  description: string,
  type: string,
}

function App() {
  const [currentTask, setCurrentTask] = useState<Task>({} as Task)
  const [tasks, setTasks] = useState<Task[]>([
    {
      "id": 1,
      "title": "Introduction to Machine Learning",
      "year": 2021,
      "url": "https://www.wolfram.com/language/introduction-machine-learning/preface/",
      "description": "This book is for anyone who wants to know what machine learning is, how to use it, or how it works. A scientist or an engineer might use it to apply machine learning to their problems. A data analyst might use it to transition to a data scientist position. A student might use it to learn valuable skills. A decision maker might use it to get an intuition about what machine learning is. A manager might use it to interact more effectively with their data scientists. More generally, this book should benefit anyone curious about this fascinating field.",
      "type": "Book",
    },
    {
      "id": 2,
      "title": "Software 2.0",
      "year": 2017,
      "url": "https://karpathy.medium.com/software-2-0-a64152b37c35",
      "description": "Andrej Karpathy was one of the first to clearly explain (in 2017!) why the new AI wave really matters. His argument is that AI is a new and powerful way to program computers. As LLMs have improved rapidly, this thesis has proven prescient, and it gives a good mental model for how the AI market may progress.",
      "type": "Blog post",
    },
    {
      "id": 3,
      "title": "State of GPT",
      "year": 2023,
      "url": "https://www.youtube.com/watch?v=vu7WTEwuptw",
      "description": "Also from Karpathy, this is a very approachable explanation of how ChatGPT / GPT models in general work, how to use them, and what directions R&D may take.",
      "type": "Video",
    },
    {
      "id": 4,
      "title": "What is ChatGPT doing … and why does it work?",
      "year": 2023,
      "url": "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/",
      "description": "Computer scientist and entrepreneur Stephen Wolfram gives a long but highly readable explanation, from first principles, of how modern AI models work. He follows the timeline from early neural nets to today’s LLMs and ChatGPT.",
      "type": "Blog post",
    },
    {
      "id": 5,
      "title": "Transformers explained",
      "year": 2021,
      "url": "https://daleonai.com/transformers-explained",
      "description": "This post by Dale Markowitz is a shorter, more direct answer to the question “what is an LLM, and how does it work?” This is a great way to ease into the topic and develop intuition for the technology. It was written about GPT-3 but still applies to newer models.",
      "type": "Blog post",
    }
  ]);

  function addTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function completeTask(task: Task) {
    setTasks(tasks.filter(t => t.id !== task.id));
    setCurrentTask({} as Task);
  }

  function completeTaskLater(task: Task) {
    setTasks([...tasks, task]);
    setCurrentTask({} as Task);
  }

  function startTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
    const task = tasks.filter(t => t.id === id)[0];
    setCurrentTask(task);
    window.open(task.url, '_blank').focus();
  }

  function removeTask(id: number) {
    console.log("remove!")
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className='app'>
      <Tasks currentTask={currentTask} tasks={tasks} onAddTask={addTask} onCompleteTask={completeTask} onCompleteTaskLater={completeTaskLater} onStartTask={startTask} onRemoveTask={removeTask} />
      <Chatpanel />
    </div>
  )
}

export default App
