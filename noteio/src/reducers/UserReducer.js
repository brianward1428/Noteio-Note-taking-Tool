
let defaultUser = {
    _id: '000',
    firstName: 'User',
    lastName: 'Wizzle',
    username: 'bward1428',
    email: 'bwizzle@gmail.com',
    isAdmin: false,
}


let initialState = {
    currentUser : undefined,
    selectedUser : undefined,
    users : []
};


const userReducer = (state = initialState, action) => {

    let newCurrentUser;
    let newSelectedUser
    let newUsers;

    switch (action.type) {
        case 'SET_CURRENT_USER':

        console.log("okay we got to it in reducer", action.user);
        return {
            ...state,
            currentUser : action.user,
            selectedUser: action.user,
        };

        case 'SELECT_USER':

            console.log("okay were selecting user", action.user);
            return {
                ...state,
                selectedUser: action.user
            };

        case 'CREATE_USER':

            return {
                ...state,
                selectedUser: action.user,
                currentUser: action.user,
                users : [...state.users, action.user],
            };

        case 'SET_USERS':

            console.log("okay were trying to set users in reducer", action.users);
            return {
                ...state,
                users : action.users,
            };


        case 'UPDATE_USER':

            // okay so if were updating the selected user, we need to do three things.
            // 1. check if the selectedUser is also the current user
            // 2. update the selected user.
            // 3. update the user from the userList.
            newCurrentUser = state.currentUser;

            if (state.currentUser){
                if (state.selectedUser._id === state.currentUser._id){
                    newCurrentUser = action.user;
                }
            }
            // and we can update our userList.
            newUsers = state.users.map(u => {
                if (u._id === action.user._id) {
                    return action.user;
                } else {
                    return u
                }
            });
            console.log("okay so now in the userReducer we are updating user : ", action.user);
           return   {
                    ...state,
                    currentUser : newCurrentUser,
                    selectedUser: action.user,
                    users : newUsers,
                    };

        case 'DELETE_USER':
            newCurrentUser = state.currentUser;
            newSelectedUser = state.selectedUser;

            // check if our current  user is affected.
            if (state.currentUser){
                if (state.currentUser._id === action.userId){
                    newCurrentUser = undefined;
                }
            }
            // check if our current selected user is affected.
            if (state.selectedUser){
                if (state.selectedUser._id === action.userId){
                    newSelectedUser = undefined;
                }
            }
            // and we can update our userList.
            newUsers = [...state.users.filter(u => u._id !== action.userId)];
            console.log("okay so now in the userReducer we are updating user : ", action.user);
            return   {
                ...state,
                currentUser : newCurrentUser,
                selectedUser: newSelectedUser,
                users : newUsers,
            };

        case 'SORT_USERS':
            console.log("okay we should be sorting");
            // and we can update our userList.
            if (action.order === "OLDEST"){

                return   {
                    ...state,
                    users : [...state.users.sort(function(uA, uB){
                        return new Date(uA.createdAt) - new Date(uB.createdAt);
                    })]
                };
            } else {
                return   {
                    ...state,
                    users : [...state.users.sort(function(uA, uB){
                        return new Date(uB.createdAt) - new Date(uA.createdAt);
                    })]
                };
            }



        default:
            return state;
    }};


export default userReducer;
