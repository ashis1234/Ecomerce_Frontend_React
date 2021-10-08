import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { LinearProgress } from '@material-ui/core';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

const TopButton = styled.span`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: "filled";
  background-color: "black";
  color:"filled";
`;


const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

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

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;



export default function CartView (props){

  const SetCartCount = props.SetCartCount;
  const [Apidata,setApidata] = useState([])
  const [quantity,setQuantity] = useState(0)
  const [price,setPrice] = useState(0)
  const [ok,setOk] = useState(false);
  const [orderId,setorderId] = useState(0)


  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/orders/cartview/ashis/").then((response)=>{
        const data = response.data
        setorderId(data.id)
        setApidata(data.orderitem_set)
        setQuantity(data.quantity)
        SetCartCount(quantity);
        setPrice(data.price)
    })
  },[quantity])



  const IncrementItem = (id) =>{
      setOk(true);
      axios.post(`http://127.0.0.1:8000/orders/increment/${id}/`)
      .then((response)=>{
          setQuantity(response.data.quantity)
      })
      setOk(false);
  }

  const DecrementItem = (id) =>{
    setOk(true);
    axios.post(`http://127.0.0.1:8000/orders/decrement/${id}/`)
    .then((response)=>{
        setQuantity(response.data.quantity)
    })
    setOk(false);
      
  }

  const RemoveItem = (id) =>{
    setOk(true);
    axios.delete(`http://127.0.0.1:8000/orders/remove/${id}/`)
    .then((response)=>{
        console.log(response.data)
        setQuantity(response.data.quantity)
    })
    setOk(false);
  }
  const history = useHistory();

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Button startIcon = {<ArrowBackIcon/>} variant = "contained" color = "primary" onClick = {()=>{history.push('/')}}>CONTINUE SHOPPING</Button>
          <TopText>Shopping Bag(2)</TopText>
          <TopText>Your Wishlist (0)</TopText>
          <Button  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout/${orderId}`)}}>PLACE ORDER</Button>
        </Top>
        <Bottom>
          <Info>
            {ok && <LinearProgress/>}
            {Apidata.map((row)=>(
              <>
              <Product id= {row.product.id}>
                <ProductDetail>
                  <Image src="https://picsum.photos/1200/500"/>
                  <Details>
                    <ProductName>
                      <b>Product:</b>{row.product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {row.id}
                    </ProductId>
                    <ProductPrice><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="25"/>{row.product.price}</ProductPrice>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <span style={{cursor:'pointer'}} onClick = {()=>{IncrementItem(row.id);}}>
                      <ArrowDropUpIcon 
                        variant="contained" 
                        color = "primary"
                        fontSize = "large" 
                      />
                    </span>
                    <ProductAmount>{row.quantity}</ProductAmount>
                    <span style={{cursor:'pointer'}} onClick = {()=>{DecrementItem(row.id);}}>
                      <ArrowDropDownIcon 
                        variant="contained" 
                        color = "primary"
                        fontSize = "large" 
                      />
                    </span>
                  </ProductAmountContainer>
                  <Remove>
                  <span style={{cursor:'pointer'}} onClick = {()=>{RemoveItem(row.id);}}>
                      REMOVE
                  </span>
                  </Remove>
              </PriceDetail>
              </Product>
              <Hr />
            </>
            ))}
                            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice><img src="http://i.stack.imgur.com/nGbfO.png" width="10" height="10"/>{price}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice><img src="http://i.stack.imgur.com/nGbfO.png" width="10" height="10"/>5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice><img src="http://i.stack.imgur.com/nGbfO.png" width="10" height="10"/>-5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="25"/>{price}</SummaryItemPrice>
            </SummaryItem>
            <Button  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout/${orderId}`)}}>PLACE ORDER</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

