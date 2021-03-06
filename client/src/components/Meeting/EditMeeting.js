import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Form from '../MeetingForm/Form';
import {MuiPickersUtilsProvider} from '@material-ui/pickers' ;
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';

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

export default function EditMeeting (props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditIcon onClick={handleOpen} className={classes.clickAction}/>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className={classes.paper}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Form updateOpen={setOpen} currentId={props.currentId} meeting={props.meeting}/>
                </MuiPickersUtilsProvider>
            </div>
        </Fade>
      </Modal>
    </div>
  );
}