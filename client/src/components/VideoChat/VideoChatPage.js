import React from 'react'
import Notifications from './VideoChatComponent/Notifications';
import Options from './VideoChatComponent/Options';
import VideoPlayer from './VideoChatComponent/VideoPlayer';
import { makeStyles } from '@material-ui/core/styles';
import { ContextProvider } from './SocketContext';

const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  }));

function VideoChatPage() {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <ContextProvider>
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
            </ContextProvider>
        </div>
    )
}

export default VideoChatPage
