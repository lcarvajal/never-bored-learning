import Task from "./Task"

interface Task {
  id: number
  title: string
  url: string
  content: string
  type: string
}

interface TasksProps {
  tasks: Task[]
}

export default function Tasks(props: TasksProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm text-slate-400">Resources</h2>
      <div className="flex flex-col gap-4">
        {props.tasks.map((task: any) => <Task {...task} key={task.id} />)}
      </div>
    </div>
  )
}