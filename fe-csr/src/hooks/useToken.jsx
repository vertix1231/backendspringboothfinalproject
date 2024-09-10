import {TOKEN_KEY, TOKEN_PREFIX, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../config/constants.js";

export default function useToken(withPrefix=true) {

  let token = "";

  if (TOKEN_RESOURCE === TOKEN_RESOURCES.SESSION_STORAGE) {
    token = `${TOKEN_PREFIX} ${sessionStorage.getItem(TOKEN_KEY)}`;
  } else if (TOKEN_RESOURCE === TOKEN_RESOURCES.LOCAL_STORAGE) {
    token = `${TOKEN_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`;
  } else {
    token = `${TOKEN_PREFIX} ${sessionStorage.getItem(TOKEN_KEY)}`;
  }
  return withPrefix ? token : token.split(" ")[1];
}

