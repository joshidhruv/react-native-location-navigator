const initialState = {
    registeredUsers: [], authenticated_user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "CREATING_USER":
            initialState.registeredUsers.push(action.payload)
            return {
                ...state,
            }
        case "AUTHENTICATING_USER":
            return {
                ...state
            }
        case "AUTHENTICATED_USER":
            return {
                ...state, authenticated_user: action.payload
            }
        case "PASSWORD_MISMATCH":
            return {
                ...state, message: action.payload
            }
        case "USER_NOT_FOUND":
            return {
                ...state, message: action.payload
            }
        case "USER_ALREADY_EXISTS":
            return {
                ...state, message: action.payload
            }
        case "REMOVING_USER":
            return {
                ...state, authenticated_user: null
            }
        default:
            return state
    }
}