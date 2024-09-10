import {useState} from "react";

const useValidator = () => {
  const [validator, setValidator] = useState({});

  const empty = () => {
    setValidator({})
  }

  return {validator, setValidator, empty}
}

export default useValidator;