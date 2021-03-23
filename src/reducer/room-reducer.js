const initialState = {
    showChat: false
};

export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case "roomModule":
            return {
                showChat: action.showChat
            };
            
        default:
            return state;
            
    }
}