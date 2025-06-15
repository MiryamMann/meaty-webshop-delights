import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClientField, setAddressField } from "../redux/clientSlice"; // ← לפי הפיצול שלך
import { setClient } from "../redux/userSlice";

function GoogleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse?.credential;
    console.log("💡 Sending token to server:", googleToken);

    if (!googleToken) {
      console.error("❌ No token received from Google");
      return;
    }

    try {
      const response = await fetch("https://localhost:7172/api/auth/Google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IdToken: googleToken })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("❌ Server rejected token:", data.message || data);
        return;
      }

      console.log("✅ Google login success:", data);

      if (data.token && data.refreshToken) {
        dispatch(setClient({
          token: data.token,
          refreshToken: data.refreshToken,
          clientId: data.clientId,
          addressId: data.addressId,
        }));
      }

      const client = data.client || data;
      console.log("👤 dispatching client fields...", client);
      dispatch(setClientField({ field: "clientId", value: client.id }));
      dispatch(setClientField({ field: "firstName", value: client.firstName }));
      dispatch(setClientField({ field: "lastName", value: client.lastName }));
      dispatch(setClientField({ field: "email", value: client.email }));
      dispatch(setClientField({ field: "phoneNumber", value: client.phoneNumber || "" }));

      if (client.address) {
        dispatch(setAddressField({ field: "street", value: client.address.street || "" }));
        dispatch(setAddressField({ field: "city", value: client.address.city || "" }));
        dispatch(setAddressField({ field: "zipCode", value: client.address.zipCode || "" }));
        dispatch(setAddressField({ field: "buildingNumber", value: client.address.buildingNumber || "" }));
      }

      navigate("/PersonalArea");

    } catch (err) {
      console.error("🔥 Error during Google login:", err);
    }
  };

  return (
    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.error("❌ Google login failed (user cancelled or error)");
        }}
      />
    </div>
  );
}

export default GoogleLoginButton;
