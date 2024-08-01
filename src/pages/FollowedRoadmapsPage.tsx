import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Roadmap {
  id: number
  title: string
  learning_goal: string
  created_at: string
}

export default function FollowedRoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roadmapsResponse = await axios.get('/roadmaps/');
        const roadmaps = roadmapsResponse.data;
        setRoadmaps(roadmaps);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full md:w-2/3 text-start mx-auto">
      <div className="flex flex-row justify-between p-4">
        <h1 className="font-normal">Your Topics</h1>
        <button className="button-primary"
          onClick={() => navigate('/roadmaps/new/')}>
          New topic
        </button>
      </div>
      <div>
        {roadmaps.map((roadmap) => (
          <div 
            className="bg-slate-950 hover:bg-slate-900 cursor-pointer text-slate-50 rounded-xl p-4 w-full"
            key={roadmap.id}
            onClick={() => navigate(`/roadmaps/${roadmap.id}`)}>
          <p className=" text-lg text-slate-50">
            {roadmap.learning_goal}
          </p>
          <p className="text-sm text-zinc-400">
            {roadmap.created_at.substring(0, 10)}
          </p>
        </div>
        ))}
      </div>
    </div>
  )
}