import axios from "axios";

export const Getrolefortocken = async () => {
  const token = localStorage.getItem("Token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      "https://localhost:5000/api/Auth/getrole",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    console.log("Role received successfully");
    return data.Role;
  } catch (error) {
    return false;
  }
};
