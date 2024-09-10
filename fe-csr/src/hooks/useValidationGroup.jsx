import _ from "lodash";

const useValidationGroup = () => {
  const subErrors = (error) => {
    // console.log("ini di use validation group", error)
    return _.chain(error.subErrors).groupBy("field").value()
  }
  return subErrors;
}

export default useValidationGroup;