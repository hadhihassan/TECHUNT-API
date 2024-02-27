import { STATUS_CODES, ERR_MESSAGE } from "../../constants/httpStatusCode.js";

export function get200Response (){
    return {
        status: STATUS_CODES.OK,
        message: 'Success',
        data: data
    };
}
export function get500Response(error) {
    console.log(error, 'error 500');
    return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null
    };
}
export function getErrorResponse() {
    const message = customMessage || ERR_MESSAGE[errCode] || 'Unknown Error';
    return {
        status: errCode,
        message: message,
        data: null
    };
}