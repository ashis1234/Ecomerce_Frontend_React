import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button,Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import { Card,CardContent,CardActions } from "@material-ui/core";
import AdressForm from "./CheckoutFrom";
import Payment from "./Payment";
import CheckoutItem from './CheckoutItem';

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
  flex: 1;
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
  flex-direction: row;
  align-items: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  margin-left:100px;
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

const SummaryTitle = styled.h5`
  font-weight: 100;
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



export default function CheckoutView (props){
  const [Apidata,setApidata] = useState([])
  const [quantity,setQuantity] = useState(0)
  const [price,setPrice] = useState(0)
  const [orderId,setorderId] = useState(0)
  const [AddressId,setAdressId] = useState(0)
  const SetCartCount = props.SetCartCount

  useEffect(()=>{
    const name = localStorage.getItem('username');
    axios.get(`http://127.0.0.1:8000/orders/cartview/${name}/`).then((response)=>{
        const data = response.data
        setorderId(data.id)
        setApidata(data.orderitem_set)
        setQuantity(data.quantity)
        setPrice(data.price)
    })
  },[quantity,setAdressId])


  const history = useHistory();
  return (
    <Container>
      <Wrapper>
        <Title>CHECKOUT PAGE</Title>
        <Top>
          <Button startIcon = {<ArrowBackIcon/>} variant = "contained" color = "primary" onClick = {()=>{history.push('/cart')}}>Go To Cart</Button>
        </Top>
        <Bottom>
          <Info>
            <Card >
              <CardContent>
                <AdressForm setAdressId={setAdressId}/>
                <br/>
                {AddressId>0 && <Payment price={40+price} SetCartCount={SetCartCount} AddressId={AddressId} orderId={orderId}/>}
              </CardContent>
            </Card>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              {Apidata.map((row,index)=>(
                <>
                  <CheckoutItem  productid={row.product.id} quantity = {row.quantity} id = {row.id?row.id:index}/>
                  <Hr />
                </>
              ))}  
            </Info>
          <Summary>
            <SummaryTitle>PRICE DETAILS</SummaryTitle>
            <hr/>
            <Product>
              <Typography variant="h6" component="div" gutterBottom>Price({quantity})</Typography>
              <Typography variant="h5" component="div"><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="25"/>{price}</Typography>
            </Product>
            <br/>
            <Product>
              <Typography variant="h6" component="div" gutterBottom>Delivery Charge</Typography>
              <Typography variant="h5" component="div"><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="25"/>40</Typography>
            </Product>
            <hr/>
            <Product>
              <Typography variant="h6" component="div" gutterBottom>Total Payable</Typography>
              <Typography variant="h5" component="div"><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="25"/>{40+price}</Typography>
            </Product>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

