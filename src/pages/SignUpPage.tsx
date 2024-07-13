import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";

export default function SignUpPage() {
  const [didSendEmail, setDidSendEmail] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      // FIXME: - Set url when we host this app
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      handleCodeInApp: true,  // This must be true in order to send user back to website.
      dynamicLinkDomain: 'example.page.link'
    };

    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        setDidSendEmail(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  return (
    <>
      {
        didSendEmail
          ? (
            <div className="text-center">
              <h1>Check your email to log in</h1>
              <p>We sent you an email with a link to log in.</p>
            </div>
          )
          : (
            <form className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3" onSubmit={handleSignUp}>
              <h1 className="text-3xl mb-6">Create an account</h1>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              <div className="my-3">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  className="w-4 h-4 mr-2"
                />
                <label htmlFor="subscribe" className="">Email me about new features</label>
              </div>
              <button
                className="button-primary"
                type="submit"
              >
                Sign up
              </button>
            </form>
          )
      }
    </>
  )
}