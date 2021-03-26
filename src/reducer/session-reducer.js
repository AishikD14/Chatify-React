const initialState = {
    userName: "",
    profilePic: "",
    lastLoggedIn: "",
    picVersion: "",
    email: "",
    chatView: "",
    contactView: "active"
};

export const sessionReducer = ( state = initialState, action) => {
    switch (action.type) {
        case "SessionModule":
            return {
                userName: action.sessionData.userName,
                profilePic: action.sessionData.profilePic,
                lastLoggedIn: action.sessionData.lastLoggedIn,
                picVersion: action.sessionData.picVersion,
                email: action.sessionData.email,
                chatView: state.chatView,
                contactView: state.contactView
            }
        case "ViewModule":
            return{
                userName: state.userName,
                profilePic: state.profilePic,
                lastLoggedIn: state.lastLoggedIn,
                picVersion: state.picVersion,
                email: state.email,
                chatView: action.view.chat,
                contactView: action.view.contact
            }
        default:
            return state
            
    }
}