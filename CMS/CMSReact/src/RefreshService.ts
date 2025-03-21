import axios from "axios";

export const refreshToken = async () => {
  const refreshabletoken = localStorage.getItem("refreshToken");
  if (!refreshabletoken) {
    return false;
  }

  try {
    const response = await axios.post(
      "https://localhost:5000/api/Auth/refreshToken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshabletoken}`,
        },
      }
    );

    const data = response.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);

    // Add a return statement to ensure the function exits
    return true;
  } catch (error) {
    localStorage.clear();
    window.location.href = "/login";
    console.error("Failed to refresh token", error);
    return false; // Break and do not run multiple times if the response is not OK
  }
};
