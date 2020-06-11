export const stateToProps = (state) => {
    return {
        userId: state.login.username
    }  
}

export const DispatchToProps = (dispatch) => {
  return {
      setUser:(user) => {
          console.log(user);
          dispatch({
              type: "LoginModule",
              username: user
          })
      }
  }
}