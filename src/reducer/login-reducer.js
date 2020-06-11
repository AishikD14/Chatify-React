const initialState = {
    username: ""
};

export const loginReducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case "LoginModule":
            return {
                username: action.username
            }
        default:
            return {
                state
            }
    }
}
// export default loginReducer