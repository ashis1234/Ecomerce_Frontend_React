import React,{useEffect, useState} from "react";
import {Grid,Input,TextField,Typography,Button,FormGroup,FormHelperText,Container } from "@material-ui/core";
import axios from "axios";

export default function AdressForm(props) {
    const [name,setName] = useState('')
    const [mobile,setMobile] = useState('')
    const [pincode,setpincode] = useState('') 
    const [locality,setlocality] = useState('') 
    const [city,setcity] = useState('') 
    const [state,setstate] = useState('') 
    const [landmark,setlandmark] = useState('') 
    const setAdressId = props.setAdressId
    
    const postdata = (e) =>{
        e.preventDefault();
        console.log([name,mobile])
        axios.post('http://127.0.0.1:8000/shipping/',{
            buyer:localStorage.getItem('username'),
            name:name,
            mobile:mobile,
            pincode:pincode, 
            locality:locality,
            city:city,
            state:state,
            landmark:landmark
        }).then((response)=>{
            setAdressId(response.data.id)
        })
    }


    return (
        <Container>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                    DELIVAERY ADRESSS
            </Typography>
            <form onSubmit={postdata}>
                <Grid  container spacing={4} >
                    <Grid  item xs={6}>
                        <TextField onChange={(e)=>{setName(e.target.value)}} fullWidth id="name" label="Name" variant="outlined"  required/>
                        <FormHelperText id="name">Enter name</FormHelperText>
                    </Grid>
                    <Grid  item xs={6} >
                        <TextField onChange={(e)=>{setMobile(e.target.value)}} fullWidth id="mobile" label="Mobile" variant="outlined" required />
                       <FormHelperText id="mobile">Enter mobile</FormHelperText>
                    </Grid>
                    <Grid  item xs={6} >
                        <TextField onChange={(e)=>{setpincode(e.target.value)}} fullWidth id="pincode" label="Pincode" variant="outlined"  required/>
                        <FormHelperText id="pincode">Enter pincode</FormHelperText>
                    </Grid>
                    <Grid  item xs={6} > 
                        <TextField onChange={(e)=>{setlocality(e.target.value)}} fullWidth id="locality" label="Locality" variant="outlined" required />
                        <FormHelperText id="locality">Enter locality</FormHelperText>
                    </Grid>
                    <Grid  item xs={6}> 
                        <TextField onChange={(e)=>{setcity(e.target.value)}} fullWidth id="city" label="City" variant="outlined" required />
                        <FormHelperText id="city">Enter city</FormHelperText>
                    </Grid>

                    <Grid  item xs={6}> 
                        <TextField onChange={(e)=>{setstate(e.target.value)}} fullWidth id="state" label="state" variant="outlined"  required/>
                        <FormHelperText id="state">Enter state</FormHelperText>
                    </Grid>
                    <Grid  item xs={6}> 
                        <TextField onChange={(e)=>{setlandmark(e.target.value)}} fullWidth id="landmark" label="Landmark" variant="outlined"  />
                        <FormHelperText id="landmark">Enter landmark</FormHelperText>
                    </Grid>
                    <br/>
                    <Grid item xs = {4}>
                        <Button 
                            type='submit' 
                            size = 'large'
                            variant = 'contained'
                            color = 'primary'
                        >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}