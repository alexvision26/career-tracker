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
    board_columns: [],
    contacts: [],
    isLoggedIn: false,
    isFetching: false,
    token: "",
    error: "",
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return {
                ...state,
                isLoggedIn: true
            }
        case "LOGGED_OUT":
            return {
                ...state,
                isLoggedIn: false
            }

        case CREATE_USER:
            return {
                ...state,
            }
        
        case LOGIN_USER:
            return {
                ...state,
                user_info: action.payload,
                isLoggedIn: true
            }

        case UPDATE_USER:
            return {
                ...state,
            }

        case "GET_JOBS":
            return {
                ...state,
                job_board: action.payload
            }

        case "DELETE_JOB":
            console.log(action.payload)
            return {
                ...state,
                job_board: state.job_board.filter(el => {
                    return el._id !== action.payload
                })
            }

        case "CREATE_JOB":
            return {
                ...state,
                job_board: [...state.job_board, action.payload]
            }
        default:
            return state
    }
}