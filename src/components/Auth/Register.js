import React,{useEffect, useState} from 'react'
import { Grid, Paper, Avatar, FormGroup, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import validator from 'validator'
import FormHelperText from '@material-ui/core/FormHelperText';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import messageArr from '../utils/message';
import { ToastContainer, toast } from 'react-toastify';


export default function Signup(){

    const [username,setUsername] = useState("")
    const [pass,setPass] = useState("")
    const [cpass,setCpass] = useState("")
    const [email,setEmail] = useState("")
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const [emailError, setEmailError] = useState('')
    const [passError,setPassError] = useState('')
    const [userNameError,setUserNameError] = useState('')

    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [change,setChange] = useState(false);

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


    const goForRegister = (e) =>{
        e.preventDefault();
        var ok = true;
        if (!validator.isEmail(email)) {
            ok = false;
            setEmailError('Enter valid Email!')
        }
        else
            setEmailError('');

        if(pass != cpass){
            ok = false;
            setPassError("Password Must Be Equal")
        }
        else
            setPassError("");
        if(ok){


            axios.post("http://127.0.0.1:8000/users/register/",{
                username:username,
                password:pass,
                email:email
            }).then((response)=>{
                if(localStorage.getItem('cart')){
                  var cartItem = JSON.parse(localStorage.getItem('cart'));
                  console.log(cartItem.length);
                  
                  for(const item of cartItem) {
                    console.log(item);
                    axios.post("http://127.0.0.1:8000/orders/addtocart/",{
                      username:username,
                      pname:item.title,
                      quantity:item.quantity
                    })
                  }
                }
                localStorage.clear();
                if(response.data.status == 'error'){
                    messageArr.push({'status':'error','body':response.data.message})
                    setChange(true);
                }else{
                    messageArr.push({'status':'success','body':'Register Succesfully Completed!!'})
                    setChange(true);
                }
                history.push('/login');
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return (
        <Grid>
            <ToastContainer/>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={goForRegister}>
                    <TextField required fullWidth label='UserName' placeholder="Enter your username" onChange={(e)=>{setUsername(e.target.value)}} aria-describedby="component-error-tex2"/>
                    <FormHelperText style={{color:'red'}} id="component-error-text2">{userNameError}</FormHelperText>
                    <TextField required fullWidth label='Email' placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}} aria-describedby="component-error-text"/>
                    <FormHelperText style={{color:'red'}} id="component-error-text">{emailError}</FormHelperText>
                    <TextField required type="password" fullWidth label='Password' placeholder="Enter your password" onChange={(e)=>{setPass(e.target.value)}}
                        type={showPassword1 ? "text" : "password"} 
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={()=>setShowPassword1(!showPassword1)}
                                  onMouseDown={()=>setShowPassword1(!showPassword1)}
                                >
                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                    
                    />
                    
                    <TextField
                        required
                        fullWidth 
                        label='Confirm Password' 
                        placeholder="Enter password again"
                        aria-describedby="component-error-text1"
                        onChange={(e)=>{setCpass(e.target.value)}}
                        type={showPassword ? "text" : "password"} 
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={()=>setShowPassword(!showPassword)}
                                  onMouseDown={()=>setShowPassword(!showPassword)}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                                  
                    />

                    <FormHelperText style={{color:'red'}} id="component-error-text1">{passError}</FormHelperText>
                    <br/>
                    <Button type='submit' variant='contained' color='primary' >Sign up</Button>
                </form >
                <Typography > Do you have an account ?
                    <Link  to = {"/login"}>Sign In </Link>
               </Typography>
            </Paper>
            
        </Grid>
    )
}

 
