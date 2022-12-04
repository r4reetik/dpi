const isDeployment = typeof window !== "undefined" && window.location.hostname !== "localhost";

export const SmartWalletBaseUrl = isDeployment
  ? "https://ethindia-dpi.onrender.com"
  : "http://localhost:4000";
