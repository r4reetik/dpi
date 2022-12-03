const isDeployment = typeof window !== "undefined" && window.location.hostname !== "localhost";

export const SmartWalletBaseUrl = isDeployment ? "" : "http://localhost:4000";
