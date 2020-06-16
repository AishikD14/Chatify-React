export const stateToProps = (state) => {
    return {
        userToken: state.login.userToken,
        userName: state.session.userName,
        profilePic: state.session.profilePic,
        lastLoggedIn: state.session.lastLoggedIn
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
        },
        setSession:(session) => {
            console.log(session);
            dispatch({
                type: "SessionModule",
                sessionData: {
                    userName: session.userName,
                    profilePic: session.profilePic,
                    lastLoggedIn: session.lastLoggedIn
                }
            })
        }
    }
}