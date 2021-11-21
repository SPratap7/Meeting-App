import { React, useState, useEffect }from 'react';
import { TextField, Button } from '@material-ui/core';
import {TimePicker, DatePicker} from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import { createMeeting, updateMeeting } from '../../actions/meeting';


function Form(props) {
    const [meetingData,setMeetingData] = useState({title:'', from:new Date(), to:new Date(), dateOn: new Date(), createdBy:''});
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const authData = JSON.parse(localStorage.getItem('profile'));
    console.log(meetingData);

    useEffect(() => {
        console.log(props?.currentId);
        console.log(props?.meeting)
        if(props.currentId){
            console.log(props.currentId);
            setMeetingData({
                ...meetingData,
                 title:props?.meeting?.title,
                 from:props?.meeting?.from,
                 to:props?.meeting?.to,
                 dateOn:props?.meeting?.dateOn,
                 createdBy:props?.meeting?.createdBy
            });
        }
        else{
            console.log(authData?.result?._id);
            setMeetingData({
                ...meetingData,
                createdBy:authData?.result?._id.toString()
            });
        }
    },[]);

    if(meetingData.title.length === 0 && error.length === 0 && props.currentId === null){
        setError("This Field cannot be blank");
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        if(props.currentId == null){
            console.log("A");
            dispatch(createMeeting(meetingData));
        }
        else{
            dispatch(updateMeeting(props.currentId, meetingData));
        }
        props.updateOpen(false);
    }

    const handleClear = () => {
        setMeetingData({...meetingData, title:"", from:new Date(), to:new Date(), dateOn:new Date()});
    }

    const handleName = (e) => {
        setMeetingData({...meetingData, title:e.target.value});

        if(e.target.value.length === 0){
            setError("This Field cannot be blank");
        }
        else if(e.target.value.trim().length !== e.target.value.length){
            setError("Enter a valid Input");
        }
        else{
            setError("");
        }
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
                name="name" 
                variant="standard" 
                label="Name"
                value={meetingData.title}
                size="small"
                required
                error={error.length > 0}
                helperText={error}
                onChange={handleName}
            />
        
            <TimePicker
                label="From"
                size="small"
                name="from"
                value={meetingData.from}
                onChange={time => setMeetingData({...meetingData, from:time})} 
            />

            <TimePicker
                label="To"
                size="small"
                name="to"
                value={meetingData.to}
                onChange={time => setMeetingData({...meetingData, to:time})} 
            />

            <DatePicker
                disablePast={props.currentId ? false : true}
                minDate={props.currentId ? props.meeting.dateOn : new Date()}
                size="small"
                name="date" 
                openTo="date"
                format="dd/MM/yyyy"
                label="Date"
                views={["year", "month", "date"]}
                value={meetingData.dateOn}
                onChange={date => setMeetingData({...meetingData, dateOn:date})}
            />

            <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            type="submit" 
            disabled={meetingData.title.trim().length === 0 ||meetingData.title.trim().length !== meetingData.title.length}
            >{props.currentId ? "Edit": "Submit"}</Button>

            <Button 
            variant="contained" 
            color="secondary" 
            size="small" 
            onClick={handleClear}
            >Clear</Button>

        </form>
    )
}

export default Form;
