import {useUser } from "../routes/UserContext";

export default function Navbar() {
  const { user } = useUser();
  
  return (
    <div className="flex justify-between items-center bg-slate-900 px-10 py-4 w-full ">
      <a href="/" className="text-violet-300 hover:text-violet-400">
      {
        import.meta.env.DEV ? <h1 className="text-lime-300">Testing</h1> : <h1>Never Bored</h1>
      }
      </a>

      {
        user && <a href="/profile" className="text-violet-300 hover:text-violet-400">Profile</a>
      }
    </div>
  )
}
