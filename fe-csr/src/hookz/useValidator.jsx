import {useState} from "react";
import _ from "lodash";

const useValidator = (initialState) => {
  const [message, setMessage] = useState(initialState);

  const groupErrors = (errors) => {
    return _.chain(errors).groupBy("field").value()
  }

  const except = (error) => {
    console.log(error)
    const { data, status, statusText } = error.response;

    if (status === 400) {
      setMessage(groupErrors(data.subErrors));
    }
  }

  const reset = () => {
    setMessage(initialState);
  }

  const get = (field) => message[field];

  const result = () => message;

  return {except, result, get, reset}
}

export default useValidator;