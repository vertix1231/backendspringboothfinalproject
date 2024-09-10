// import {useContext, useRef} from "react";
// import ContextGeneric from "../contexts/ContextGeneric.jsx";
// import {REDUCER_LIST_ACTIONS, REDUCER_OBJECT_ACTIONS} from "../config/constants.js";

// const PageBudgetList = () => {
//   const { budgets } = useContext(ContextGeneric);
//   const searchRef = useRef();

//   const init = () => {
//     budgets.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.EMPTY});
//   }

//   const httpListBudget = (page, search, filters) => {
//     budgets.http.list.execute(page, search, filters).then((data) => {
//       budgets.reducer.list.dispatch({type: REDUCER_LIST_ACTIONS.INIT, data: data.results});
//       budgets.reducer.pagination.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: data.pagination})
//     }).catch((error) => {
//       console.log(error);
//     })
//   }

//   const onNext = (page) => {
//     httpListBudget(page);
//   }

//   const onPrevious = (page) => {
//     httpListBudget(page);
//   }

//   const onNavigate = () => {}

//   const onSearch = () => {}

//   const hasNext = () => budgets.reducer.pagination.state.next

//   const hasPrevious = () => budgets.reducer.pagination.state.previous


// }