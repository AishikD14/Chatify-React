export const stateToProps = (state) => {
    return {
        userToken: state.login.userToken
    }  
}

export const DispatchToProps = (dispatch) => {
    return {
        setUser:(user) => {
            console.log(user);
            dispatch({
                type: "LoginModule",
                userToken: user
            })
        }
    }
}