import { toast } from "react-toastify";

export const notify_success = (message) => {
    toast.success(message + " success!", {
        position: toast.POSITION.TOP_RIGHT
    });
}

export const notify_fail = (message) => {
    toast.error(message + " fail!", {
        position: toast.POSITION.TOP_RIGHT
    });
}

export const notify_warn = (message) => {
    toast.warn(message + " warn!", {
        position: toast.POSITION.TOP_RIGHT
    });
}

export const notify_info = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_RIGHT
    });
}