export const stateToProps = (state) => {
    return {
        userToken: state.login.userToken,
        userName: state.session.userName,
        profilePic: state.session.profilePic,
        lastLoggedIn: state.session.lastLoggedIn,
        picVersion: state.session.picVersion,
        email: state.session.email,
        chatView: state.session.chatView,
        contactView: state.session.contactView
    } 
}

export const DispatchToProps = (dispatch) => {
    return {
        setUser:(user) => {
            dispatch({
                type: "LoginModule",
                userToken: user
            })
        },
        setSession:(session) => {
            dispatch({
                type: "SessionModule",
                sessionData: {
                    userName: session.userName,
                    profilePic: session.profilePic,
                    lastLoggedIn: session.lastLoggedIn,
                    picVersion: session.picVersion,
                    email: session.email
                }
            })
        }
    }
}