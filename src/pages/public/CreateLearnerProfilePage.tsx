import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

// Define a type for form values
interface FormValues {
  name: string;
  goal: string;
}

export default function CreateLearnerProfilePage() {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Breaking down learning goal...");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    goal: ''
  });

  useEffect(() => {
    if (state && state.goal) {
      setFormValues({
        name: "",
        goal: state.goal
      });
    }
  }, [state]);

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
    <div className="flex flex-col gap-6 w-full md:w-1/2 lg:w-1/3 mx-auto text-start">
      {isLoading ? <h1>{loadingMessage}</h1> : (
        <>
          <h1 className="text-3xl">Set your goal</h1>
          <form className="flex flex-col gap-2" onSubmit={handleClick}>
            <label htmlFor="name">What's your name?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              className='text-box'
            />
            <label htmlFor="goal">What do you want to learn and why?</label>
            <textarea
              className="h-48"
              id="goal"
              name="goal"
              value={formValues.goal}
              maxLength={250}
              minLength={20}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="button-primary mt-4"
            >
              Generate Lesson Plan
            </button>
          </form>
        </>
      )}
    </div>
  )
}