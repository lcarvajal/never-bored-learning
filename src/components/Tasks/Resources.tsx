import Resource from "./Resource"

interface Resource {
  title: string
  url: string
  description: string
  type: string
}

interface ResourcesProps {
  tasks: Resource[]
}

export default function Resources(props: ResourcesProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm text-slate-400">Resources</h2>
      <div className="flex flex-col gap-4">
        {props.tasks.map((task: any) => <Resource {...task} key={task.id} />)}
      </div>
    </div>
  )
}