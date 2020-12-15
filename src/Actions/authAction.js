export const createUser = (data) => (dispatch, getState) => {
    dispatch({ type: "CREATING_USER", payload: data })
    // const { registeredUsers } = getState().auth
    // let index = registeredUsers[registeredUsers.length - 1]
    // registeredUsers.forEach(user => {
    //     if (user.email === data.email) {
    //         dispatch({ type: "USER_ALREADY_EXISTS", payload: "USER_ALREADY_EXISTS" })
    //     }
    //     else if (user === index && data !== index) {
    //         dispatch({ type: "CREATING_USER", payload: data })
    //     }
    // })

}

export const userLogin = (data) => (dispatch, getState) => {
    dispatch({ type: "AUTHENTICATING_USER", payload: data })
    const { registeredUsers } = getState().auth
    let index = registeredUsers[registeredUsers.length - 1]
    registeredUsers.forEach(user => {
        if (user.email === data.email) {
            if (user.password === data.password) {
              dispatch({ type: "AUTHENTICATED_USER", payload: data })
            }
            else {
             dispatch({ type: "PASSWORD_MISMATCH", payload: "PASSWORD_MISMATCH" })
            }
        }
        if (user === index && data !== index) {
         dispatch({ type: "USER_NOT_FOUND", payload: "USER_NOT_FOUND" })
        }
    })
    dispatch()
}

export const userLogout = () => dispatch => {
    dispatch({ type: "REMOVING_USER" })
}