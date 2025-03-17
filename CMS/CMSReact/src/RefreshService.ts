export const refreshToken = async () => {
  const token = localStorage.getItem("token");
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
    localStorage.setItem("token", data.newToken);
  } else {
    window.location.href = "/login.html";
  }
};
