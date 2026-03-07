let API_BASE_URL = process.env.REACT_APP_API_URL;

// Auto-detect Codespaces URL at runtime
const currentUrl = window.location.href;
if (currentUrl.includes(".github.dev") && (!API_BASE_URL || API_BASE_URL === "undefined" || API_BASE_URL.includes("localhost"))) {
    // Replace -3000.app.github.dev with -8080.app.github.dev/api
    API_BASE_URL = currentUrl.split("-3000")[0] + "-8080" + currentUrl.split("-3000")[1].split("/")[0] + "/api";
}

if (!API_BASE_URL || API_BASE_URL === "undefined") {
    API_BASE_URL = "http://localhost:8080/api";
}

console.log("Using API Base URL:", API_BASE_URL);
export const getProfileImageUrl = (photoName) => {
    if (!photoName) return "/images/Pads.png";
    if (photoName.startsWith("http")) return photoName;
    const base = API_BASE_URL.replace("/api", "");
    return `${base}/uploads/${photoName}`;
};

export default API_BASE_URL;
