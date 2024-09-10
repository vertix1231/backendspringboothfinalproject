export const TITLE = "JuaraCoding.com"

export const LIMIT_LIST = 10

export const REDUCER_LIST_ACTIONS = {
  INIT: "INIT",
  EMPTY: "EMPTY",
  PUSH: "PUSH",
  REMOVE: "REMOVE",
  CHANGE: "CHANGE",
}

export const REDUCER_OBJECT_ACTIONS = {
  SET: "SET",
  EMPTY: "EMPTY"
}

export const BASE_URL =  "/api" // import.meta.env.VITE_API_BASE_URL

export const TOKEN_AUTH_PREFIX = {
  BEARER: "Bearer",
  JWT: "JWT",
  NO_PREFIX: "",
}

export const TOKEN_RESOURCES = {
  SESSION_STORAGE: "SESSION_STORAGE",
  LOCAL_STORAGE: "LOCAL_STORAGE"
}

export const TOKEN_RESOURCE_KEYS = {
  ACCESS: "ACCESS",
  TOKEN: "TOKEN",
  REFRESH: "REFRESH"
}

export const TOAST_POSITIONS = {
  TOP: "top",
  BOTTOM: "bottom",
  CENTER: "center",
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
  TOP_START: "top-start",
  TOP_END: "top-end",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_START: "bottom-start",
  BOTTOM_END: "bottom-end",
  CENTER_RIGHT: "center-right",
  CENTER_LEFT: "center-left",
  CENTER_START: "center-start",
  CENTER_END: "center-end",
}

export const TOAST_TIMER = 3000; // ms
export const TOAST_POSITION = TOAST_POSITIONS.CENTER;// untuk mengganti posisi notifikasi message
export const TOKEN_RESOURCE = TOKEN_RESOURCES.LOCAL_STORAGE
export const TOKEN_KEY = TOKEN_RESOURCE_KEYS.TOKEN;
export const TOKEN_PREFIX = TOKEN_AUTH_PREFIX.BEARER;

export const ROOT_PAGE = '/categories';
export const SIGN_IN_PAGE = "/";

export const STATUS_CHOICE_VALUE_PLAN = "PLAN"
export const STATUS_CHOICE_VALUE_USED = "USED"
export const STATUS_CHOICE_VALUE_DONE = "DONE"


