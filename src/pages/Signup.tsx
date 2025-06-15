// src/pages/Signup.tsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientField, setAddressField } from "../redux/clientSlice";
import GoogleLoginButton from "./GoogleLogInButton";
import { Link } from "react-router-dom";
import { ClientPrimitiveKeys } from "../redux/clientSlice";
import type { AddressKeys } from "../redux/clientSlice";


const Signup = () => {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const client = useSelector((state: any) => state.client.client);

const handleChange = (field: ClientPrimitiveKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setClientField({ field, value: e.target.value }));
};

const handleAddressChange = (field: AddressKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setAddressField({ field, value: e.target.value }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7172/api/auth/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const err = await res.json();
        alert(err.message || "הרשמה נכשלה");
      }
    } catch (error) {
      console.error("שגיאה בשליחה לשרת:", error);
      alert("שגיאה בלתי צפויה התרחשה");
    }
  };

  if (isSuccess) {
    return (
      <main className="container py-20 min-h-[60vh] flex items-center justify-center">
        <h1 className="text-3xl font-bold text-green-600 font-playfair">ההרשמה הצליחה!</h1>
      </main>
    );
  }

  return (
    <main className="container py-12 min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
      <div className="bg-card border border-wood rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-burgundy text-center font-playfair mb-4">הרשמה</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input placeholder="שם פרטי" value={client.firstName} onChange={handleChange("firstName")} className="w-full border border-wood rounded-lg p-3" />
          <input placeholder="שם משפחה" value={client.lastName} onChange={handleChange("lastName")} className="w-full border border-wood rounded-lg p-3" />
          <input placeholder="אימייל" type="email" value={client.email} onChange={handleChange("email")} className="w-full border border-wood rounded-lg p-3" />
          <input placeholder="סיסמה" type="password" value={client.password} onChange={handleChange("password")} className="w-full border border-wood rounded-lg p-3" />
          <input placeholder="רחוב" value={client.address.street} onChange={handleAddressChange("street")} className="w-full border border-wood rounded-lg p-3" />
          <input placeholder="עיר" value={client.address.city} onChange={handleAddressChange("city")} className="w-full border border-wood rounded-lg p-3" />
          <input placeholder="מיקוד" value={client.address.zipCode} onChange={handleAddressChange("zipCode")} className="w-full border border-wood rounded-lg p-3" />
          <input placeholder="מספר בניין" value={client.address.buildingNumber} onChange={handleAddressChange("buildingNumber")} className="w-full border border-wood rounded-lg p-3" />
          <button type="submit" className="w-full bg-burgundy text-white rounded-lg py-3 hover:bg-black transition-all duration-150">הרשמה</button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-wood" />
          <span className="mx-3 text-wood font-playfair text-sm">או</span>
          <div className="flex-grow border-t border-wood" />
        </div>

        <GoogleLoginButton />

        <p className="text-center text-wood mt-4">
          כבר רשום?{" "}
          <Link to="/login" className="text-burgundy font-semibold hover:underline">
            התחברות
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
