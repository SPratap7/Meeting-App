import { FETCH_ALL, CREATE, UPDATE, DELETE, FILTER_BY_VALUE, FILTER_BY_DATE} from '../constants/actionType';
import * as api from '../api';

export const getMeetings = () => async(dispatch) => {
    try {
        const authData = JSON.parse(localStorage.getItem('profile'));
        const { data } = await api.fetchMeetings(authData?.result?._id);
        console.log(data);
        const action = {
            type: FETCH_ALL,
            payload: data
        }
        dispatch(action);
    }
    catch(error) {
        console.log(error.message);
    }
}

export const createMeeting = (meeting) => async (dispatch) => {
    try {
        console.log(meeting);
        const { data } = await api.createMeeting(meeting);
        console.log("ABC");
        const action = {
            type: CREATE,
            payload: data
        }
        dispatch(action);
    }
    catch (error) {
        console.log(error);
    }
}

export const filterByValue = (input) => async (dispatch) => {
    try{
        const action = {
            type: FILTER_BY_VALUE,
            payload: input
        }
        dispatch(action);
    }
    catch (error) {
        console.log(error);
    }
}

export const filterByDate = (input) => async (dispatch) => {
    try{
        const action = {
            type: FILTER_BY_DATE,
            payload: input
        }
        dispatch(action);
    }
    catch (error) {
        console.log(error);
    }
}

export const updateMeeting = (id, meeting) => async (dispatch) => {
    try {
        const { data } = await api.updateMeeting(id, meeting);
        console.log("XYZ ",data);
        const action = {
            type: UPDATE,
            payload: data
        }
        dispatch(action);
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteMeeting = (id) => async (dispatch) => {
    try {
        const data = await api.deleteMeeting(id);
        console.log("Inside API",data);
        const action = {
            type: DELETE,
            payload: id
        }
        dispatch(action);
        
    } catch (error) {
        console.log(error);
    }
}