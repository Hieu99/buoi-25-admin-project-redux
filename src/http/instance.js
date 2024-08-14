import axios from "axios";

const SERVER_URL =
  process.env.REACT_APP_BE_URL ?? "https://66698ae32e964a6dfed59006.mockapi.io";

const axiosRequester = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "content-type": "application/json",
  },
});

export default axiosRequester;
