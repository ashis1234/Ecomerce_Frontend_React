import React from 'react';
import ProductList from './product/productList'
import Slide from '../components/Carousel';
import { Container } from '@material-ui/core';

export default function Home(props){
    const SetCartCount = props.SetCartCount
    const Searchquery = props.Searchquery
    console.log(Searchquery);
    return (
        <Container>
            <Slide/>
            <ProductList Searchquery = {Searchquery} SetCartCount = {SetCartCount}/>
        </Container>
    )
}