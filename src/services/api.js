class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
    console.log("API Base URL:", this.baseURL);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log("Making request to:", url);

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      mode: "cors",
      ...options,
    };

    try {
      console.log("Request config:", config);
      const response = await fetch(url, config);
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message || `HTTP error! status: ${response.status}`;
        console.error("API Error Response:", errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("API Success Response:", data);
      return { success: true, data };
    } catch (error) {
      console.error("API Request Error:", error);

      // Melhor tratamento de erros de rede
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        return {
          success: false,
          error: "Erro de conexão. Verifique sua internet ou tente novamente.",
        };
      }

      return { success: false, error: error.message };
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: "GET", ...options });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: "DELETE", ...options });
  }

  async login(email, password) {
    return this.post("/login", { email, password });
  }

  async register(email, password, username) {
    return this.post("/register", { email, password, username });
  }
}

const api = new ApiService();
export default api;
