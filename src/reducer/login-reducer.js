const initialState = {
    userToken: ""
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LoginModule":
            return {userToken: action.userToken};
            
        default:
            return state;
            
    }
}