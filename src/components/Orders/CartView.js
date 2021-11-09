import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button,Tooltip } from "@material-ui/core";
import { useHistory } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CartItem from './CartItem';
import SummaryView from './Summary';
import CartCountView from './OrderCount';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export default function CartView (props){
  const SetCartCount = props.SetCartCount;
  const CartCount = props.CartCount;
  const [Apidata,setApidata] = useState([])
  const [Quantity,setQuantity] = useState(0)
  const [price,setPrice] = useState(0)
  const [change,setChange] = useState(0);
  const [orderId,setorderId] = useState(0)
  const [Disabled_message,setDisabled_message] = useState("You've to Login")
 

  useEffect(()=>{ 
          console.log("ddd");
          if(localStorage.getItem('username')){
            const name = localStorage.getItem('username');
            axios.get(`http://127.0.0.1:8000/orders/cartview/${name}/`).then((response)=>{
                const data = response.data
                setorderId(data.id)
                setApidata(data.orderitem_set)
                setQuantity(data.quantity)
                console.log(data)
                if(Quantity == 0)
                  setDisabled_message("You've to add atleast one Product in cart");
                else
                  setDisabled_message('');
                SetCartCount(Quantity);
                setPrice(data.price)
            })
          }else if(localStorage.getItem('cart')){
              SetCartCount(parseInt(localStorage.getItem('quantity')));
              setPrice(parseInt(localStorage.getItem('price')))
              var data = JSON.parse(localStorage.getItem('cart'))
              setApidata(data);
          }
  },[Quantity])


  
  const history = useHistory();
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Button startIcon = {<ArrowBackIcon/>} variant = "contained" color = "primary" onClick = {()=>{history.push('/')}}>CONTINUE SHOPPING</Button>
          <CartCountView CartCount = {CartCount}/>
          {!Disabled_message?
              <Button  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout`)}}>PLACE ORDER</Button>
            :
              <Tooltip title={Disabled_message}>
                <span>
                  <Button disabled  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout`)}}>PLACE ORDER</Button>
                  </span>
              </Tooltip>
            }
        </Top>
        <Bottom>
          <Info>
            {Apidata.map((row,index)=>(
              <>
                <CartItem CartCount = {CartCount} setPrice = {setPrice} price={price} change={change} setChange = {setChange}  SetCartCount = {SetCartCount}  productid={row.product.id} quantity = {row.quantity} id = {row.id?row.id:index}/>
                <Hr />
              </>
            ))}           
          </Info>
          <SummaryView orderId={orderId} price={price} Disabled_message = {Disabled_message}/>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

