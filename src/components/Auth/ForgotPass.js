import React, {useState,useEffect} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
import messageArr from '../utils/message';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPass =()=>{
    const paperStyle={padding :20,height:'50vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const [userName1,setUserName1] = useState('')
    const [change,setChange] = useState(false);

    useEffect(()=>{
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

    const goForgetPass = (e) =>{
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/users/reset-pass/",{
            username:userName1
        }).then(()=>{
            messageArr.push({'status':"success",'body':'Forgot Password mail sent to your email please check it out!'})
            setChange(true);
        }).catch((error)=>{
            messageArr.push({'status':"error",'body':`UserName ${userName1} Not exists!`})
            setChange(true);
        })
    }

    return(
        <Grid>
            <ToastContainer/>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={goForgetPass}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Forgot PassWord</h2>
                    </Grid>
                    <TextField label='Username' placeholder='Enter Your UserName' fullWidth required onChange = {(e)=>{setUserName1(e.target.value)}}/>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Submit</Button>
                </form>
                <Typography > Do you want to login 
                     <Link to={"/login"}> Sign In </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
export default ForgotPass;