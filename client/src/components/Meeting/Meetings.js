import React from 'react'
import { useSelector} from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer} from '@material-ui/core';
import EditMeeting from './EditMeeting';
import DeleteMeeting from './DeleteMeeting';


function Meetings() {
    const meetings = useSelector((state) => state.meetings.filteredMeetings);
    const meeting = useSelector((state) => state.meetings);
    console.log(meeting);
    //const dispatch = useDispatch();

    const meetingHeader = () => {
        return (
            <TableHead>
                <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>FROM</TableCell>
                    <TableCell>TO</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
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
                                    <TableCell>{meeting.title}</TableCell>
                                    <TableCell>{new Date(meeting.from).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</TableCell>
                                    <TableCell>{new Date(meeting.to).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</TableCell>
                                    <TableCell>{new Date(meeting.dateOn).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell><EditMeeting currentId={meeting._id} meeting={meeting}/></TableCell>
                                    <TableCell><DeleteMeeting currentId={meeting._id}/></TableCell>
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
