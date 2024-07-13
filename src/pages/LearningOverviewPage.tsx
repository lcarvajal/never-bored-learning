import { useNavigate } from "react-router-dom";

const goals = [
  {
    id: 1,
    goal: 'Identify Basic Javascript Concepts',
    description: 'Identify variables, describe data types, define functions, and explain loops, conditionals, arrays, and objects.',
  },
  {
    id: 2,
    goal: 'Apply ES6 features',
    description: 'Use arrow functions, demonstrate template literals, explain destructuring, implement spread/rest operators, and describe classes and modules.',
  },
  {
    id: 3,
    goal: 'Set Up the React Environment',
    description: 'Install Node.js with npm or yarn.',
  }
]

export default function LearningOverviewPage() {
  const navigate = useNavigate();

  function handleOpenCurrentLearningGoal() {
    navigate('/tasks');
  }

  return (
    <div className="flex flex-col grow gap-6">
      <div className="border-slate-200 border-2 p-4 rounded-xl flex flex-col gap-4 mt-12">
        <h1>Explore all there is to learn in React</h1>
        <p>MOtto</p>
        <div className="grid grid-cols-2 gap-4 w-60 ml-auto">
          <button className="button-primary" onClick={handleOpenCurrentLearningGoal}>Open</button>
          <button className="button-primary">Complete</button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-10/12 mx-auto">
        {goals.map((goal) => (
          <div key={goal.id} className="border-slate-200 border-2 p-4 rounded-xl flex flex-row gap-4">
            <div className="flex flex-col grow">
              <h2>{goal.goal}</h2>
              <p>{goal.description}</p>
            </div>
            <div className="w-20 text-center">
              {/* <button className="button-primary">Start</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}