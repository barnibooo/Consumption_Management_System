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

    console.log("Token refreshed successfully");
    return true;
  } catch (error) {
    console.log(error);
    localStorage.clear();
    window.location.href = "/login";
    return false;
  }
};
