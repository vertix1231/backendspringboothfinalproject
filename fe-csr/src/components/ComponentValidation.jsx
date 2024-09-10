import {useContext} from "react";
import ContextValidation from "../contexts/ContextValidation.jsx";

const ComponentValidation = () => {
  const [validators, field] = useContext(ContextValidation);

  return (
    <>
      {validators && validators[field] && (
        <ul className={"list-unstyled mt-2"}>
          {validators[field]?.map((value, index) => (
            <li key={index} className={"text-danger"}>{value}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default ComponentValidation

