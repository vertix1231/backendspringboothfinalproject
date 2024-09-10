import useHTTPBase from "./useHTTPBase.jsx";
import {BASE_URL} from "../config/constants.js";
import axios from "axios";

const useHTTPRemove = (endpoint) => {
  const httpBase = useHTTPBase();

  const confirm = (func) => {
    httpBase.message.confirmRemove()
      .then((result) => {
        if (result.isConfirmed) {
          func()
        }
      }).catch((error) => {
        console.log(error);
    })

  }

  const execute = (id) => {
    return new Promise((resolve, reject) => {
      const url = `${BASE_URL}${endpoint}${id}/`;
      const config = {
        headers: {
          ...httpBase.getAuthorizationHeader()
        }
      }

      httpBase.beforeRequest();
      confirm(() => {
        axios.delete(url, config)
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
    })
  }

  return {...httpBase, execute}
}

export default useHTTPRemove;