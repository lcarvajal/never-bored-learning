import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  function handleSignUp() {
    navigate('/learning-overview');
  }
  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <br></br>
      <button className="button-primary" onClick={handleSignUp}>Access Learning Path</button>
    </div>
  )
}