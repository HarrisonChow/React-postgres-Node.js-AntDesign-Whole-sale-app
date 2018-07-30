import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Userprofile from './Userprofile';
import Users from './Users';
import UserUpdate from './UserUpdate';
import Products from './Products';
import Orders from './Orders';
import MyOrders from './MyOrders';
import ProductAdd from './ProductAdd';
import ProductUpdate from './ProductUpdate';
import Help from './Help';
import ContactUs from './ContactUs';
import StorageList from './StorageList';
import Layout from './Layout';

export default () => (

        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/login" render={props => <Login {...props} />} />
                    <Route path="/register" render={props => <Register {...props} />} />
                    <Route path="/users/update/:id" render={props => <UserUpdate {...props} />} />
                    <Route path="/users/:id" render={props => <Userprofile {...props} />} />
                    <Route path="/users" render={props => <Users {...props} />} />
                    <Route path="/products" render={props => <Products {...props} />} />
                    <Route path="/product/add" render={props => <ProductAdd {...props} />} />
                    <Route path="/product/:id" render={props => <ProductUpdate {...props} />} />
                    <Route path="/storageList" render={props => <StorageList {...props} />} />
                    <Route path="/orders/:id" render={props => <MyOrders {...props} />} />
                    <Route path="/orders" render={props => <Orders {...props} />} />
                    <Route path="/help" render={props => <Help {...props} />} />
                    <Route path="/contactUs" render={props => <ContactUs {...props} />} />
                    <Route path="/" render={props => <Home {...props} />} />
                </Switch>
            </Layout>
        </BrowserRouter>

);
