import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Breaking down learning goal...");
  const navigate = useNavigate();

  async function handleClick() {
    setIsLoading(true);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000);

    setLoadingMessage("Assembling resources based on your profile and learning goal...");

    await delay(3000);

    navigate('/tasks');
  }

  return (
    <div className="">
      {isLoading ? <h1>{loadingMessage}</h1> : (
        <form className="flex flex-col gap-2">
          <h1 className="text-3xl mb-6">Create your learner profile</h1>
          <label htmlFor="goal">What's your name?</label>
          <input
            type="text"
            id="name"
            name="name"
          />
          <label htmlFor="goal">What do you want to learn?</label>
          <textarea
            id="goal"
            name="goal"
            maxLength={200}
            minLength={100}
          >
          </textarea>
          <label htmlFor="reason">Why do you want to learn it?</label>
          <textarea
            id="reason"
            name="reason"
            maxLength={200}
            minLength={100}
          >
          </textarea>
          <label htmlFor="deadline">Do you need to achieve your learning goal by a certain date? (optional)</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value=""
          />
          <label htmlFor="last-learned-description">What's the last thing you learned really well? What worked for you and what didn't?</label>
          <textarea
            className="mb-6"
            id="last-learned-description"
            name="last-learned-description"
            maxLength={400}
            minLength={100}
          >
          </textarea>
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