import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";

export default function SignInPage() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Confirm the link is a sign-in with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device; ask for email
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email!, window.location.href)
        .then((result) => {
          console.log(result);
          window.localStorage.removeItem('emailForSignIn');
          navigate('/learning-overview');  // Redirect to your desired route
        })
        .catch((error) => {
          console.error(error.code, error.message);
        });
    }
  }, [auth, navigate]);

  return (
    <div className="text-center">
      <h1>Signing you in...</h1>
    </div>
  );
}
