import React, { useEffect, useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import messageArr from '../utils/message';
import { ToastContainer, toast } from 'react-toastify';
import FormHelperText from '@material-ui/core/FormHelperText';
import validator from 'validator'

const Login=(props)=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 
    const setUserName = props.setUserName
    const paperStyle={padding :20,height:'60vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const history = useHistory()
    const [change,setChange] = useState(false);
    const [emailError, setEmailError] = useState('')

    useEffect(()=>{
        console.log(messageArr)
        if(messageArr.length){
            setChange(false);
            const msg = messageArr[messageArr.length-1];
            if(msg.status === 'success'){
              toast.success(msg.body,{
                position:"top-right",
              });
            }else if(msg.status === 'info'){
              toast.info(msg.body,{
                position:"top-right",
              });
            }else{
              toast.error(msg.body,{
                position:"top-right",
    
              });
            }
            messageArr.pop();
          }
    },[change])

    const doLogin = (e) =>{
        e.preventDefault();
        var ok = true;
        if (!validator.isEmail(email)) {
            ok = false;
            setEmailError('Enter valid Email!')
        }
        else
            setEmailError('');
        if(ok){
        axios.post("http://127.0.0.1:8000/users/login/",{
            password:password,
            email:email
        }).then((response)=>{
            const username = response.data.username
            setUserName(username)
            localStorage.clear();
            messageArr.push({'status':"success",'body':`Welcome ${username}`})
            localStorage.setItem('username',username);
            localStorage.setItem('tokens',response.data.tokens.refresh);
            history.push('/');
        }).catch((error)=>{
            messageArr.push({'status':"error",'body':`Email or Password Doesn't Match Please Enter Valid Credential!`})
            setChange(true);
        })}
    }
    

    return(
        <Grid>
            <ToastContainer/>
            <Paper elevation={10} style={paperStyle}>
            <form onSubmit={doLogin}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter Email' fullWidth required onChange = {(e)=>{setEmail(e.target.value)}} aria-describedby="component-error-text"/>
                <FormHelperText style={{color:'red'}} id="component-error-text">{emailError}</FormHelperText>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange = {(e)=>{setPassword(e.target.value)}}/>
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            </form>
            <Typography >
                    <Link to={"/forgot-pass"}> Forgot Password</Link>                
                </Typography>
                <Typography > Do you haven't any account? register first 
                     <Link to={"/register"}> Sign Up </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
export default Login