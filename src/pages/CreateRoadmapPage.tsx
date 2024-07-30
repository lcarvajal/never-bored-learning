import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  goal: string;
  reason: string;
}

export default function CreateRoadmapPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    goal: '',
    reason: '',
  });

  const createRoadmap = async () => {
    setIsLoading(true);

    try {
      const roadmap = {
        description: formValues.goal
      };
      
      await axios.post('/roadmaps/', roadmap);
      navigate('/');
    } catch (error) {
      console.error('Error creating roadmap:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClick() {
    setIsLoading(true);
    createRoadmap();
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-1/3 mx-auto text-start">
      {isLoading ? <h1>Breaking down topic into modules</h1> : (
        <>
          <form className="flex flex-col gap-2" onSubmit={handleClick}>
            <label htmlFor="goal" className="text-2xl font-medium">What do you want to learn about?</label>
            <textarea
              className="h-48"
              id="goal"
              name="goal"
              value={formValues.goal}
              maxLength={250}
              minLength={5}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="button-primary mt-4"
            >
              Launch Topic
            </button>
          </form>
        </>
      )}
    </div>
  )
}