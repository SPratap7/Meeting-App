import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getMeetings} from '../../actions/meeting';
import Meetings from './Meetings';
import AddMeetings from './AddMeetings';
import Search from './Search';
import { useHistory } from 'react-router-dom';

function MeetingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const meeting = useSelector((state) => state.meetings);
    console.log(meeting);

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('profile'));
        if(authData){
            dispatch(getMeetings());
        }else{
            history.push("/");
        }
    },[]);

    return (
        <div>
            <div>
                <h1>My Meetings</h1>
            </div>
            <div>
                <Search/>
            </div>
            <div>
                <Meetings/>
                <AddMeetings/>
            </div>
        </div>
    )
}

export default MeetingPage;