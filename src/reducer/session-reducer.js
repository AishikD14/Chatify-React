const initialState = {
    userName: "",
    profilePic: "",
    lastLoggedIn: ""
};

export const sessionReducer = (state = initialState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case "SessionModule":
            return {
                userName: action.sessionData.userName,
                profilePic: action.sessionData.profilePic,
                lastLoggedIn: action.sessionData.lastLoggedIn
            }
        default:
            return {
                state
            }
    }
}
// export default loginReducer