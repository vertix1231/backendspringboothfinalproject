import {useState} from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const endLoading = () => setLoading(false);
  const startLoading = () => setLoading(true)

  return { loading, endLoading, startLoading }
}

export default useLoading