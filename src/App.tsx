import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ הוספה
import { store } from "./redux/store";

import Layout from "@/components/Layout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PersonalArea from "./pages/PersonalArea";
import Payment from "./pages/Payment";
import ThankYou from "./pages/ThankYou";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BotManagement from "./pages/BotManagement";

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId="225838684875-jk40bq2grfeq8896hnluh37v36fl75bb.apps.googleusercontent.com">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/personal" element={<PersonalArea />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<Recipe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/BotManagement" element={<BotManagement />} />


              </Route>
              {/* דפים בלי Navbar */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  </GoogleOAuthProvider>
);

export default App;
