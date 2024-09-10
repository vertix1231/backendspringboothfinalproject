import useHTTPBase from "../useHTTPBase.jsx";
import { BASE_URL } from "../../config/constants.js";

const useCustomHTTPCreateParam = (endpoint) => {
  const httpBase = useHTTPBase();

  const execute = (params) => {
    return new Promise((resolve, reject) => {
      const url = `${BASE_URL}${endpoint}/`;
      const config = {
        headers: {
          ...httpBase.getAuthorizationHeader()
        },
        params: {...params}
      }

      httpBase.beforeRequest();

      httpBase.http.post(url, null, config)
        .then((response) => {
          resolve(response.data);
          //untuk mengakses object response ,format bawaan axios adalah pakai .data
          console.log(response);
          httpBase.afterRequestSuccess(response)
        }).catch((error) => {
          reject(error.response?.data);
          httpBase.afterRequestError(error);
        }).finally(() => {
          httpBase.afterRequest()
        });
    })
  }

  return { ...httpBase, execute }
}

export default useCustomHTTPCreateParam;