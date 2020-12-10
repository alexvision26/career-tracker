import {
    CREATE_USER,
    LOGIN_USER,
    LOG_OUT,
    UPDATE_USER,
    DELETE_USER,
    CREATE_JOB,
    UPDATe_JOB,
    DELETE_JOB,
    CREATE_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT
} from '../actions/index';

export const initialState = {
    user_id: "",
    user_info: {},
    job_board: [],
    contacts: [],
    isLoggedIn: false,
    isFetching: false,
    token: "",
    error: "",
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
            }
        
        case LOGIN_USER:
            return {
                ...state,
                user_info: action.payload
            }

        case UPDATE_USER:
            return {
                ...state,
            }

        case "GET_JOBS":
            console.log(action.payload)
            return {
                ...state,
                job_board: action.payload
            }
        default:
            return state
    }
}