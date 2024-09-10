import useHTTPBase from "./useHTTPBase.jsx";
import {BASE_URL} from "../config/constants.js";

const useHTTPCreate = (endpoint) => {
  const httpBase = useHTTPBase();

  const execute = (data, params) => {
    return new Promise((resolve, reject) => {
      const url = `${BASE_URL}${endpoint}`;
      const config = {
        headers: {
          ...httpBase.getAuthorizationHeader()
        },
        params,
      }

      httpBase.beforeRequest();

      httpBase.http.post(url, data, config)
        .then((response) => {
          resolve(response.data);
          //untuk mengakses object response ,format bawaan axios adalah pakai .data
          console.log(response);
          httpBase.afterRequestSuccess(response)
        }).catch((error) => {
          console.log("error native", error);
          reject(error.response?.data);
          httpBase.afterRequestError(error);
        }).finally(() => {
          httpBase.afterRequest()
        });
    })
  }

  return { ...httpBase, execute }
}

export default useHTTPCreate;