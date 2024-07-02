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
    <div className="currenttask">
      <h1>Current Task</h1>
      {props.task.title ? <p>{props.task.title}</p> : <p>Started tasks appear here</p>}
      {props.task.id ? (
        <>
          <button onClick={() => props.onCompleteTask(props.task.id)}>Complete</button>
          <button onClick={() => props.onCompleteTaskLater(props.task.id)}>Continue later</button>
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
        {props.tasks.map((task: any) => <Task {...task} key={task.id} onStartTask={props.onStartTask} onRemoveTask={props.onRemoveTask} />)}
      </div>
    </div>
  )
}