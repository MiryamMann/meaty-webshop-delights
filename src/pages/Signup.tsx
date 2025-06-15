
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Signup = () => (
  <>
    <Navbar />
    <main className="container py-12 min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
      <div className="bg-card border border-wood rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-burgundy text-center font-playfair mb-4">Sign Up</h1>
        <form className="space-y-5">
          <div>
            <label className="block text-wood font-playfair mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border border-wood/40 rounded-lg p-3 bg-background text-wood font-playfair focus:outline-none focus:ring-2 focus:ring-burgundy ring-offset-2 transition"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-wood font-playfair mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full border border-wood/40 rounded-lg p-3 bg-background text-wood font-playfair focus:outline-none focus:ring-2 focus:ring-burgundy ring-offset-2 transition"
              autoComplete="new-password"
              required
            />
          </div>
          <button
            className="w-full bg-burgundy hover:bg-black text-white font-semibold rounded-lg py-3 shadow-lg transition-all duration-150 hover:scale-105 font-playfair tracking-wider text-lg"
            type="submit"
            disabled
            title="Plug in your backend to enable signup"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-wood" />
          <span className="mx-3 text-wood font-playfair text-sm">or</span>
          <div className="flex-grow border-t border-wood" />
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 bg-wood text-black font-semibold rounded-lg py-3 shadow hover:bg-burgundy hover:text-white transition-all duration-150 hover:scale-105 font-playfair"
          type="button"
          disabled
          title="Connect Google OAuth on backend"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <g>
              <path d="M44.5,20H24v8.5h11.6 c-1.6,4.5-5.9,7.5-11.6,7.5c-7.1,0-12.8-5.8-12.8-12.9c0-7.1,5.7-12.9,12.8-12.9 c3,0,5.6,1,7.7,2.7l6.4-6.3C36.3,6.5,30.6,4,24,4C12.9,4,4,12.9,4,24c0,11.1,8.9,20,20,20c11.1,0,19.8-8.7,19.8-19.8 c0-1.3-0.1-2.2-0.3-3.2H44.5z" fill="#FFC107"/>
              <path d="M6.3,14.6l7,5.1C15.5,16.7,19.4,14,24,14c3,0,5.6,1,7.7,2.7l6.4-6.3C36.3,6.5,30.6,4,24,4 c-7,0-12.9,3.1-16.7,8.1L6.3,14.6z" fill="#FF3D00"/>
              <path d="M24,44c6.4,0,11.6-2.1,15.5-5.7l-7.1-5.8c-2.1,1.4-4.7,2.2-8.4,2.2c-5.7,0-10.5-3-11.8-7.4l-7,5.1
                C7,39.8,14.8,44,24,44z" fill="#4CAF50"/>
              <path d="M44.5,20H24v8.5h11.6c-0.6,1.8-1.7,3.3-3.1,4.6c0,0,0,0,0,0l7.1,5.8C42.1,40.2,44.5,32.5,44.5,20z" fill="#1976D2"/>
            </g>
          </svg>
          Sign up with Google
        </button>
        <p className="text-center text-wood mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-burgundy font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  </>
);

export default Signup;
