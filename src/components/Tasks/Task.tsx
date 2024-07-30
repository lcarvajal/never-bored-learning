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
      <div className="flex flex-col w-full ">
        <h4 className="font-semibold text-lg text-slate-50">{props.title}</h4>
        <p className="text-ellipsis overflow-hidden ... text-sm text-zinc-400 max-h-10">{props.description}</p>
      </div>
      <div className="">
        <button>↗</button>
      </div>
    </div>
  )
}