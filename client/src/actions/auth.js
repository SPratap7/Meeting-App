import { AUTH } from '../constants/actionType';
import * as api from '../api/index.js';


export const login = ( formData, history ) => async ( dispatch ) => {

    try {
        const { data } = await api.login(formData);
        dispatch({type:AUTH, data});

        history.push('/meeting');
    }
    catch (error) {
        console.log(error);
    }

}

export const signup = ( formData, history ) => async ( dispatch ) => {

    try {
        const { data } = await api.signup(formData);
        console.log(data);
        dispatch({type:AUTH, data});

        history.push('/meeting');
    }
    catch (error) {
        console.log(error.response.data);
    }

}