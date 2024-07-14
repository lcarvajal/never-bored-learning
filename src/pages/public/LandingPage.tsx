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
          <img src="./stick.png" alt="stick" className="w-24 mx-auto" />
          <h1>Stick to your learning goal</h1>
          <button className="button-primary sm:mx-20" onClick={() => navigate('/create-learner-profile')}>Get started</button>
          <button className="text-violet-400" onClick={() => setShowSignUpForm(true)}>Already have an account?</button>
        </div>
      )
      }
    </>
  )
}