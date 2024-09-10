import useHTTPBase from "./useHTTPBase.jsx";
import {BASE_URL} from "../config/constants.js";
import axios from "axios";

const useHTTPUpdate = (endpoint) => {
  const httpBase = useHTTPBase();

  const execute = (data, id) => {
    return new Promise((resolve, reject) => {
      const url = `${BASE_URL}${endpoint}${id}/`;
      const config = {
        headers: {
          ...httpBase.getAuthorizationHeader()
        }
      }

      httpBase.beforeRequest();

      axios.put(url, data, config)
        .then((response) => {
          resolve(response.data);
          httpBase.afterRequestSuccess(response)
        }).catch((error) => {
          reject(error.response?.data);
          httpBase.afterRequestError(error);
        }).finally(() => {
          httpBase.afterRequest()
        });
    })
  }

  return {...httpBase, execute}
}

export default useHTTPUpdate;