
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_USER = "admin@meatstore.com";
const ADMIN_PASS = "admin123";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy check (change this with real auth later)
    if (email === ADMIN_USER && pw === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <>
      <main className="container flex flex-col items-center justify-center min-h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 border border-wood shadow-xl rounded-xl p-8 mt-28 w-full max-w-sm flex flex-col gap-5"
        >
          <h1 className="text-2xl font-bold text-burgundy text-center mb-3 font-playfair">
            Admin Login
          </h1>
          <Input
            placeholder="Admin Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Log In
          </Button>
          {error && <div className="text-destructive text-xs">{error}</div>}
        </form>
      </main>
    </>
  );
};

export default AdminLogin;
