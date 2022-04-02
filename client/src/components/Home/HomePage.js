import React from 'react'
import FrontPage from '../../images/frontPage.jpg'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        
    },
    containerImage: {
        width: '100%',
        height: '91.05vh',
    },
    containerText: {
        position: 'absolute',
        color: 'black',
        top: '40vh',
        left: '8vw',
        fontFamily: 'Hurricane',
        fontSize: 'calc(3vh + 3vw)',
    },
}));

function HomePage() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <img src={FrontPage} className={classes.containerImage}></img>
            <div className={classes.containerText}>Welcome<br/>To<br/>Tachyon</div>
        </div>
    )
}

export default HomePage
