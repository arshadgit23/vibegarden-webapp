import axios from "axios";

// const baseURL = "http://192.168.100.75:3040/api/v1";
const baseURL = "https://vibe-garden-backend.herokuapp.com/api/v1";

export const apiRequest = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

apiRequest.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers.Authorization = !token ? "" : `Bearer ${token}`;
  return config;
});

export const imageURL =
  "https://vibe-garden-development.s3.ap-south-1.amazonaws.com/";
