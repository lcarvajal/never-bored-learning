import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Roadmap {
  id: number,
  title: string,
  owner_id: number,
  learning_goal: string,
  modules: Module[],
}

interface Module {
  id: number;
  title: string;
  description: string;
}

export default function LearningOverviewPage() {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<Roadmap>({} as Roadmap);

  useEffect(() => {
    axios.get('/roadmaps')
      .then((response) => {
        const roadmaps = response.data
        if (roadmaps.length > 0) {
          const roadmapId = roadmaps[0].id
          axios.get(`/roadmaps/${roadmapId}/modules`).then((response) => {
            setRoadmap(response.data);
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col grow gap-6">
      {(roadmap && roadmap.modules) && (
        <>
          <div className="rounded-xl flex flex-col gap-4 mt-12">
            <h1>Explore Resources</h1>
            <p>{roadmap.learning_goal}</p>
          </div>
          <div className="flex flex-col gap-4">
            {roadmap.modules.map((module) => (
              <div key={module.id} className="group border-slate-200 border-2 p-4 rounded-xl flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col grow w-full">
                  <p className="font-bold">{module.title}</p>
                  <p>{module.description}</p>
                </div>
                <div className="flex flex-col w-full sm:w-auto text-center justify-center">
                  {
                    <button className="button-primary sm:invisible sm:group-hover:visible ml-auto" onClick={() => { navigate('/roadmaps/' + roadmap.id + "/" + module.id) }}>
                      Open
                    </button>
                  }
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}