import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
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
      {isLoading ? <h3>{loadingMessage}</h3> : (
        <>
          <h5>Write a specific learning goal you want to accomplish</h5>
          <input type="text" placeholder="I want to learn..."></input>
          <br></br>
          <button type="button" onClick={handleClick}>
            Let's go!
          </button>
        </>
      )}
    </div>
  )
}