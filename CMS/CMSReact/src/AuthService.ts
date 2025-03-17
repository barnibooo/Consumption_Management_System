import axios from "axios";

export const checkRefreshToken = async () => {
  const token = localStorage.getItem("refreshToken");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      "https://localhost:5000/api/Auth/checkRefreshToken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    return false;
  }
};
