export const refreshToken = async () => {
  const refreshabletoken = localStorage.getItem("refreshToken");
  console.log(refreshabletoken);
  if (!refreshabletoken) {
    return;
  }

  const response = await fetch("https://localhost:5000/api/Auth/refreshToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshabletoken}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to refresh token");
    return; // Break and do not run multiple times if the response is not OK
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  console.log("Token refreshed");
  console.log(data.refreshToken);

  // Add a return statement to ensure the function exits
  return;
};
