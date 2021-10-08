import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button,Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import { Card,CardContent,CardActions } from "@material-ui/core";

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



export default function CartView (props){

  const [Apidata,setApidata] = useState([])
  const [quantity,setQuantity] = useState(0)
  const [price,setPrice] = useState(0)
  const [orderId,setorderId] = useState(0)


  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/orders/cartview/ashis/").then((response)=>{
        const data = response.data
        setorderId(data.id)
        setApidata(data.orderitem_set)
        setQuantity(data.quantity)
        setPrice(data.price)
    })
  },[quantity])

  const history = useHistory();

  return (
    <Container>
      <Wrapper>
        <Title>CHECKOUT PAGE</Title>
        <Top>
          <Button startIcon = {<ArrowBackIcon/>} variant = "contained" color = "primary" onClick = {()=>{history.push('/')}}>CONTINUE SHOPPING</Button>
          <TopText>Shopping Bag(2)</TopText>
          <TopText>Your Wishlist (0)</TopText>
          <Button  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout/${orderId}`)}}>PLACE ORDER</Button>
        </Top>
        <Bottom>
          <Info>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    DELIVAERY ADRESSS
                </Typography>
                
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
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
                    <ClearIcon/>
                    <ProductAmount>{row.quantity}</ProductAmount>
                </ProductAmountContainer>
                <ProductPrice1><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="25"/>{ row.product.price*row.quantity}</ProductPrice1>
              </PriceDetail>
              </Product>
              <Hr />
            </>
            ))}           
          </Info>
          <Summary>
            <SummaryTitle>PRICE DETAILS</SummaryTitle>
            <hr/>
            <Product>
              <Typography variant="h6" component="div" gutterBottom>Price()</Typography>
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
            <Button  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout/${orderId}`)}}>PLACE ORDER</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

