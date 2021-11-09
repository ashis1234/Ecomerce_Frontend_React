import styled from "styled-components";
import { Button,Tooltip } from "@material-ui/core";
import { useHistory } from "react-router";
import { useState,useEffect } from "react";

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
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

export default function SummaryView(props){
    const [price,setPrice] = useState(0)
    const Disabled_message = props.Disabled_message
    const orderId = props.orderId
    const history = useHistory()
    useEffect(()=>{
        setPrice(props.price)
    },[props.price])

    return(
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
            {!Disabled_message?
              <Button  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout`)}}>PLACE ORDER</Button>
            :
              <Tooltip title={Disabled_message}>
                <span>
                  <Button disabled  variant = "contained" style={{  "background-color": "#007fff"}} onClick = {()=>{history.push(`/checkout`)}}>PLACE ORDER</Button>
                  </span>
              </Tooltip>
            }
            <br/><br/><br/><br/>
          
              
        </Summary>
    )
}