import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormGroup,Checkbox,FormHelperText,Button,TextField } from '@material-ui/core';
import { ToastContainer,toast } from 'react-toastify';
import './Style.css';
import { WithContext as ReactTags } from 'react-tag-input';


const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
function Convert(tags){
    const tag = tags.map(tag => {

        return {
            id: tag.cat_name,
            text: tag.cat_name
        };
    });
    return tag;
}


export default function EditProduct(props) {
    const [productDescription, setProductDescription] = useState('');
    const [productName, setproductName] = useState(['']);
    const [price,setPrice] = useState(0)
    const [tags, setTags] = useState([]);
    const [digital,setDigital] = useState(0)
    const id = props.match.params.id;
    let history = useHistory();
    const [TAGS,setTAGS] = useState([])

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/products/category/').then((response)=>{
            setTAGS(response.data)
        })

        axios.get(`http://127.0.0.1:8000/products/product/${id}`)
        .then((response)=>{
            const data = response.data
            console.log(data)
            setproductName(data.title)
            setProductDescription(data.description)
            setPrice(data.price)
            setDigital(data.digital)
            const Tag = data.tags
            const tag1 = Convert(Tag)
            console.log(Convert(Tag))
            setTags(tag1)
        })
    },[id])


  


    const suggestions = TAGS.map(tag => {

        return {
            id: tag.cat_name,
            text: tag.cat_name
        };
    });

    console.log(TAGS)
    console.log(suggestions)
    

    const postData = (event) => {
        const tags1 = []
        tags.map((row)=>(
            tags1.push(row.text)
        )) 

        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/products/product/${id}/`, {
            title:productName,
            price:price,
            seller:localStorage.getItem('username'),
            description:productDescription,
            digital:digital,
            tags:tags1,
        }).then((response) => {
            history.push(`/products/view/${response.data.id}`)
        }, (error) => {
            toast.error(error,{
                position:'top-right'
            });
            console.log(error);
        });
    }

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
    const handleAddition = i => {
        setTags([...tags, i]);
        console.log(tags,i)
    };




    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };
    

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
                    <ReactTags
                        tags={tags}
                        suggestions={suggestions}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        inputFieldPosition="bottom"
                        autocomplete
                    />
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