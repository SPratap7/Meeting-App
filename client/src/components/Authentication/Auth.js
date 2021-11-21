import React, {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {Container, Paper, Typography, Button, Avatar, Grid} from '@material-ui/core';
import LockedOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/googleIcon';
import AuthInput from './AuthInput';
import {useHistory} from 'react-router-dom';
import { signup, login } from '../../actions/auth';



const initialState = { firstName: null, lastName: null, email: null, password: null, confirmPassword: null};

function Auth({isLogin}) {
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(!isLogin);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        setIsSignUp(!isLogin);
    },[isLogin]);

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('profile'));
        if(authData){
            history.push("/meeting");
        }
        setFormData(initialState);
    },[]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const switchMode = () => {
        if(isSignUp === false)
            history.push("/signup");
        else
            history.push("/login");
    }

    const googleSuccess = (res) => {
        console.log("Google Log In was Successful");
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({ type:'AUTH', data:{result,token} });
            history.push('/');
        }
        catch (error) {
            console.log(error);
        }

    }

    const googleFailure = () => {
        console.log("Google Log In was Unsuccessful");
    }

    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]: e.target.value});

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(isSignUp){
            dispatch(signup(formData,history));
        }
        else{
            dispatch(login(formData,history));
        }
    }
    setTimeout(()=>{
        
    })
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={2}>
                <Avatar >
                    <LockedOutlinedIcon />
                </Avatar>
                <Typography>{isSignUp ? 'Sign Up' : 'Log In'}</Typography>
                
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <AuthInput name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <AuthInput name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <AuthInput name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <AuthInput name="password" label="Password" handleChange={handleChange}  type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignUp && (<AuthInput name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>)}
                    </Grid>
                    <Button type="submit" fullWidth variant ="contained" color="primary">
                        {isSignUp ? 'SignUp' : 'LogIn'}
                    </Button>
                    <GoogleLogin
                        clientId="744463204381-e08u1f2hcko4k885ceqf2j36khd7iine.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon/>} variant="contained">
                                Google Log In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}

export default Auth;
