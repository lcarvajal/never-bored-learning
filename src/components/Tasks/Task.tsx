interface TaskProps {
  id: number
  title: string
  year: number
  url: string
  description: string
  type: string
}

export default function Task(props: TaskProps) {
  function handleOnStartTask() {
    window.open(props.url, '_blank');
  }

  return (
    <div id={props.id.toString()} className="task">
      <div className="task__title">
        <h4>{props.title}</h4>
        <p><span>{props.type}</span></p>
      </div>
      <div className="task__start_button">
        <button onClick={handleOnStartTask}>↗</button>
      </div>
    </div>
  )
}