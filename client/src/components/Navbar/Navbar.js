import React, { useState, useEffect }from 'react';
import {AppBar, Typography, Toolbar, IconButton, 
    InputBase, Badge, MenuItem, MenuList, Paper, Grow, 
    ClickAwayListener, Popper, Button, Avatar } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { fade, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import SidebarDrawer from '../SidebarDrawer/SidebarDrawer'


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      fontFamily: 'BIZ UDGothic, sans-serif',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));


function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const isMenuOpen = Boolean(anchorEl);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
      console.log(user);
      const token = user?.token;
      if(token){
        const decodedToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime()){
          logout();
        }
      }
      //JWT.....
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    const logout = () => {
      setAnchorEl(null);
      setTimeout(() => {
        setUser(null);
        dispatch({type:'LOGOUT'});
        dispatch({type:'REMOVE_MEETING'});
        history.push('/');
      }, 200);
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Popper open={isMenuOpen} anchorEl={anchorEl} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            timeout={150}
          >
            <Paper >
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList autoFocusItem={isMenuOpen} id="menu-list-grow">
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );

    const renderLoggedinBar = (
        <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name.charAt(0)}</Avatar>
            </IconButton>
        </div>
    );

    return (
        <div>
            <AppBar position="static" style={{backgroundImage: 'linear-gradient(to left bottom, #000000, #201c1e, #383237, #514a54, #686473)'}}>
                <Toolbar>
                    <SidebarDrawer />
                    <Typography className={classes.title} variant="h6" noWrap>
                      Tachyon
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput, }} inputProps={{ 'aria-label': 'search' }} />
                    </div>
                    <div className={classes.grow} />
                    {
                        user ? 
                        (renderLoggedinBar) :
                        (<>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="secondary"  style={{marginRight: '1.5vw'}}> Login </Button>
                            </Link>
                            <Link to="/signup" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="secondary" > SignUp </Button>
                            </Link>
                        </>)
                    }
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}

export default Navbar;