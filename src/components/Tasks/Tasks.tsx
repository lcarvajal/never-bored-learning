import Task from "./Task"

interface Task {
  id: number
  title: string
  year: number
  url: string
  description: string
  type: string
}

interface TasksProps {
  tasks: Task[]
}

export default function Tasks(props: TasksProps) {
  return (
    <div className="tasks">
      <h2>Resources</h2>
      <div className="tasks__list">
        {props.tasks.map((task: any) => <Task {...task} key={task.id} />)}
      </div>
    </div>
  )
}