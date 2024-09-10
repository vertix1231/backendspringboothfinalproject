import {useReducer} from "react";
import ReducerList from "../reducers/ReducerList.jsx";
import ReducerObject from "../reducers/ReducerObject.jsx";
import useHTTPList from "./useHTTPList.jsx";
import useHTTPCreate from "./useHTTPCreate.jsx";
import useHTTPDetail from "./useHTTPDetail.jsx";
import useHTTPUpdate from "./useHTTPUpdate.jsx";
import useHTTPRemove from "./useHTTPRemove.jsx";
import useNativeDate from "./localizations/useNativeDate.jsx";
import useNativeDatetime from "./localizations/useNativeDatetime.jsx";
import useNativeCurrency from "./localizations/useNativeCurrency.jsx";
import useCustomHTTPCreateParam from "./customs/useCustomHTTPCreateParam.jsx";

const useInjector = () => {
  const injection = (f) => {
    const [state, dispatch] = f;
    return {state, dispatch};
  }

  const endpointBuilder = (endpoints) => {
    return `/${endpoints.join("/")}/`
  }

  const injectHTTP = (endpoints) => {
    return {
      http: {
        list: useHTTPList(endpointBuilder(endpoints)),
        create: useHTTPCreate(endpointBuilder(endpoints)),
        detail: useHTTPDetail(endpointBuilder(endpoints)),
        update: useHTTPUpdate(endpointBuilder(endpoints)),
        remove: useHTTPRemove(endpointBuilder(endpoints)),
        custom: {
          create: useCustomHTTPCreateParam(endpointBuilder(endpoints))
        }
      }
    }
  }

  const injectReducer = () => {
    return {
      reducer: {
        list: injection(useReducer(ReducerList, [])),
        objects: injection(useReducer(ReducerObject, {})),
        pagination: injection(useReducer(ReducerObject, {})),
        params: injection(useReducer(ReducerObject, {
          page: 0,
          sort: "",
          sortby: "",
          columnFirst: "",
          valueFirst: "",
          sizeComponent: ""
        }))
      }
    }
  }

  const injectServices = () => {
    return {
      localization: {
        date: useNativeDate(),
        datetime: useNativeDatetime(),
        currency: useNativeCurrency(),
      },
    }
  }

  return { injectHTTP, injectReducer, injectServices }
}

export default useInjector;