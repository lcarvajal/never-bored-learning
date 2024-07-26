interface Task {
  title: string,
  url: string,
  description: string,
  type: string
}

interface Submodule {
  "id": number,
  "title": string,
  "description": string,
  "query": string,
  "resources": Task[]
}

interface SubmodulesProps {
  submodules: Submodule[];
  selectedIndex: number;
  onSelectSubmodule: (index: number) => void;
}

export default function Submodules(props: SubmodulesProps) {
  const submodules = props.submodules;

  return (
    <div>
      <div className="flex flex-row gap-2">
        {
          submodules.map((submodule, index) => (
            <>
              {props.selectedIndex === index ? (
                <div className="border-2 border-slate-50 text-slate-50 px-2 rounded-xl"
                  key={submodule.id}
                >
                  {submodule.title}
                </div>
              )
                : (
                  <button className="bg-green-500 hover:bg-green-400 text-slate-900 px-2 rounded-xl"
                    key={submodule.id}
                    onClick={() => {
                      props.onSelectSubmodule(index)
                    }}
                  >
                    {submodule.title}
                  </button>
                )}
            </>
          ))
        }
      </div>
    </div>
  );
};
