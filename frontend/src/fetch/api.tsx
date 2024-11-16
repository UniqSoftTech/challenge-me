import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: 'http://192.168.10.25:8080/',
  headers: {
    "Content-Type": "application/json",
  },
});

const firebaseApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const attachTokenToRequest = async (config: any) => {
  try {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error retrieving token from AsyncStorage:", error);
  }
  return config;
};

api.interceptors.request.use(attachTokenToRequest, (error) =>
  Promise.reject(error),
);

export { api, firebaseApi };
