// create axios instance interceptor to mapp error: {message: string} 
// to string

import axios from "axios";

const Axios = 
  axios.create({
    baseURL: "http://localhost:4000/e-buddy-assessment/us-central1/api",
  });

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data || "An error occurred");
    }
    return Promise.reject("An error occurred");
  }
);

export default Axios;