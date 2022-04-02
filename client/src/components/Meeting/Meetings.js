import React from 'react'
import { useSelector} from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer} from '@material-ui/core';
import EditMeeting from './EditMeeting';
import DeleteMeeting from './DeleteMeeting';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: 'calc(1vw + 1vh)',
        fontFamily: 'BIZ UDGothic, sans-serif',
        fontWeight: 'bold',
        borderBottom: "0.5vh solid black",
        color: '#d1c7ab',
    },
    content: {
        fontSize: 'calc(0.8vw + 0.8vh)',
        fontFamily: 'BIZ UDGothic, sans-serif',
        borderBottom: "0.2vh solid black",
        color: '#F5EEDC',
    },
}));

function Meetings() {
    const classes = useStyles();
    const meetings = useSelector((state) => state.meetings.filteredMeetings);
    const meeting = useSelector((state) => state.meetings);
    console.log(meeting);
    //const dispatch = useDispatch();

    const meetingHeader = () => {
        return (
            <TableHead>
                <TableRow sx={{borderBottom: "100px",}}>
                    <TableCell className={classes.heading}>NAME</TableCell>
                    <TableCell className={classes.heading}>FROM</TableCell>
                    <TableCell className={classes.heading}>TO</TableCell>
                    <TableCell className={classes.heading}>DATE</TableCell>
                    <TableCell className={classes.heading}></TableCell>
                    <TableCell className={classes.heading}></TableCell>
                </TableRow>
            </TableHead>
        )
    }


    return (
            
            <TableContainer>
                <Table>
                    {meetingHeader()}
                    {!meetings.length ? <TableBody><TableRow key="1"></TableRow></TableBody>:
                        <TableBody>
                        {
                            meetings.map((meeting) => (
                                <TableRow key={meeting._id}>
                                    <TableCell className={classes.content}>{meeting.title}</TableCell>
                                    <TableCell className={classes.content}>{new Date(meeting.from).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</TableCell>
                                    <TableCell className={classes.content}>{new Date(meeting.to).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</TableCell>
                                    <TableCell className={classes.content}>{new Date(meeting.dateOn).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell className={classes.content}><EditMeeting currentId={meeting._id} meeting={meeting}/></TableCell>
                                    <TableCell className={classes.content}><DeleteMeeting currentId={meeting._id}/></TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>
                    }
                </Table>
            </TableContainer>
    )
}

export default Meetings
