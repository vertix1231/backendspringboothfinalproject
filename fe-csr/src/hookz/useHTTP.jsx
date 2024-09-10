import axios from "axios";

const useHTTP = () => {
  const http = axios.create({
    timeout: 25000
  })

  http.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { status } = error.response
      if (status && status === 401) {

      }
      return Promise.reject(error);
    }
  )

  return http
}

export default useHTTP;