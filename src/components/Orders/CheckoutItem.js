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


export default function CheckoutItem (props){
    const productid = props.productid
    const quantity = props.quantity
    const id = props.id
    const [title,setTitle] = useState('')
    const [Productprice,setProductprice] = useState('')
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/products/product/${productid}`)
        .then((response)=>{
            const data = response.data
            setTitle(data.title)
            setProductprice(data.price)
        })
    })

 
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
        <ProductAmount>Quantity : {quantity}</ProductAmount>
      </ProductDetail>
      <PriceDetail>
    </PriceDetail>
    </Product>
    )
}