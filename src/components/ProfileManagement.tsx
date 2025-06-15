
import React, { useEffect, useState } from "react";

type ProfileState = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

const STORAGE_KEY = "profile_info";

const getInitialProfile = (): ProfileState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  return { name: "", email: "", address: "", phone: "" };
};

const ProfileManagement: React.FC = () => {
  const [profile, setProfile] = useState<ProfileState>(getInitialProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getInitialProfile());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <section className="bg-card border border-wood rounded-xl p-6 my-8 max-w-xl mx-auto">
      <h2 className="text-xl font-playfair font-bold text-burgundy mb-4">Update Profile</h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block text-wood font-semibold mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-background"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-wood font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 bg-background"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-wood font-semibold mb-1">Address</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 bg-background"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Shipping Address"
          />
        </div>
        <div>
          <label className="block text-wood font-semibold mb-1">Phone</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2 bg-background"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>
        <button
          type="submit"
          className="bg-burgundy text-white rounded px-5 py-2 font-semibold hover:bg-black transition"
        >
          Save Changes
        </button>
        {saved && <div className="mt-2 text-green-600">Profile Saved!</div>}
      </form>
    </section>
  );
};

export default ProfileManagement;
