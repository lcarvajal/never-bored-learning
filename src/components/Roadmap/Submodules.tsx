interface Resource {
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
  "resources": Resource[]
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
      <div className="flex flex-row flex-wrap gap-2">
        {
          submodules.map((submodule, index) => (
            <>
              {props.selectedIndex === index ? (
                <div className="border-[1px] border-zinc-400 text-zinc-400 py-2 px-2 md:py-0 md:px-2 rounded-xl"
                  key={submodule.id}
                >
                  {submodule.title}
                </div>
              )
                : (
                  <button className="bg-zinc-900 hover:bg-zinc-950 text-zinc-400 hover:text-slate-50 py-2 px-2 md:py-0 md:px-2 rounded-xl"
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
}
