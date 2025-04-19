import axios from "axios";

export const checkToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      "https://localhost:5000/api/Auth/Checktoken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the response status is 200 (OK)
    if (response.status === 200) {
      console.log("Ellenőrzés megtörtént, a token érvényes");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
