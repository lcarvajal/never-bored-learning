import PasswordlessEmailLoginForm from "../../components/PasswordlessEmailLoginForm"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    posthog.capture('$pageview', { path: location.pathname });
  }, [])

  return (
    <>
      {showSignUpForm ? <PasswordlessEmailLoginForm accountAction="SIGNIN" /> : (
        <div className="flex flex-col gap-6 justify-center align-items-center">
          <img src="./falling-books.png" alt="books" className="w-56 mx-auto -rotate-45 mt-24" />
          <h1>Gather learning resources fast</h1>
          <button className="button-primary w-60 mx-auto" onClick={() => navigate('/create-learner-profile')}>Start</button>
          <button className="text-violet-400" onClick={() => setShowSignUpForm(true)}>Already have an account?</button>
        </div>
      )
      }
    </>
  )
}