// src/components/Layout.tsx
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "@/i18n";

const Layout = () => {
  return (
    <I18nProvider>
      <Navbar />
      <Outlet />
    </I18nProvider>
  );
};

export default Layout;
