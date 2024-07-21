import Tasks from '../components/Tasks/Tasks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Submodules from '../components/Tasks/Submodules';
import axios from 'axios';

interface Task {
  title: string,
  url: string,
  description: string,
  type: string
}

interface Module {
  "id": number,
  "name": string,
  "description": string,
  "submodules": Submodule[]
}

interface Submodule {
  "id": number,
  "name": string,
  "query": string,
  "resources": Task[]
}

export default function TasksPage() {
  const { roadmapName, moduleId } = useParams();

  const [module, setModule] = useState<Module>({} as Module);
  const [selectedSubmoduleIndex, setSelectedSubmoduleIndex] = useState(-1);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get(`/roadmaps/${roadmapName}/${'' + moduleId}`).then((response) => {
      console.log("Response: ", response.data)
      setModule(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  function handleSelectCategory(index: number) {
    setSelectedSubmoduleIndex(index);
    const currentTasks = module.submodules[index].resources;
    setTasks(currentTasks);
  }

  return (
    <div className="flex flex-col grow gap-4 w-full md: w-3/3 lg:w-3/5 px-6">
      {
        module.name && (
          <>
            <h1>{module.name}</h1>
            <p>{module.description}</p>
            <Submodules submodules={module.submodules} selectedIndex={selectedSubmoduleIndex} onSelectSubmodule={handleSelectCategory} />
            {
              tasks.length > 0 ? <Tasks tasks={tasks} /> : <p>Click a topic above to get started</p>
            }
          </>
        )
      }
    </div>
  )
}
