const initialState = {
    showChat: false,
    showContact: false
};

export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case "roomChatModule":
            return {
                showChat: true,
                showContact: false
            };
        case "roomContactModule":
            return {
                showChat: false,
                showContact: true
            }; 
        default:
            return state;
            
    }
}