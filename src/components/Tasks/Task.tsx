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
    <div id={props.title} className="flex flex-row justify-between p-4 bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-slate-50 rounded-xl" onClick={handleOnStartTask}>
      <div className="flex flex-col">
        <p><span>{props.type}</span></p>
        <h4 className="font-semibold text-lg">{props.title}</h4>
        <p className="text-ellipsis ... overflow-hidden h-[4.5rem] w-full">{props.content}</p>
      </div>
      <div className="">
        <button>↗</button>
      </div>
    </div>
  )
}