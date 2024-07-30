import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface FormProps {
  accountAction: string
}

export default function PasswordlessEmailLoginForm(props: FormProps = { accountAction: "SIGNIN" }) {
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
        const authUser = result.user;

        if (state) {
          const user: {
            uid: string;
            authentication_service: string;
            name: string;
            email: string | null;
          } = {
            uid: authUser.uid,
            authentication_service: "firebase",
            name: state.name,
            email: authUser.email,
          };

          axios.post('users/', user)
            .then((response) => {
              console.log(response.data);
              axios.post('roadmaps/', { description: state.goal })
              .then((response) => { 
                console.log(response.data);
              }).catch((error) => {
                console.log(error);
              }).finally(() => {
                navigate('/learning-overview');
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else {
          console.log("State not set");
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
    <form className="flex flex-col gap-6 w-full h-full md:w-1/2 text-center mx-auto mt-24 justify-center align-items-center" onSubmit={handleSignUp}>
      <h1 className="text-3xl">
        {props.accountAction === "SIGNUP" ? "Create an account and save your progress" : "Log in"}
      </h1>
      <div>
        <input id="terms-checkbox" className="purple-checkbox w-4 h-4 text-violet-400 bg-gray-100 border-gray-300 rounded focus:ring-violet-600 dark:focus:ring-violet-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4" 
          type="checkbox" 
          required/> 
        <label htmlFor="terms-checkbox">
        I agree to the <a href="/terms-and-conditions" target='_blank' className="text-violet-300 hover:text-violet-400">terms and conditions</a> 
        </label>
      </div>
      <button type="submit" className="mx-auto px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:border-slate-400  hover:text-slate-400 hover:shadow transition duration-150">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>{props.accountAction === "SIGNUP" ? "Sign up" : "Log in"} with Google</span>
      </button>
    </form>
  )
}