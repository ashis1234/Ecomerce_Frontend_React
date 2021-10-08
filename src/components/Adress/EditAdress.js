import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormGroup,Checkbox,FormHelperText,Button,TextField } from '@material-ui/core';
import { ToastContainer,toast } from 'react-toastify';
import { WithContext as ReactTags } from 'react-tag-input';



export default function EditAdress(props) {
    const [productDescription, setProductDescription] = useState('');
    const [productName, setproductName] = useState(['']);
    const [price,setPrice] = useState(0)
    const [tags, setTags] = useState([]);
    const [digital,setDigital] = useState(0)
    const id = props.match.params.id;
    let history = useHistory();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/shipping/${id}`)
        .then((response)=>{
            const data = response.data
            console.log(data)
            setproductName(data.title)
            setProductDescription(data.description)
            setPrice(data.price)
            setDigital(data.digital)
        })
    },[id])


  



    const postData = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/shipping/product/${id}/`, {
            title:productName,
            price:price,
            seller:"ashis",
            description:productDescription,
            digital:digital,
        }).then((response) => {
            history.push(`/products/view/${response.data.id}`)
        }, (error) => {
            toast.error(error,{
                position:'top-right'
            });
            console.log(error);
        });
    }


    return (

        
        <div className="container mt-5">
            <ToastContainer/>
            <FormGroup >
                <div>
                    <TextField id="p-name" label="Product Name" value = {productName} variant="outlined" onChange={(e)=>{setproductName(e.target.value)}} />
                    <FormHelperText id="pname-helper">Enter name of the product</FormHelperText>
                    <br/>
                    <TextField id="p-desc" label="Product Description" value={productDescription} variant="outlined" onChange={(e)=>{setProductDescription(e.target.value)}} />
                    <FormHelperText id="pdesc-helper">Enter description of the product</FormHelperText>
                    <br/>
                    <TextField id="Price" label="Price" type="number" value={price} InputLabelProps={{shrink: true,}} onChange={(e)=>{setPrice(e.target.value)}}/>
                    <FormHelperText id="pname-helper">Enter Price of the product</FormHelperText>

                    <br/>
                    
                    <FormHelperText id="pname-helper">Enter Tags of the product</FormHelperText>
                    <br/>

                    <Checkbox id="digital" checked={digital} onChange = {(e)=>{setDigital(e.target.checked)}}/>
                    <br/>
                    <Button 
                        type='submit' 
                        onClick={postData}
                        size = 'large'
                        variant = 'contained'
                        color = 'primary'
                    >Submit</Button>
                </div>
            </FormGroup>
        </div>
    )
}