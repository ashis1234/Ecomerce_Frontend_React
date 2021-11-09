import React,{useEffect, useState} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import messageArr from '../utils/message';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router';

export default function ChangePassord(props){
    const [username,setUsername] = useState("")
    const [pass,setPass] = useState("")
    const [cpass,setCpass] = useState("")
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const [passError,setPassError] = useState('')
    const [change,setChange] = useState(false);

    useEffect(()=>{
        console.log(messageArr);
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
    const history = useHistory()
    const PasswordChange = (e) =>{
        e.preventDefault();
        var ok = true;
        if(pass != cpass){
            ok = false;
            setPassError("Password Must Be Equal")
        }
        else
            setPassError("");
        if(!ok)return;
        axios.post('http://127.0.0.1:8000/users/password_change/',{
            username:username,
            new_pass:pass,
            confirm_pass:cpass
        }).then(()=>{
            messageArr.push({'status':"success",'body':'Password Succesfully Changed!'})            
            history.push('/login');
        }).catch(()=>{
            messageArr.push({'status':"error",'body':`UserName ${username} Not exists!`})
            setChange(true);
        })
    }

    return (
        <Grid>
            <ToastContainer/>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Change Password</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={PasswordChange}>
                    <TextField required fullWidth label='UserName' placeholder="Enter your username" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <TextField required fullWidth type = "password" label='Password' placeholder="Enter your password" onChange={(e)=>{setPass(e.target.value)}}/>
                    <TextField required fullWidth type = "password" label='Confirm Password' placeholder="Confirm your password" onChange={(e)=>{setCpass(e.target.value)}} aria-describedby="component-error-text1"/>
                    <FormHelperText style={{color:'red'}} id="component-error-text1">{passError}</FormHelperText>
                    <br/>
                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </form >
            </Paper>
            
        </Grid>
    )
}

 
