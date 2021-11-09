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
import ChangePassWord from './components/Auth/Changepassword';
import ForgotPass from './components/Auth/ForgotPass';

const App = () => {
    const [CartCount,SetCartCount] = useState(0)
    const [Searchquery,SetSearchquery] = useState('')
    const [userName,setUserName] = useState(localStorage.getItem('username'))

    return(
        <Router>
            <Layout userName = {userName} setUserName = {setUserName} CartCount = {CartCount} SetSearchquery = {SetSearchquery} SetCartCount = {SetCartCount}>
                <Switch>
                    <Route exact path = '/pass-change' component={ChangePassWord}/>
                    <Route exact path = '/login' render={(props) => <Login {...props} setUserName = {setUserName}  />}/>
                    <Route exact path = '/register' component={Signup}/>
                    <Route exact path = '/forgot-pass' component={ForgotPass}/>
                    <Route exact path='/' render={(props) => <Home {...props} Searchquery = {Searchquery} SetCartCount = {SetCartCount}/>} />
                    <Route exact path='/products/view/:id' render={(props) => <ProductView {...props} SetCartCount = {SetCartCount}  />} />
                    <Route exact path='/cart' render={(props) => <CartView {...props} CartCount={CartCount} SetCartCount = {SetCartCount}/>} />
                    <Route exact path='/product/create' component={AddProduct} />
                    <Route exact path='/products' component={ProductListSeller} />
                    <Route exact path='/products/edit/:id' component={EditProduct} />
                    <Route exact path='/checkout' render={(props) => <CheckoutView {...props} SetCartCount = {SetCartCount}/>} />
                    <Route exact path='/category/:name' render={(props) => <ProductList {...props} CartCount = {CartCount} Searchquery = {Searchquery} SetCartCount = {SetCartCount}/>} />
                </Switch>
            </Layout>
        </Router>
    )
};

export default App;