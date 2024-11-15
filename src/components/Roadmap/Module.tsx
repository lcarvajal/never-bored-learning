import { useEffect, useState } from 'react';
import axios from 'axios';
import Submodules from './Submodules';
import Resources from './Resources';

interface Module {
  id: number,
  title: string,
  description: string,
  submodules: Submodule[]
}

interface Submodule {
  id: number,
  title: string,
  description: string,
  query: string,
  resources: Resource[]
}

interface Resource {
  id: number,
  title: string,
  url: string,
  description: string,
  type: string
}

interface ModuleProps {
  roadmapId: number,
  moduleId: number
}

export default function Module(props: ModuleProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [module, setModule] = useState<Module>({} as Module);
  const [selectedSubmoduleIndex, setSelectedSubmoduleIndex] = useState(-1);
  const [resources, setResources] = useState<Resource[]>([]);
  
  const roadmapId = props.roadmapId;
  const moduleId = props.moduleId;

  useEffect(() => {  
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const module_response = await axios.get(`/roadmaps/${roadmapId}/modules/${moduleId}`)
      setModule(module_response.data);

      if (module_response.data.submodules.length === 0) {
        const submodule_response = await axios.post(`/roadmaps/${roadmapId}/modules/${moduleId}/populate`)
        setModule((module) => ({ ...module, submodules: submodule_response.data }));

        await new Promise(resolve => setTimeout(resolve, 6000));
        const module_response = await axios.get(`/roadmaps/${roadmapId}/modules/${moduleId}`)
        setModule(module_response.data);
        setIsLoading(false);
      }
      else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchModule = async (index: number) => {
    setIsLoading(true);
    try {
      const module_response = await axios.get(`/roadmaps/${roadmapId}/modules/${moduleId}`)
      setModule(module_response.data); 
      setSelectedSubmoduleIndex(index);
      setResources(module_response.data.submodules[index].resources);
      handleSelectSubmodule(index);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function handleSelectSubmodule(index: number) {
    setSelectedSubmoduleIndex(index);
      const currentResources = module.submodules[index].resources;
      if (currentResources) {
        if (currentResources.length === 0) {
          setResources([]);
        }
        else {
          setResources(currentResources);
        }
      }
  }

  if (!module.title) {
    return <p>Loading...</p>
  }

  if (!module.submodules || module.submodules.length === 0) {
    return <p>Breaking down {module.title} into submodules...</p>
  }

  if (isLoading === true) {
    return <p>Scraping resources off the web...</p>
  }

  return (
    <>
      <h1 className="font-normal">{module.title}</h1>
      <Submodules submodules={module.submodules} selectedIndex={selectedSubmoduleIndex} onSelectSubmodule={handleSelectSubmodule} />
      {
      resources.length > 0 ? <Resources resources={resources} /> : (
        <>
        { (selectedSubmoduleIndex === -1) ? (
            <p>Select a submodule above to get started</p>
          ) : (
            <>
            <p>It can take a couple of minutes to gather resources.</p>
            <button className='button-primary w-[20em]' onClick={() => fetchModule(selectedSubmoduleIndex)}>Try fetching resources again</button>
            </>
          ) 
        }
        </>
      )
      }
    </>
  )
}
