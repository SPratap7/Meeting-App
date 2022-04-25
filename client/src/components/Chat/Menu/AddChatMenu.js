import React, {useEffect, useState} from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, MenuList, Paper, Grow, ClickAwayListener, Popper} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddConversation from './AddConversation';


const useStyles = makeStyles((theme) => ({
  addChatMenu: {
    position: 'absolute',
    bottom: '4vh',
    left:'16vw',
    cursor: 'pointer',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  circleIcon: {
    transition: 'transform .8s ease-in-out',
    '&:hover': {
      transform: 'rotate(360deg)',
    },
  }
}));

function AddChatMenu({conversations, setConversations}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateConversation, setIsCreateConversation] = useState(false);
  const isAddMenuOpen = Boolean(anchorEl);
  const classes = useStyles();
  
  const handleAddMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleMenuClose = () =>{
    setAnchorEl(null);
  }

  const handleCreateConversationOpen = () => {
    setIsCreateConversation(true);
  };

  const handleCreateConversationClose = () => {
    setIsCreateConversation(false);
  };
  
  const renderMenu = (
    <Popper open={isAddMenuOpen} anchorEl={anchorEl} role={undefined} placement="top-end" transition disablePortal className={classes.menu}>
      {({ TransitionProps}) => (
        <Grow {...TransitionProps} timeout={150}>
          <Paper >
            <ClickAwayListener onClickAway={handleMenuClose}>
              <MenuList id="menu-list-grow">
                <MenuItem onClick={handleCreateConversationOpen}>Conversation</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  return (
    <div className={classes.addChatMenu}>
      <AddCircleIcon fontSize='large' onClick={handleAddMenuOpen} className={classes.circleIcon}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isCreateConversation}
        onClose={handleCreateConversationClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCreateConversation}>
            <div className={classes.paper}>
                <AddConversation modalClose={handleCreateConversationClose} conversations={conversations} setConversations={setConversations}/>
            </div>
        </Fade>
      </Modal>
      {renderMenu}
    </div>
    
  )
}


export default AddChatMenu
