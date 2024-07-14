import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface FormProps {
  accountAction: string
}

export default function PasswordlessEmailLoginForm(props: FormProps) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const provider = new GoogleAuthProvider();


  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;

        if (state) {
          axios.post('profiles',
            {
              uid: user.uid,
              name: state.name,
              email: user.email,
              goal: state.goal,
              reason: state.reason,
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              navigate('/learning-overview');
            });
        }
        else {
          navigate('/learning-overview');
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <form className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3 text-center" onSubmit={handleSignUp}>
      <h1 className="text-3xl mb-6">
        {props.accountAction === "SIGNUP" ? "Create an account to get your path" : "Log in"}
      </h1>
      <button type="submit" className="mx-auto px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:border-slate-400  hover:text-slate-400 hover:shadow transition duration-150">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>{props.accountAction === "SIGNUP" ? "Sign up" : "Log in"} with Google</span>
      </button>
    </form>
  )
}