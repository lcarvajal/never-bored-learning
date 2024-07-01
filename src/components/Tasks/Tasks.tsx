import "./Tasks.css"
import Task from "./Task/Task"

function CurrentTask() {

  return (
    <div className="currenttask">
      <h1>Current Task</h1>
      <button>Complete</button>
      <button>Continue later</button>
    </div>
  )
}

export default function Tasks() {
  return (
    <div className="tasks">
      <CurrentTask />
      <h1>Tasks</h1>
      <div className="tasks__list">
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  )
}