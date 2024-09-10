import Swal from "sweetalert2";
import {TOAST_POSITION, TOAST_TIMER} from "../config/constants.js";

/**
 *
 * @returns {{messageSuccess: (function(*): Promise<SweetAlertResult<Awaited<any>>>), messageError: (function(*): Promise<SweetAlertResult<Awaited<any>>>), confirmRemove: (function(): Promise<SweetAlertResult<Awaited<any>>>)}}
 */
const useMessage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: TOAST_POSITION,
    showConfirmButton: false,
    timer: TOAST_TIMER,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const success = (message) => {
    return Toast.fire({icon: "success", title: message})
  }

  const warning = (message) => {
    return Toast.fire({icon: "warning", title: message})
  }

  const confirmRemove = () => {
    return Swal.fire({
      title: 'Are you sure you want to delete this data!',
      text: 'This will delete this data permanently. You cannot undo this action.',
      icon: 'warning',
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: 'No!',
      confirmButtonText: 'Yes, Sure',
    })
  }

  const messageError = (message) => {
    //title : adalah bawaan TOAST
    return Toast.fire({icon: "warning", title: message})
  }

  const messageSuccess = (message) => {
    return Toast.fire({icon: "success", title: message ? message : "Congratulations 🎉🎉🎉 ..."})
  }

  return {confirmRemove, messageSuccess, messageError}
}

export default useMessage;