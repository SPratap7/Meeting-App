import { FETCH_ALL, CREATE, UPDATE, DELETE, FILTER_BY_VALUE, FILTER_BY_DATE, REMOVE_MEETING} from '../constants/actionType';
import {initialMeetingState} from '../constants/initialStates';
    
const meetingReducer = (state = initialMeetingState, action) => {
    switch(action.type) {
        case FETCH_ALL:
            return {...state, meetings:action.payload, filteredMeetings:action.payload};

        case CREATE:
            return {
                ...state,
                meetings:[...state.meetings,action.payload],
                searchValue:{name:"",date:null},
                filteredMeetings:[...state.meetings, action.payload]
            };

        case UPDATE:
            let updateState = Object.assign({}, state);
            updateState.meetings = updateState.meetings.map((meeting) => meeting._id === action.payload._id ? action.payload : meeting);
            updateState.filteredMeetings = updateState.filteredMeetings.map((meeting) => meeting._id === action.payload._id ? action.payload : meeting);
            return updateState;

        case DELETE:
            let deleteState = Object.assign({}, state);
            deleteState.meetings = deleteState.meetings.filter(meeting => meeting._id !== action.payload);
            deleteState.filteredMeetings = deleteState.filteredMeetings.filter(meeting => meeting._id !== action.payload);
            return deleteState;

        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload;
            
            let appliedFilters = state.appliedFilters;
            if (value) {

                value = value.toLowerCase();
                let filteredValues = state.meetings.filter(meetings => {
                    return meetings.name.toLowerCase().includes(value) || meetings.id.toLowerCase().includes(value);
                });
                appliedFilters = addFilterIfNotExists('FILTER_BY_VALUE', appliedFilters);
                newState.filteredMeetings = filteredValues;
            } else {
                appliedFilters = removeFilter('FILTER_BY_VALUE', appliedFilters);
                if (appliedFilters.length === 0) {
                    newState.filteredMeetings = newState.meetings;
                }
            }
            newState.appliedFilters = appliedFilters;
            return newState;

        case FILTER_BY_DATE:
            let newState1 = Object.assign({}, state);
            let temp = action.payload;
            
            let appliedFilters1 = state.appliedFilters;
            if (temp) {

                let value1 = new Date(action.payload).toLocaleDateString('en-GB');
                let filteredValues1 = state.meetings.filter(meetings => {
                    return new Date(meetings.dateOn).toLocaleDateString('en-GB').includes(value1);
                });

                appliedFilters1 = addFilterIfNotExists('FILTER_BY_DATE', appliedFilters1);
                newState1.filteredMeetings = filteredValues1;
            } else {
                appliedFilters1 = removeFilter('FILTER_BY_DATE', appliedFilters1);
                if (appliedFilters1.length === 0) {
                    newState1.filteredMeetings = newState1.meetings;
                }
            }
            newState1.appliedFilters = appliedFilters1;
            return newState1;

        case REMOVE_MEETING:
            return initialMeetingState;

        default:
            return state;

    }
}



function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index === -1) appliedFilters.push(filter);
    return appliedFilters;
}
  
function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}


export default meetingReducer;