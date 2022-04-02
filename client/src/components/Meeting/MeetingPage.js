import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getMeetings} from '../../actions/meeting';
import Meetings from './Meetings';
import AddMeetings from './AddMeetings';
import Search from './Search';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: 'calc(1vw + 1vh)',
        color: '#d1c7ab',
    },
    search: {
        margin: 'calc(1vw + 1vh)',
    },
    meetings: {
        margin: 'calc(1vw + 1vh)',
    },
}));

function MeetingPage() {
    const classes = useStyles();
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
            <div className={classes.title}>
                <h1>My Meetings</h1>
            </div>
            <div className={classes.search}>
                <Search/>
            </div>
            <div className={classes.meetings}>
                <Meetings/>
                <div className={classes.meetings}></div>
                <AddMeetings/>
            </div>
        </div>
    )
}

export default MeetingPage;