
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // Submit handler (no backend, show success only)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    // TODO: send email using backend later
  }

  return (
    <>
      <Navbar />
      <main className="container flex flex-col items-center justify-center min-h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 border border-wood shadow-xl rounded-xl p-8 mt-28 w-full max-w-md flex flex-col gap-5"
        >
          <h1 className="text-2xl font-bold text-burgundy mb-2 font-playfair text-center">
            Reset Password
          </h1>
          <Input
            required
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={sent}
          />
          <Button type="submit" className="w-full" disabled={sent}>
            {sent ? "Sent!" : "Send Reset Link"}
          </Button>
          {sent && (
            <p className="text-green-700 text-xs mt-2">
              If this email exists, you will receive a reset link shortly.
            </p>
          )}
        </form>
      </main>
    </>
  );
};

export default ResetPassword;
