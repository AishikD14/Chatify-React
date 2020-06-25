const initialState = {
    name: "",
    email: "",
    picture: "",
    picVersion: ""
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "chatModule":
            return {
                name: action.name,
                email: action.email,
                picture: action.picture,
                picVersion: action.picVersion
            };
            
        default:
            return state;
            
    }
}