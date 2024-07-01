import "./Tasks.css"

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
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
  )
}