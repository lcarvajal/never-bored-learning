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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true); // State for menu visibility

  useEffect(() => {
    // Function to fetch roadmaps and modules
    const fetchData = async () => {
      try {
        // Fetch the roadmaps
        const roadmapsResponse = await axios.get('/roadmaps/');
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
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!roadmap) {
    return <div>No topics found</div>;
  }

  function handleOpenModule(moduleId: number) {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setCurrentModuleId(moduleId);
  }

  return (
    <div className="flex flex-col md:flex-row grow gap-6 text-start">
      {/* Hamburger Menu Button */}
      <button
        className="flex flex-row gap-2 w-fit z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {/* Hamburger Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        Modules
      </button>

      {/* Roadmap Section */}
      <div
        className={`bg-zinc-900 md:bg-slate-950 flex flex-col items-top w-full md:w-2/6 border-e-2 border-zinc-900 p-4 transition-transform duration-300 md:transform md:translate-x-0 ${
          isMenuOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <Roadmap roadmap={roadmap} handleOpenModule={handleOpenModule} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full md:w-4/6 gap-4">
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
