export const refreshToken = async () => {
  const token = localStorage.getItem("refreshToken");
  if (!token) {
    return;
  }

  const response = await fetch("https://localhost:5000/api/Auth/refreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    console.log("Token refreshed");
    console.log(data.refreshToken);
  } else {
    //window.location.href = "/login";
  }
};
