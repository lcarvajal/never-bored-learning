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
  onCompleteTask: (task: Task) => void
  onCompleteTaskLater: (task: Task) => void
}

interface TasksProps {
  currentTask: Task
  tasks: Task[]
  onAddTask: (task: Task) => void
  onCompleteTask: (task: Task) => void
  onCompleteTaskLater: (task: Task) => void
  onStartTask: (id: number) => void
  onRemoveTask: (id: number) => void
}

function CurrentTask(props: CurrentTaskProps) {

  return (
    <div className="currenttask">
      <h1>Current Task</h1>
      {props.task.title ? <p>{props.task.title}</p> : <p>Started tasks appear here</p>}
      {props.task.title ? (
        <>
          <button onClick={() => props.onCompleteTask(props.task)}>Complete</button>
          <button onClick={() => props.onCompleteTaskLater(props.task)}>Continue later</button>
        </>
      ) : <></>}
    </div>
  )
}

export default function Tasks(props: TasksProps) {
  return (
    <div className="tasks">
      <CurrentTask onCompleteTask={props.onCompleteTask} onCompleteTaskLater={props.onCompleteTaskLater} task={props.currentTask} />
      <h1>Tasks</h1>
      <div className="tasks__list">
        {props.tasks.map((task: any) => <Task {...task} onStartTask={props.onStartTask} onRemoveTask={props.onRemoveTask} />)}
      </div>
    </div>
  )
}