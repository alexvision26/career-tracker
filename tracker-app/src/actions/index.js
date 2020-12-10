import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

//ACCOUNT ACTIONS
export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_USER = "UPDATE_USER";

export const DELETE_USER = "DELETE_USER";

//JOB BOARD ACTIONS
export const CREATE_JOB = "CREATE_JOB";
export const UPDATE_JOB = "UPDATE_JOB";
export const DELETE_JOB = "DELETE_JOB";

//CONTACT BOOK ACTIONS
export const CREATE_CONTACT = "CREATE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";

export const userSignup = account => dispatch => {
    dispatch({ type: CREATE_USER })
}

// export const userLogin = account => dispatch => {
//     console.log("ran")
//     // axios.post("http://localhost:5000/api/auth/login", account)
//     // .then(res => {
//     //     console.log(res)
//     // })
// }