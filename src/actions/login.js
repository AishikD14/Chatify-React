export const setUser = (user) => {
    return{
        type: "LoginModule",
        userToken: user
    }
};