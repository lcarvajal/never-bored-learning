import { useParams } from 'react-router-dom';
import Module from '../components/Tasks/Module';

export default function TasksPage() {
  const { roadmapId, moduleId } = useParams();

  return (
    <div className="flex flex-col grow gap-4 w-full md: w-3/3 lg:w-3/5 px-6">
      {
        (roadmapId && moduleId) && <Module roadmapId={roadmapId} moduleId={moduleId} />
      }
    </div>
  )
}
