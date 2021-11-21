import React,{useState, useEffect, useRef} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { Table, TableBody, TableRow, TableContainer} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createConversation} from '../../../actions/message';
import MuiTableCell from "@material-ui/core/TableCell";
import './styles.css';

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
    padding: '0',
  }
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
    addIcon: {
      cursor: 'pointer',
      color: 'black',
      marginLeft: '3vw',
      marginTop: '2vh',
    },
    tableContainer:{
        width: '35vw',
        height: '40vh',
        maxHeight: '40vh',
        overflowY: 'auto',
        tableLayout: 'fixed',
    },
    removeIcon: {
        color: 'black',
        textAlign: 'right',
        cursor: 'pointer',
    },
    addedEmailId: {
        maxWidth: '20vw',
    },
  }));

function AddConversation({modalClose, conversations, setConversations}) {
    const [conversationData, setConversationData] = useState([]);
    const [currentData, setCurrentData] = useState("");
    const [roomName, setRoomName] = useState("");
    const classes = useStyles();
    const scrollRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior: "smooth"});
    },[conversationData]);

    const handleChange = (e) => {
        setCurrentData(e.target.value);
    }

    const handleRoomName =(e) => {
        setRoomName(e.target.value);
    }

    const handleRemove = (e) => {
        console.log(e.target.parentElement.parentElement.parentElement.id);
        let emailId = e.target.parentElement.parentElement.parentElement.id;
        setConversationData(conversationData.filter(item => item !== emailId));
    }

    const addEmailId = () => {
        if(currentData !== null && currentData.length > 0){
            let emailId = currentData.toLowerCase();
            if(!conversationData.includes(emailId)){
                setConversationData(conversationData => [...conversationData,emailId]);
            }
            setCurrentData("");
        }
    }

    const handleClose = (e) => {
        modalClose();
    }

    const handleCreate = (e) => {
        let user = JSON.parse(localStorage.getItem('profile'));
        dispatch(createConversation(conversationData,user?.result?.email,roomName))
        .then((result) => {
            console.log(result);
            setConversations(conversations => [...conversations,result]);
        });
        modalClose();
    }
    return (
        <div className="addConversationHeader">
            <div>
                <TextField name="name" variant="standard" label="Email ID" size="small" value={currentData} className="emailIdField" onChange={handleChange}/>
                <AddCircleIcon fontSize='large' onClick={addEmailId} className={classes.addIcon} id="addConversation"/>
            </div>
            <br/>
            <TableContainer className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableBody className={classes.tableBody}>
                    {
                        conversationData.length ? conversationData.map((emailId) => (
                            <TableRow key={emailId} id={emailId} size='small' className={classes.tableRow}>
                                    <TableCell className={classes.addedEmailId}>{emailId}</TableCell>
                                    <TableCell className={classes.removeIcon} onClick={handleRemove}><RemoveCircleIcon /></TableCell>
                            </TableRow>
                        )) :<TableRow key="1">
                                <TableCell>Please enter email Id to continue</TableCell>
                            </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            {conversationData.length > 1 &&
                <div>
                    <TextField name="name" variant="standard" label="ROOM NAME" size="small" onChange={handleRoomName} className="roomName"/>
                    <br/>
                    <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleCreate} disabled={roomName.length ? false : true } style={{marginLeft:'25vw'}}>Create</Button>
                </div>
            }
            {conversationData.length <= 1 &&
                <div>
                    <br/>
                    <br/>
                    <span>
                        <Button variant="contained" color="secondary" onClick={handleClose} style={{marginTop:'3vh'}}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleCreate} disabled={conversationData.length ? false : true} style={{marginLeft:'25vw'}}>Create</Button>
                    </span>
                </div>
            }

        </div>
    )
}

export default AddConversation
