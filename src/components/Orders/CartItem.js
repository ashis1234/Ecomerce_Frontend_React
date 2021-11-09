import styled from "styled-components";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;




const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Remove = styled.div`
    margin-top:20px;
    font-weight:500;
    font-size:20px;
    &:hover {
      color: blue; 
    }
`;


const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  padding-left:200
`;
const ProductPrice1 = styled.div`
  font-size: 30px;
  font-weight: 200;
  padding-left:200
`;


export default function CartItem (props){
    const productid = props.productid
    const id = props.id
    const change = props.change
    const setChange = props.setChange
    const SetCartCount = props.SetCartCount
    const CartCount = props.CartCount
    const price = props.price
    const setPrice= props.setPrice
    const [quantity,SetQuantity] = useState(props.quantity)
    const [title,setTitle] = useState('')
    const [Productprice,setProductprice] = useState('')
    const [ok1,setOk1] = useState(0);
    console.log(change)
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/products/product/${productid}`)
        .then((response)=>{
            const data = response.data
            setTitle(data.title)
            setProductprice(data.price)
        })
    },[ok1])

    function arrayRemove(arr, idx) { 
      return arr.filter(function(ele,index){
          console.log(index) 
          return index != idx; 
      });
    }


    const IncrementItem = (id) =>{
      if(localStorage.getItem('username')){
        axios.post(`http://127.0.0.1:8000/orders/increment/${id}/`)
        .then((response)=>{
        })
      }else{
        var cartItem = JSON.parse(localStorage.getItem('cart'))
        cartItem[id].quantity+=1;
        localStorage.setItem('cart',JSON.stringify(cartItem))
        localStorage.setItem('quantity',CartCount+1);
        localStorage.setItem('price',price+Productprice);
      }
      SetQuantity(quantity+1)
      setPrice(price+Productprice)
      SetCartCount(CartCount+1)
      setOk1(!ok1);
    }

  const DecrementItem = (id) =>{
    if(localStorage.getItem('username')){
      axios.post(`http://127.0.0.1:8000/orders/decrement/${id}/`)
      .then((response)=>{
          if(quantity == 1)
            setChange(!change);
      })
    }else{
      var cartItem = JSON.parse(localStorage.getItem('cart'))
      cartItem[id].quantity-=1;
      localStorage.setItem('quantity',CartCount-1);
      localStorage.setItem('price',price-Productprice);
      localStorage.setItem('cart',JSON.stringify(cartItem))

      if(quantity == 1){
        var newarr = arrayRemove(cartItem,id)
        localStorage.setItem('cart',JSON.stringify(newarr))
        setChange(!change);
        console.log(change);
      }
    }
    SetQuantity(quantity-1)
    setPrice(price-Productprice)
    SetCartCount(CartCount-1)
    setOk1(!ok1);
  }

  const RemoveItem = (id) =>{
    if(localStorage.getItem('username')){
      axios.delete(`http://127.0.0.1:8000/orders/remove/${id}/`)
      .then((response)=>{
          SetCartCount(response.data.quantity)
      })
    }else{
      var cartItem = JSON.parse(localStorage.getItem('cart'))
      var newarr = arrayRemove(cartItem,id)
      localStorage.setItem('cart',JSON.stringify(newarr))
      localStorage.setItem('quantity',CartCount-quantity);
      localStorage.setItem('price',price-quantity*Productprice);
    }
    setChange(!change);
  }
  return(        
      <Product id= {productid}>
      <ProductDetail>
        <Image src="https://picsum.photos/1200/500"/>
        <Details>
          <ProductName>
            <b>Product:</b>{title}
          </ProductName>
          <ProductId>
            <b>ID:</b> {id}
          </ProductId>
          <ProductPrice><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="25"/>{Productprice}</ProductPrice>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <span style={{cursor:'pointer'}} onClick = {()=>{IncrementItem(id);}}>
            <ArrowDropUpIcon 
              variant="contained" 
              color = "primary"
              fontSize = "large" 
            />
          </span>
          <ProductAmount>{quantity}</ProductAmount>
          <span style={{cursor:'pointer'}} onClick = {()=>{DecrementItem(id);}}>
            <ArrowDropDownIcon 
              variant="contained" 
              color = "primary"
              fontSize = "large" 
            />
          </span>
        </ProductAmountContainer>
        <Remove>
        <span style={{cursor:'pointer'}} onClick = {()=>{RemoveItem(id);}}>
            REMOVE
        </span>
        </Remove>
    </PriceDetail>
    </Product>
    )
}