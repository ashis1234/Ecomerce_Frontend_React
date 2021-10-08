import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React,{useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";

// const Container = styled.div`
//   height: 60px;
// `;

// const Wrapper = styled.div`
//   padding: 10px 20px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
// `;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
// `;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
// `;

// const Center = styled.div`
//   flex: 1;
//   text-align: center;
// `;

// const Logo = styled.h1`
//   font-weight: bold;
// `;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const StyledLink = styled(Link)`
    font-size:20px;
    color:white;
    &:hover{
      text-decoration:none;
      color:black;
    }
`;



export default function Navbar(props){
  const quantity = props.CartCount
  const SetCartCount = props.SetCartCount
  const SetSearchquery = props.SetSearchquery

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/orders/getTotalQuantity/ashis/").then((response)=>{
      SetCartCount(response.data.quantity);
    })
  },[quantity])

  const [value,setValue] = useState('')
  const doSomethingWith = ()=>{
    SetSearchquery(value);
  }

  return (  
        <Right>
          <MenuItem>
          <SearchBar
            value={value}
            onChange={(newValue) => {setValue(newValue);doSomethingWith()}}
            onRequestSearch={doSomethingWith}
          />
          </MenuItem>
          <MenuItem><StyledLink to = {'/register'}>REGISTER</StyledLink></MenuItem>
          <MenuItem><StyledLink to = {'/login'}>SIGNIN</StyledLink></MenuItem>
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <StyledLink to = {'/cart'}> <ShoppingCartOutlined /></StyledLink>
            </Badge>
          </MenuItem>
        </Right>
  );
};


