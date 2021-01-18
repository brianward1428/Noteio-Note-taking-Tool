import UserService from "../services/UserService";

/**
 *
 *  THIS IS WHERE WE WILL PUT ALL OF OUR FUNCTIONS FOR DEALING WITH USERS.
 *
 */
let userService = new UserService();



 export const getAllUsers = (dispatch) => {
    console.log("okay about to call userService..");
    userService.getAllUsers().then(res =>
                                   {
                                       dispatch({type: 'SET_USERS', users: res});
                                       console.log("results =", res);
                                       console.log("anything")
                                   });
};

export const LogInAttempt = (userName, password, dispatch, history) => {
    console.log("attempting to login user=", userName, " pass=", password);
    userService.login(userName, password).then(res =>
                                   {
                                       if (res.status){
                                           console.log("error : ", res);
                                           alert(res.status);
                                       }else {
                                           dispatch({type: 'SET_CURRENT_USER', user: res});

                                           console.log("login attempt results =", res);
                                           history.push(`/home`);
                                       }
                                   });

};

export const logOut = (dispatch) => {

    //TODO : should set the userSession = null?
    dispatch({type: 'SET_CURRENT_USER', user: undefined});
    // history.push("/home");

};

export const updateUser = (userId, user, dispatch) => {
    console.log("were sending this user to be updated : ", user);
    userService.updateUser(userId, user).then(res =>
                                              {
                                                  if (res.status){
                                                      console.log("error : ", res);
                                                      alert(res.status);
                                                  }else {
                                                      // then it was successful
                                                        console.log("response from update user :", res);
                                                      dispatch({type: 'UPDATE_USER', user: res})
                                                  }
                                              });
};

export const register = (userName, password, firstName, lastName, email, isAdmin, dispatch, history) => {

    let newUser = {     username : userName,
                        password : password,
                        firstName :firstName,
                        lastName : lastName,
                        email : email,
                        isAdmin : isAdmin
    };

    userService.createUser(newUser).then(res =>
                                               {
                                                   if (res.status){
                                                       console.log("error : ", res);
                                                       alert(res.status);
                                                   }else {
                                                       dispatch({type: 'CREATE_USER', user: res});
                                                       // console.log("create User results =", res);
                                                       history.push("/home");
                                                   }
                                               });

};

export const deleteUser = (uId, dispatch) => {


    userService.deleteUser(uId).then(res =>
                                     {
                                         if (res.status){
                                             console.log("error : ", res);
                                             alert(res.status);
                                         }else {
                                             dispatch({type: 'DELETE_USER', userId: uId});
                                             // console.log("create User results =", res);
                                             // history.push("/home");
                                         }
                                     });
}
