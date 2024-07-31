import Resource from "./Resource"

interface Resource {
  id: number
  title: string
  url: string
  description: string
  type: string
}

interface ResourcesProps {
  resources: Resource[]
}

export default function Resources(props: ResourcesProps) {
  const resources = props.resources;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm text-slate-400">Resources</h2>
      <div className="flex flex-col gap-4">
        {resources.map((resource: Resource) => <Resource {...resource} key={resource.id} />)}
      </div>
    </div>
  )
}