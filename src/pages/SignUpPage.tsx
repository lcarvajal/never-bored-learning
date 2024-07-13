import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  function handleSignUp() {
    navigate('/learning-overview');
  }
  return (
    <form className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-3xl mb-6">Create an account</h1>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        name="password"
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
        type="button"
        onClick={handleSignUp}
      >
        Sign up
      </button>
    </form>
  )
}