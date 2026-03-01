import API_BASE_URL from "../apiConfig";
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/auth/login-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    // ✅ Check if response is successful before parsing JSON
    if (!response.ok) {
      return { success: false, message: "Invalid credentials or server error." };
    }

    const data = await response.json();
    console.log("Response Data:", data);

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));  // ✅ Store user info
      localStorage.setItem("token", data.token);  // ✅ Store token
      console.log("🟡 Sending request to API...admin layout");
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message || "Login failed." };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Server error. Please try again." };
  }
};

export default loginUser;
