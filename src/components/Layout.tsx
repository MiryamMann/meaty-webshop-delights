// src/components/Layout.tsx
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "@/i18n";
import Chatbot from "./ChatBot/Chatbot";
const Layout = () => {
  return (
    <I18nProvider>
      <Navbar />
      <Outlet />
      <Chatbot/>
    </I18nProvider>
  );
};

export default Layout;
