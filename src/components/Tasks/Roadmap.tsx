
interface Roadmap {
  id: number;
  title: string;
  owner_id: number;
  learning_goal: string;
  modules: Module[];
}

interface Module {
  id: number;
  title: string;
  description: string;
}

interface RoadmapProps {
  roadmap: Roadmap;
  handleOpenModule: (moduleId: number) => void;
}

export default function Roadmap(props: RoadmapProps) {
  const roadmap = props.roadmap;

  return (
    <>
    {roadmap.modules.length > 0 && (
      <>
        <div className="flex flex-col gap-4 mb-4">
          <h1>Modules</h1>
          <p>Goal: {roadmap.learning_goal}</p>
        </div>
        <div className="flex flex-col gap-4">
          {roadmap.modules.map((module) => (
            <div 
              key={module.id} 
              className="p-4 rounded-xl flex flex-col gap-4 bg-zinc-900 hover:bg-zinc-700 cursor-pointer"
              onClick={ () => props.handleOpenModule(module.id) }
              >
              <div className="flex flex-col grow w-full">
                <p className="font-medium text-lg">{module.title}</p>
                <p className="text-sm text-zinc-400">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
    </>
  )
}