import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteMeeting } from '../../actions/meeting';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius:'5vh',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    clickAction: {
      '&:hover': {
        cursor: 'pointer',
      }
    }
  }));
function DeleteMeeting(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteMeeting(props.currentId));
    }

    return (
        <div>
            <DeleteIcon onClick={handleDelete} className={classes.clickAction}/>
        </div>
    )
}

export default DeleteMeeting
