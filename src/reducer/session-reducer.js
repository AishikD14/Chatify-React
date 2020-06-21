const initialState = {
    userName: "",
    profilePic: "",
    lastLoggedIn: "",
    picVersion: ""
};

export const sessionReducer = ( state = initialState, action) => {
    switch (action.type) {
        case "SessionModule":
            return {
                userName: action.sessionData.userName,
                profilePic: action.sessionData.profilePic,
                lastLoggedIn: action.sessionData.lastLoggedIn,
                picVersion: action.sessionData.picVersion
            }
        default:
            return state
            
    }
}