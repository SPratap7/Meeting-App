import React, {useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, List, Divider, ListItem, ListItemIcon, ListItemText, SwipeableDrawer} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import VideocamIcon from '@material-ui/icons/Videocam';
import ForumIcon from '@material-ui/icons/Forum';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [drawerState,setDrawerState] = useState(false);
  const history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //console.log("TYPE: ",event.type,"KEY: ",event.key);
    console.log(event);

    setDrawerState(open);
  };
  
  const gotoPage = (page) => {
    history.push("/"+page);
  }

  const list = () => (
    <Fragment>
      <div>
          MEETING APP
      </div>
      <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
        <List>
            <ListItem button onClick={() => gotoPage("")}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => gotoPage("meeting")}>
              <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
              <ListItemText primary="My Meetings" />
            </ListItem>
            <ListItem button onClick={() => gotoPage("chat")}>
              <ListItemIcon><ForumIcon /></ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem button onClick={() => gotoPage("videochat")}>
              <ListItemIcon><VideocamIcon /></ListItemIcon>
              <ListItemText primary="Video Chat" />
            </ListItem>
            <ListItem button onClick={() => gotoPage("aboutme")}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="About Me" />
            </ListItem>
        </List>
      </div>
    </Fragment>
  );

  return (
    <Fragment >
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)}>
        <MenuIcon/>
      </IconButton>
      <SwipeableDrawer anchor='left' open={drawerState} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </Fragment>
  );
}
