import "./Task.css"

interface TaskProps {
  id: number
  title: string
  year: number
  url: string
  description: string
  type: string
  onStartTask: (id: number) => void
  onRemoveTask: (id: number) => void
}

export default function Task(props: TaskProps) {
  return (
    <div id={props.id.toString()} className="task">
      {/* <div className="task__close_button">
        <button onClick={() => props.onRemoveTask(props.id)}>X</button>
      </div> */}
      <div className="task__title">
        <h4>{props.title}</h4>
        <p><span>{props.type}</span></p>
      </div>
      <div className="task__start_button">
        <button onClick={() => props.onStartTask(props.id)}>↗</button>
      </div>
    </div>
  )
}