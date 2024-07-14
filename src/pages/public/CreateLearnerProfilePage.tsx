import { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";

// Define a type for form values
interface FormValues {
  name: string;
  goal: string;
  reason: string;
  deadline: string;
  lastLearnedDescription: string;
}

export default function CreateLearnerProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Breaking down learning goal...");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    goal: '',
    reason: '',
    deadline: '',
    lastLearnedDescription: ''
  });

  async function handleClick() {
    setIsLoading(true);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000);

    setLoadingMessage("Assembling resources based on your profile and learning goal...");

    await delay(3000);

    navigate('/sign-up', {
      state: formValues
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      {isLoading ? <h1>{loadingMessage}</h1> : (
        <form className="flex flex-col gap-2">
          <h1 className="text-3xl mb-6">Create your learner profile</h1>
          <label htmlFor="name">What's your name?</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <label htmlFor="goal">What do you want to learn?</label>
          <textarea
            id="goal"
            name="goal"
            value={formValues.goal}
            maxLength={200}
            minLength={100}
            onChange={handleInputChange}
          />
          <label htmlFor="reason">Why do you want to learn it?</label>
          <textarea
            id="reason"
            name="reason"
            value={formValues.reason}
            maxLength={200}
            minLength={100}
            onChange={handleInputChange}
          />
          <label htmlFor="deadline">Do you need to achieve your learning goal by a certain date? (optional)</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formValues.deadline}
            onChange={handleInputChange}
          />
          <label htmlFor="last-learned-description">What's the last thing you learned really well? What worked for you and what didn't?</label>
          <textarea
            className="mb-6"
            id="last-learned-description"
            name="lastLearnedDescription"
            value={formValues.lastLearnedDescription}
            maxLength={400}
            minLength={100}
            onChange={handleInputChange}
          />
          <button
            className="button-primary"
            type="button"
            onClick={handleClick}
          >
            Generate Lesson Plan
          </button>
        </form>
      )}
    </div>
  )
}