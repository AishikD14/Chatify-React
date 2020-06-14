const initialState = {
    userToken: ""
};

export const loginReducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case "LoginModule":
            return {
                userToken: action.userToken
            }
        default:
            return {
                state
            }
    }
}
// export default loginReducer