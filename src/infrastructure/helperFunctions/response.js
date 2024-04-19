import { STATUS_CODES, ERR_MESSAGE } from "../../constants/httpStatusCode.js";

export function get200Response (data){
    return {
        status: STATUS_CODES.OK,
        success: true,
        data: data
    };
}
export function get400Response (){
    return {
        status: STATUS_CODES.BAD_REQUEST,
        success: true,
        data: null
    };
}
export function get500Response(error) {
    return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: error?.message,
        data: null
    };
}
export function getErrorResponse(statusCode, message) {
    // const message = customMessage || ERR_MESSAGE[errCode] || 'Unknown Error';
    // return {
    //     status: errCode,
    //     message: message,
    //     data: null
    // };
}