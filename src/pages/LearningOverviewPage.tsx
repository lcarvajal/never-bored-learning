import axios from 'axios';
import { useEffect, useState } from 'react';
// import { mockRoadmap } from '../util/mock';
// import { useNavigate } from 'react-router-dom';

interface Roadmap {
  learning_goal: string,
  modules: RoadmapItem[],
}

interface RoadmapItem {
  id: number;
  name: string;
  description: string;
}

export default function LearningOverviewPage() {
  // const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<Roadmap>({} as Roadmap);

  useEffect(() => {
    // setRoadmap(mockRoadmap);

    axios.get('roadmaps')
      .then((response) => {
        setRoadmap(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          axios.post('roadmaps')
            .then((response) => {
              setRoadmap(response.data);
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          console.log(error);
        }
      });
  }, []);

  return (
    <div className="flex flex-col grow gap-6">
      {roadmap && roadmap.modules ? (
        <>
          <div className="rounded-xl flex flex-col gap-4 mt-12">
            <h1>Learning Roadmap</h1>
            <p>{roadmap.learning_goal}</p>
          </div>
          <div className="flex flex-col gap-4">
            {roadmap.modules.map((item) => (
              <div key={item.id} className="border-slate-200 border-2 p-4 rounded-xl flex flex-row gap-4">
                <div className="flex flex-col grow">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>
                {/* <div className="w-20 text-center">
                  <button className="button-primary" onClick={() => { navigate('/tasks', { state: item }) }}>Start</button>
                </div> */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}