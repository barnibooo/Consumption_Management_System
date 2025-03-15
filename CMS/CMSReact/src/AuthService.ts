import axios from "axios";

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(
      "https://localhost:5000/api/Auth/refreshToken",
      {
        refreshToken,
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
