interface TaskProps {
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
    <div id={props.title} className="flex flex-row justify-between p-4 bg-slate-950 hover:bg-slate-900 cursor-pointer text-slate-50 rounded-xl" onClick={handleOnStartTask}>
      <div className="flex flex-col">
        <p><span>{props.type}</span></p>
        <h4 className="font-semibold text-lg">{props.title}</h4>
        <p>{props.description}</p>
      </div>
      <div className="">
        <button>↗</button>
      </div>
    </div>
  )
}