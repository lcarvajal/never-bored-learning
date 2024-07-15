import axios from 'axios';
import { useEffect, useState } from 'react';

interface Roadmap {
  goal: string,
  items: RoadmapItem[],
}

interface RoadmapItem {
  id: number;
  name: string;
  description: string;
}

export default function LearningOverviewPage() {
  const [roadmap, setRoadmap] = useState<Roadmap>({ goal: "", items: [] } as Roadmap);

  useEffect(() => {
    axios.get('roadmaps')
      .then((response) => {
        setRoadmap(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log('404 error');
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
      <div className="border-slate-200 border-2 p-4 rounded-xl flex flex-col gap-4 mt-12">
        <h1>Learning Roadmap</h1>
        <p>{roadmap.goal}</p>
        {/* <div className="grid grid-cols-2 gap-4 w-60 ml-auto">
          <button className="button-primary" onClick={handleOpenCurrentLearningGoal}>Open</button>
          <button className="button-primary">Complete</button>
        </div> */}
      </div>
      <div className="flex flex-col gap-4 w-10/12 mx-auto">
        {roadmap.items.map((item) => (
          <div key={item.id} className="border-slate-200 border-2 p-4 rounded-xl flex flex-row gap-4">
            <div className="flex flex-col grow">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
            <div className="w-20 text-center">
              {/* <button className="button-primary">Start</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}