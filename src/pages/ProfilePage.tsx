import { useState } from 'react';
import { auth } from '../util/firebase';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [didCopy, setDidCopy] = useState(false);

  const navigate = useNavigate();

  function handleSignOut() {
    auth.signOut().then(() => {
      navigate('/get-started');
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-1/3 text-start mx-auto">
      <h1 className="font-normal">About</h1>
      <p>This site is built by <a className="text-violet-300 hover:text-violet-400" href="https://lcarvajal.github.io" target="_blank">Lukas</a> on nights and weekends</p>
      <p>Follow him on <a className="text-violet-300 hover:text-violet-400" href="https://x.com/carvajalapeno" target="_blank">Twitter</a> for product updates</p>
      <p>Or let him know how to improve at lukascarvajal@gmail.com</p>
      <button className="button-primary" onClick={() => {
        navigator.clipboard.writeText('lukascarvajal@gmail.com');
        setDidCopy(true);
        } }>{didCopy ? 'Copied!' : 'Copy email address'}</button>


      <h1 className="font-normal mt-8">Profile</h1>
      <p>Get bored again</p>
      <button className="button-lowkey" onClick={() => navigate('/cancel-subscription')}>
        Cancel Subscription
      </button>
      <p>Sign out</p>
      <button className="button-lowkey" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}