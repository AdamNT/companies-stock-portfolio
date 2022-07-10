import axios from "axios";

import { BASE_URL } from "@constants/endpoint";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default instance;
