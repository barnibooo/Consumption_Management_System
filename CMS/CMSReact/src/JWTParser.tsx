/**
 * JWT Token Parser Utility
 * Decodes and parses JWT tokens to extract payload information
 */

function parseJwt(token: string): any {
  try {
    // Extract the payload section of the token
    const base64Url = token.split(".")[1];

    // Convert base64url to regular base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    // Parse and return the payload
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return false;
  }
}

export { parseJwt };
