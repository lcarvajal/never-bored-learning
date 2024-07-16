interface TaskProps {
  id: number
  title: string
  url: string
  description: string
  type: string
}

export default function Task(props: TaskProps) {
  function handleOnStartTask() {
    window.open(props.url, '_blank');
  }

  return (
    <div id={props.id.toString()} className="flex flex-row justify-between p-4 bg-zinc-900 text-slate-50 rounded-xl">
      <div className="flex flex-col">
        <p><span>{props.type}</span></p>
        <h4 className="font-semibold text-lg">{props.title}</h4>
        <p>{props.description}</p>
      </div>
      <div className="">
        <button onClick={handleOnStartTask}>↗</button>
      </div>
    </div>
  )
}