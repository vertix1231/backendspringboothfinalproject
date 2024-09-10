import {useState} from "react";

/**
 *
 * @returns {{toggleError: (function(): void), success: boolean, toggleSuccess: (function(): void), error: boolean}}
 */
const useStatus = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleError = () => setError(!error);
  const toggleSuccess = () => setSuccess(!success);

  return { error, success, toggleError, toggleSuccess }
}

export default useStatus;