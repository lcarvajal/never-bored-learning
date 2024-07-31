
interface Module {
  id: number;
  title: string;
  description: string;
}

interface ModulesProps {
  modules: Module[];
  handleOpenModule: (moduleId: number) => void;
}

export default function Modules(props: ModulesProps) {
  const modules = props.modules;

  return (
    <>
    {modules.length > 0 && (
      <>
        <div className="px-4 mb-4">
          <h2 className="text-sm text-slate-400">Modules</h2>
        </div>
        <div className="flex flex-col gap-4 align-items-start">
          {modules.map((module) => (
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