import { auth } from '../util/firebase';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();

  function handleSignOut() {
    auth.signOut().then(() => {
      navigate('/get-started');
    });
  }

  return (
    <div>
      <button className="button-primary" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}