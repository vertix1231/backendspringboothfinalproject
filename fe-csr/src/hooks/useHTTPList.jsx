import useHTTPBase from "./useHTTPBase.jsx";
import {BASE_URL} from "../config/constants.js";

const useHTTPList = (endpoint) => {
  const httpBase = useHTTPBase();

  const removeDuplicateQueryParam = (url) => {
    let [path, params] = url.split("?");
    let result = path + '?' + new URLSearchParams(Object.fromEntries(new URLSearchParams(params))).toString()
    console.log(result)
    return result
  }

  const execute = (params) => {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        ...httpBase.getAuthorizationHeader()
      },
      params: { ...params, },
    }

    httpBase.beforeRequest();

    return new Promise((resolve, reject) => {
      httpBase.http.get(url, config)
        .then((response) => {
          // const { results, ...pagination } = response.data;
          resolve(response);
          // httpBase.afterRequestSuccess(response)
        }).catch((error) => {
          reject(error);
          httpBase.afterRequestError(error);
        }).finally(() => {
          httpBase.afterRequest()
        })
    });
  }

  return { ...httpBase, execute }
}

export default useHTTPList;