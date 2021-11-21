import { AUTH, LOGOUT } from '../constants/actionType';
const initialState = {authData:null};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case AUTH:
            console.log("DATA ",action?.data);
            console.log("PAYLOAD ",action?.payload);
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData : action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData : null};
        default:
            return state;
    }

}

export default authReducer;