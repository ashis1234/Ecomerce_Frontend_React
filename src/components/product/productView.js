import React, {useEffect, useState} from 'react';
import {Button, Grid, Box} from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import {DocumentTitle} from "../../ui/documentTitle";
import { useHistory } from 'react-router';
import { Chip } from '@material-ui/core';
import BreadcrumbsSection from "../../ui/breadcrumbs";


export const useButtonStyles = makeStyles(() => ({
    buttonStartIcon: {
        margin: 0,
    },
}));

export default function ProductView(props) {
    console.log(props)
    const classes = useButtonStyles()
    const [product,SetProduct] = useState([])
    const [tags,Settags] = useState([])
    const [image,setImage] = useState("#")
    const SetCartCount = props.SetCartCount 
    const [title,setTitle] = useState('')
    const [productQuantity,setproductQuantity] = useState(1)
    const history = useHistory();

    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`http://127.0.0.1:8000/products/product/${id}`).then((response)=>{
            const data = response.data;
            console.log(data)
            if(data.image){
                setImage(`http://127.0.0.1:8000`+data.image.toString())
                console.log(image)
            }
            SetProduct(data)
            Settags(data.tags)
            setTitle(data.title)
            
            console.log(image)
        })
    }, [props.match.params.id])



    
    

    const AddToCart = () =>{
        if(localStorage.getItem('username')){
          axios.post("http://127.0.0.1:8000/orders/addtocart/",{
            username:localStorage.getItem('username'),
            pname:title,
            quantity:productQuantity
          }).then((response)=>{
              SetCartCount(response.data.quantity);
          })
        }else{
    
          if(localStorage.getItem('cart')){
            var cartItem = JSON.parse(localStorage.getItem('cart'));
            var __FOUND = cartItem.findIndex(function(post, index) {
              if(post.product.title === title)
                return true;
            });
            console.log(__FOUND);
            if(__FOUND === -1)
              cartItem.push({'product':{'id':product.id,'title': title},'quantity':1})
            else{
              cartItem[__FOUND].quantity = productQuantity;
            }
            console.log(cartItem)
            localStorage.setItem('cart',JSON.stringify(cartItem));
          }else{
            localStorage.setItem('cart',JSON.stringify([{'product':{'id':product.id,'title': title},'quantity' : productQuantity}]))
          }
          var quantity = productQuantity;
          if(localStorage.getItem('quantity'))
            quantity = parseInt(localStorage.getItem('quantity')) + productQuantity
          localStorage.setItem('quantity',quantity)
    
          var price = product.price * productQuantity;
          if(localStorage.getItem('price'))
            price += parseInt(localStorage.getItem('price'))
          localStorage.setItem('price',price)
          SetCartCount(quantity)
        }
    }

    const getStringBeforeLastDelimiter = (str, delimiter) => {
        return str.substring(0, str.lastIndexOf(delimiter))
    }

    const breadcrumbLinks = [
        {
            name: 'Home',
            link: "/"
        },
        {
            name: 'Products',
            link: `${getStringBeforeLastDelimiter(history.location.pathname, "/")
            + getStringBeforeLastDelimiter(history.location.search, "::")}`
        },
        {
            name: 'Details',
            link: `${history.location.pathname + history.location.search}`
        },
    ]
    
    const handleProceedToBagBtnClick = () =>{
        history.push('/checkout')
    }


    return (
        <>
            <DocumentTitle title="Product Details"/>
            <Box display="flex" p={3}>
                {console.log(breadcrumbLinks)}
                <BreadcrumbsSection  linkList={JSON.stringify(breadcrumbLinks)}/>
            </Box> 
           
            <Grid container>

                <Grid item container justify="center" sm={6} md={5} lg={4}>
                    <img src={image} alt={product.title}
                         style={{height: "100%", width: "90%", paddingBottom: "2rem"}}
                         title={product.title}/>
                </Grid>

                <Grid item xs={11} sm={5} md={6} container direction={"column"} spacing={2}
                      style={{marginLeft: "1rem"}}>
                    <Grid item style={{fontSize: "2rem", fontWeight: "bolder"}}>
                        {product.title}
                    </Grid>

                    <Grid item style={{fontSize: "1.7rem", fontWeight: 600, paddingTop: "1rem"}}>
                    <div>
                    {tags.map((row)=>(
                        <Chip 
                            label={row.cat_name} 
                            variant="outlined"
                            clickable={true}
                            onClick={()=>{history.push(`/category/${row.cat_name}`)}}
                        >
                        </Chip>
                    ))}
                    </div>
                    </Grid>

                    <Grid item style={{fontSize: "1.8rem", fontWeight: 600, paddingTop: "1rem"}}>
                    <img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="20"/>{product.price}
                    </Grid>

                    <Grid item style={{fontSize: "1rem", fontWeight: 700, color: "green"}}>
                        inclusive of all taxes
                    </Grid>

                    <Grid item container alignItems="center">
                        <Grid item style={{fontSize: '1.2rem', fontWeight: "lighter", paddingRight: 10}}>
                            Qty: {productQuantity}
                        </Grid>

                        <Grid item style={{fontSize: '1.2rem', fontWeight: "bold", paddingRight: 20}}>
                        </Grid>

                        <Grid item>
                            <Button variant="outlined" color="primary" size="large"
                                    style={{height: 40}}
                                    classes={{startIcon: classes.buttonStartIcon}}
                                    startIcon={<RemoveIcon fontSize="large"/>}
                                    disabled={productQuantity === 1}
                                    onClick={() => setproductQuantity(productQuantity-1)}
                            >
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button variant="outlined" color="primary" size="large"
                                    style={{height: 40}}
                                    classes={{startIcon: classes.buttonStartIcon}}
                                    startIcon={<AddIcon fontSize="large"/>}
                                    onClick={() => setproductQuantity(productQuantity + 1)}
                            >
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={8} md={4}>
                            <Button
                                style={{
                                    height: 44, color: 'white',
                                    fontWeight: "bold", backgroundColor: "#AB0000"
                                }}
                                fullWidth
                                startIcon={<AddShoppingCartIcon/>}
                                onClick={AddToCart}
                            >
                                ADD TO BAG
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={8} md={5}>
                            <Button variant="outlined" size="large" color="default"
                                    style={{height: 44, fontWeight: "bold"}}
                                    fullWidth
                                    startIcon={<LocalMallIcon/>}
                                    disabled={!localStorage.getItem('username')}
                                    onClick={handleProceedToBagBtnClick}
                            >
                                PROCEED TO BAG
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </>
    );
}

