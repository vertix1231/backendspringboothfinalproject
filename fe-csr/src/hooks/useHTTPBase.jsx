import useToken from "./useToken.jsx";
import useValidator from "./useValidator.jsx";
import useStatus from "./useStatus.jsx";
import useLoading from "./useLoading.jsx";
import useMessage from "./useMessage.jsx";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {SIGN_IN_PAGE} from "../config/constants.js";


const useHTTPBase = () => {
  const token = useToken();
  const validator = useValidator()
  const status = useStatus();
  const loading = useLoading();
  const message = useMessage();
  const http = axios.create();
  const navigate = useNavigate();
  const location = useLocation();

  const beforeRequest = () => {
    loading.startLoading();
    status.toggleError();
    status.toggleSuccess();
    validator.empty();
  }

  const afterRequest = () => {
    loading.endLoading();
  }

  const afterRequestError = (error) => {
    status.toggleError();
    validator.setValidator(error.response?.data);
    message.messageError(error.response?.data?.message);
  }

  const afterRequestSuccess = (response) => {
    message.messageSuccess(response.data.message);
  }

  const getAuthorizationHeader = () => {
    return {
      Authorization: token
    }
  }

  const getAuthHeader = (t) => {
    return {
      Authorization: t
    }
  }


  http.defaults.timeout = 25000;

  http.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  })

  http.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response.status === 401) {
      navigate(SIGN_IN_PAGE, { state: { path:  location.pathname} })
    }
    return Promise.reject(error);
  })

  return {
    validator,
    status,
    loading,
    message,
    http,
    getAuthHeader,
    beforeRequest,
    getAuthorizationHeader,
    afterRequestError,
    afterRequestSuccess,
    afterRequest,
  }
}

export default useHTTPBase;