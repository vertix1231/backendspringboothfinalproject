import {REDUCER_OBJECT_ACTIONS} from "../config/constants.js";

const ReducerObject = (state, action) => {
  switch (action.type) {
    case REDUCER_OBJECT_ACTIONS.SET:
      if (state) {
        return {...state, ...action.data};
      } else {
        return {...action.data}
      }
    case REDUCER_OBJECT_ACTIONS.EMPTY:
      return {}
  }
}

export default ReducerObject;