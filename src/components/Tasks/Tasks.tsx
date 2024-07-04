import "./Tasks.css"
import Task from "./Task/Task"

interface Task {
  id: number
  title: string
  year: number
  url: string
  description: string
  type: string
}

interface CurrentTaskProps {
  task: Task
  onCompleteTask: (id: number) => void
  onCompleteTaskLater: (id: number) => void
  onStartTask: (id: number) => void
  onRemoveTask: (id: number) => void
}

interface TasksProps {
  currentTask: Task
  tasks: Task[]
  onAddTask: (task: Task) => void
  onCompleteTask: (id: number) => void
  onCompleteTaskLater: (id: number) => void
  onStartTask: (id: number) => void
  onRemoveTask: (id: number) => void
}

function CurrentTask(props: CurrentTaskProps) {

  return (
    <div className="current-task">
      <h1>Get Started with AI</h1>
      <p>We put together resources on basic concepts and beginner-friendly tutorials.</p>
      {props.task.id ? (
        <>
          <h2>Now Learning</h2>
          <Task {...props.task} onStartTask={props.onStartTask} onRemoveTask={props.onRemoveTask} />
          <div className="current-task__actions">
            <button onClick={() => props.onCompleteTask(props.task.id)}>Complete</button>
            <button onClick={() => props.onCompleteTaskLater(props.task.id)}>Continue later</button>
          </div>
        </>
      ) : (
        <>
        </>
      )}

    </div>
  )
}

export default function Tasks(props: TasksProps) {
  return (
    <div className="tasks">
      <CurrentTask onCompleteTask={props.onCompleteTask} onCompleteTaskLater={props.onCompleteTaskLater} onStartTask={props.onStartTask} onRemoveTask={props.onRemoveTask} task={props.currentTask} />
      <h2>Resources</h2>
      <div className="tasks__list">
        {props.tasks.map((task: any) => <Task {...task} key={task.id} onStartTask={props.onStartTask} onRemoveTask={props.onRemoveTask} />)}
      </div>
    </div>
  )
}