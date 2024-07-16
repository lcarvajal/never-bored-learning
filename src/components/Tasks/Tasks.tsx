import Task from "./Task"

interface Task {
  id: number
  title: string
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
      <div className="flex flex-col gap-4">
        {props.tasks.map((task: any) => <Task {...task} key={task.id} />)}
      </div>
    </div>
  )
}