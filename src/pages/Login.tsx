import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClient, clearRedirectTarget } from "../redux/userSlice";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLogInButton"; // ← ודא שהנתיב נכון

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectTarget = useSelector((state: any) => state.user.redirectTarget);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("https://localhost:7172/api/auth/LogIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      const { token, refreshToken, clientId, addressId, client } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("clientId", clientId);
      localStorage.setItem("addressId", addressId);
      localStorage.setItem("client", JSON.stringify(client));

      dispatch(setClient({ clientId, token, refreshToken, addressId, client }));

      if (redirectTarget) {
        dispatch(clearRedirectTarget());
        navigate(redirectTarget);
      } else {
        navigate("/logInSuccsess");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container py-12 min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
      <div className="bg-card border border-wood rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-burgundy text-center font-playfair mb-4">Sign In</h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-wood font-playfair mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
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
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full border border-wood/40 rounded-lg p-3 bg-background text-wood font-playfair focus:outline-none focus:ring-2 focus:ring-burgundy ring-offset-2 transition"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            className="w-full bg-burgundy hover:bg-black text-white font-semibold rounded-lg py-3 shadow-lg transition-all duration-150 hover:scale-105 font-playfair tracking-wider text-lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && <div className="text-red-500 font-playfair text-sm text-center">{error}</div>}

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-wood" />
          <span className="mx-3 text-wood font-playfair text-sm">or</span>
          <div className="flex-grow border-t border-wood" />
        </div>

        {/* ← כאן הכנסנו את קומפוננטת Google */}
        <GoogleLoginButton />

        <p className="text-center text-wood mt-4">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-burgundy font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
