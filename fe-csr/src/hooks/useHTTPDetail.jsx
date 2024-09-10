import useHTTPBase from "./useHTTPBase.jsx";
import axios from "axios";
import {BASE_URL} from "../config/constants.js";

const useHTTPDetail = (endpoint) => {
  const httpBase = useHTTPBase();

  const execute = (id) => {
    const url = `${BASE_URL}${endpoint}${id}/`;
    const config = {
      headers: {
        ...httpBase.getAuthorizationHeader()
      },
    }

    httpBase.beforeRequest();

    return new Promise((resolve, reject) => {
      axios.get(url, config)
        .then((response) => {
          resolve(response.data);
          httpBase.afterRequestSuccess(response)
        }).catch((error) => {
          reject(error.response?.data);
          httpBase.afterRequestError(error);
        }).finally(() => {
          httpBase.afterRequest()
        })
    });
  }

  return { ...httpBase, execute }
}

export default useHTTPDetail;