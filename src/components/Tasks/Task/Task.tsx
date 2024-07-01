import "./Task.css"

export default function Task() {
  return (
    <div className="task">
      <div className="task__close_button">
        <button>X</button>
      </div>
      <div className="task__title">
        <p>
          Task
          <br></br>
          <span>Book</span>
        </p>
      </div>
      <div className="task__start_button">
        <button>Start</button>
      </div>
    </div>
  )
}