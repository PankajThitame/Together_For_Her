let API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL || API_BASE_URL === "undefined") {
    API_BASE_URL = "http://localhost:8080/api";
}

export default API_BASE_URL;
