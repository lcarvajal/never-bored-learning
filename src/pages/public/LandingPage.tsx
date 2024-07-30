import PasswordlessEmailLoginForm from "../../components/PasswordlessEmailLoginForm"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <>
      {showSignUpForm ? <PasswordlessEmailLoginForm accountAction="SIGNIN" /> : (
        <div className="flex flex-col gap-6 h-full justify-center">
          <img src="./falling-books.png" alt="books" className="w-56 mx-auto -rotate-45" />
          <h1>Gather learning resources fast</h1>
          <button className="button-primary sm:mx-20" onClick={() => navigate('/create-learner-profile')}>Start</button>
          <button className="text-violet-400" onClick={() => setShowSignUpForm(true)}>Already have an account?</button>
        </div>
      )
      }
    </>
  )
}