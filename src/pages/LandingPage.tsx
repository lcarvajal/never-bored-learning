import './LandingPage.css'
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <input type="text" placeholder="I want to learn..."></input>
      <br></br>
      <Link to="/tasks">
        <button type="button">
          Let's go!
        </button>
      </Link>
    </div>
  )
}