
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
        <div className="flex flex-col gap-4 px-4 mb-4">
          
          <p>{roadmap.learning_goal}</p>
          <button className="text-sm text-start text-violet-300 hover:text-violet-400">
            Change topic
          </button>
          <h2 className="text-sm text-slate-400">Modules</h2>
        </div>
        <div className="flex flex-col gap-4 align-items-start">
          {roadmap.modules.map((module) => (
            <div 
              key={module.id} 
              className="group p-4 rounded-xl flex flex-col gap-4 hover:bg-zinc-900 text-zinc-400 hover:text-slate-50 cursor-pointer"
              onClick={ () => props.handleOpenModule(module.id) }
              >
              <div className="flex flex-col grow w-full">
                <p className="font-medium text-lg">{module.title}</p>
                <p className="text-sm group-hover:text-slate-200">{module.description}</p>
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