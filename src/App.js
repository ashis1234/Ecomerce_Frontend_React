import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home'
import ProductView from './components/product/productView';
import AddProduct from './components/product/AddProduct';
import ProductListSeller from './components/product/ProductListBySeller';
import EditProduct from './components/product/EditProduct';
import CartView from './components/Orders/CartView';
import CheckoutView from './components/Orders/CheckOut'
import ProductList from './components/product/productList';
import Signup from './components/Auth/Register';
import Login from './components/Auth/Login';

const App = () => {
    const [CartCount,SetCartCount] = useState(0)
    const [Searchquery,SetSearchquery] = useState('')

    return(
        <Router>
            <Layout CartCount = {CartCount} SetSearchquery = {SetSearchquery} SetCartCount = {SetCartCount}>
                <Switch>
                    <Route exact path = '/login' component={Login}/>
                    <Route exact path = '/register' component={Signup}/>
                    <Route exact path='/' render={(props) => <Home {...props} Searchquery = {Searchquery} SetCartCount = {SetCartCount}/>} />
                    <Route exact path='/products/view/:id' component={ProductView} />
                    <Route exact path='/cart' render={(props) => <CartView {...props} SetCartCount = {SetCartCount}/>} />
                    <Route exact path='/product/create' component={AddProduct} />
                    <Route exact path='/products' component={ProductListSeller} />
                    <Route exact path='/products/edit/:id' component={EditProduct} />
                    <Route exact path='/checkout/:id' component={CheckoutView} />
                    <Route exact path='/category/:name' render={(props) => <ProductList {...props} Searchquery = {Searchquery} SetCartCount = {SetCartCount}/>} />
                </Switch>
            </Layout>
        </Router>
    )
};

export default App;