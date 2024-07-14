import PasswordlessEmailLoginForm from "../../components/PasswordlessEmailLoginForm"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <>
      {showSignUpForm ? <PasswordlessEmailLoginForm accountAction="SIGNIN" /> : (
        <div className="flex flex-col gap-6">
          <h1>Ready to stick to your learning goal?</h1>
          <button className="button-primary sm:mx-20" onClick={() => navigate('/create-learner-profile')}>Get Started</button>
          <button className="text-violet-400" onClick={() => setShowSignUpForm(true)}>Already have an account?</button>
        </div>
      )
      }
    </>
  )
}