import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Roadmap from '../components/Tasks/Roadmap';
import Module from '../components/Tasks/Module';

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

export default function LearningOverviewPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [currentModuleId, setCurrentModuleId] = useState<number>(-1);

  useEffect(() => {
    // Function to fetch roadmaps and modules
    const fetchData = async () => {
      try {
        // Fetch the roadmaps
        const roadmapsResponse = await axios.get('/roadmaps');
        const roadmaps = roadmapsResponse.data;

        if (roadmaps.length > 0) {
          const roadmapId = roadmaps.at(-1).id;

          // Fetch modules for the selected roadmap
          const modulesResponse = await axios.get(`/roadmaps/${roadmapId}/modules`);
          setRoadmap(modulesResponse.data);
        }
        else {
          navigate('/roadmaps/create')
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!roadmap) {
    return <div>No roadmap found</div>;
  }

  function handleOpenModule(moduleId: number) {
    setCurrentModuleId(moduleId);
  }

  return (
    <div className="flex flex-col md:flex-row grow gap-6 w-full text-start">
      <div className="flex flex-col items-top w-2/6 border-e-2 border-zinc-900 p-4">
        <Roadmap roadmap={roadmap} handleOpenModule={handleOpenModule} />
      </div>
      <div className="flex flex-col w-4/6 gap-4">
        {
          currentModuleId === -1 ? (
            <p className="text-slate-400">Select a module to start</p>
          ) : (
            <Module key={currentModuleId} roadmapId={roadmap.id} moduleId={currentModuleId}/>
          )
        }
      </div>
    </div>
  );
}
