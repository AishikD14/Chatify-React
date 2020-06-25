export const setChat = (data) => {
    return{
        type: "chatModule",
        name: data.contact.userName,
        email: data.contact.email,
        picture: data.contact.profilePic,
        picVersion: data.contact.picVersion
    }
};