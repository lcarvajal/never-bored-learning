import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  function handleSignUp() {
    navigate('/learning-overview');
  }
  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <br></br>
      <button className="button-primary">Access Learning Path</button>
    </div>
  )
}