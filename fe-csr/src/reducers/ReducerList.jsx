import {LIMIT_LIST, REDUCER_LIST_ACTIONS} from "../config/constants.js";


export default function ReducerList(state, action) {
  switch (action.type) {
    case REDUCER_LIST_ACTIONS.INIT:
      // dispatch({type: ..., data: {}})
      return [...action.data]
    case REDUCER_LIST_ACTIONS.PUSH:
      // dispatch({type: ..., data: {}})
      if (state.length >= LIMIT_LIST) { state.pop() }
      state.unshift(action.data)
      return state;
    case REDUCER_LIST_ACTIONS.CHANGE:
      // dispatch({type: ..., data: {}})
      return state.map(value => value[action.key] === action.data[action.key] ? action.data : value)
    case REDUCER_LIST_ACTIONS.REMOVE:
      // dispatch({type: ..., data: {}})
      return state.filter(value => value[action.key] !== action.data[action.key]);
    case REDUCER_LIST_ACTIONS.EMPTY:
      // dispatch({data: {}})
      return []
  }
}