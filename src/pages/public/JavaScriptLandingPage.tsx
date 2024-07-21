import PasswordlessEmailLoginForm from "../../components/PasswordlessEmailLoginForm"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jsImage from "../../assets/javascript.png"

export default function LandingPage() {
  const navigate = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <>
      {showSignUpForm ? <PasswordlessEmailLoginForm accountAction="SIGNIN" /> : (
        <div className="flex flex-col gap-6">
          <img src={jsImage} alt="javascript logo" className="w-32 mx-auto rounded-xl" />
          <h1>Get resources to master JavaScript fast</h1>
          <button className="button-primary sm:mx-20" onClick={() => navigate('/create-learner-profile', { state: { goal: "I want to learn JavaScript because I " } })}>Start</button>
          <button className="text-violet-400" onClick={() => setShowSignUpForm(true)}>Already have an account?</button>
        </div>
      )
      }
    </>
  )
}