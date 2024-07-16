interface TaskProps {
  title: string
  url: string
  content: string
  type: string
}

export default function Task(props: TaskProps) {
  function handleOnStartTask() {
    window.open(props.url, '_blank');
  }

  return (
    <div id={props.title} className="flex flex-row justify-between p-4 bg-zinc-900 text-slate-50 rounded-xl">
      <div className="flex flex-col">
        <p><span>{props.type}</span></p>
        <h4 className="font-semibold text-lg">{props.title}</h4>
        <p>{props.content}</p>
      </div>
      <div className="">
        <button onClick={handleOnStartTask}>↗</button>
      </div>
    </div>
  )
}