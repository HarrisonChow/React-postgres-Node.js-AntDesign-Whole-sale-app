import React from 'react';
import axios from "axios";
import { Menu, Icon, Button, Badge } from 'antd';
import '../style/navigation.css';
import { Link } from 'react-router-dom';


export default class Navigation extends React.Component  {
    state = {
        collapsed: true,
        viewType: this.props.currentRole,
        admin_order_message: 0,
        storage_warning: 0,
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    logout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        this.setState({
            viewType: localStorage.user_role,
        });
        axios({
          method: 'get',
          url: 'http://localhost:3000/auth/logout',
          withCredentials: true,
        }).then(response => {
        }).catch((error) => {

        });


    }

    menuSelect = () => {
        this.setState({
            collapsed: true,
        });
    }
    orderCheck = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/orders/check',
            withCredentials: true,
        }).then(response => {
            var newOrders = 0;
            response.data.map((order) => {
                if (order.status === 'new') {
                    newOrders +=1;
                }
                return newOrders;
            })
            this.setState({
                admin_order_message: newOrders,
            });
        }).catch((error) => {

        });
    }
    stockCheck = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/products/stockcheck',
            withCredentials: true,
        }).then(response => {
            this.setState({
                storage_warning: response.data.length,
            });
        }).catch((error) => {

        });
    }
    componentWillMount(){
        if (this.state.viewType === 'client') {
            this.orderCheck();
            this.stockCheck();
        }
    }
    componentWillUpdate(prevProps, prevState) {
        if (localStorage.user_role !== prevState.viewType) {
            this.setState({
                viewType: localStorage.user_role,
            });
        }
    }

    render() {
        return (
            <div>
                <div className="navigation-header">
                    <Button onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    {this.state.viewType ==='admin'  ? (
                        <div className="right-bar">
                            <div>
                                <Link to={{pathname: '/orders'}}>
                                    <Badge count={this.state.admin_order_message} overflowCount={10}>
                                        <Icon type="mail" className="order-notice"/>
                                    </Badge>
                                </Link>
                            </div>
                            {this.state.storage_warning > 0  ? (
                                <div className="storage_warning">
                                    <Link to={{pathname: '/storageList'}}>
                                        <Badge count={this.state.storage_warning} overflowCount={10}>
                                            <Icon type="database" className="order-notice"/>
                                        </Badge>
                                    </Link>
                                </div>
                            ) : ''}
                        </div>

                    ) : ''}
                </div>
                <div className="nav-menu" style={{ zIndex: this.state.collapsed ===true  ? (0):(99) }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={this.state.collapsed}
                        onClick = {this.menuSelect}
                    >
                        <Menu.Item key="1">
                            <Link to={{pathname: '/'}}>
                                <Icon type="home" />
                                <span>Home</span>
                            </Link>
                        </Menu.Item>

                        {this.state.viewType ==='admin'  ? (
                            <Menu.Item key="2">
                                <Link to={{pathname: '/products/'}}>
                                    <Icon type="database" />
                                    <span>Product Admin</span>
                                </Link>
                            </Menu.Item>
                        ) : this.state.viewType ==='client' ? (
                            <Menu.Item key="2">
                                <Link to={{pathname: '/products/'}}>
                                    <Icon type="database" />
                                    <span>All Products</span>
                                </Link>
                            </Menu.Item>
                        ):('')}
                        {this.state.viewType ==='client'  ? (
                            <Menu.Item key="3">
                                <Link to={{pathname: '/orders/' +localStorage.user_id}}>
                                    <Icon type="shopping-cart" />
                                    <span>My Orders</span>
                                </Link>
                            </Menu.Item>
                        ) : ('')}
                        {this.state.viewType ==='admin'  ? (
                            <Menu.Item key="3">
                                <Link to={{pathname: '/orders/'}}>
                                    <Icon type="folder-open" />
                                    <span>Orders Admin</span>
                                </Link>
                            </Menu.Item>
                        ) : ('')}
                        {this.state.viewType ==='admin'  ? (
                            <Menu.Item key="4">
                                <Link to={{pathname: '/users/'}}>
                                    <Icon type="folder-open" />
                                    <span>Users Admin</span>
                                </Link>
                            </Menu.Item>
                        ) : ('')}
                        { typeof this.state.viewType !=='undefined' ? (
                            <Menu.Item key="17">
                                <Link to={{pathname: '/users/'+localStorage.user_id}}>
                                    <Icon type="profile" />
                                    <span>My Profile</span>
                                </Link>
                            </Menu.Item>
                        ) : ('')}
                        <Menu.Item key="18">
                            <Link to={{pathname: '/help'}}>
                                <Icon type="question-circle-o" />
                                <span>Help</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="19">
                            <Link to={{pathname: '/contactUs'}}>
                                <Icon type="phone" />
                                <span>Contact Us</span>
                            </Link>
                        </Menu.Item>
                        { typeof this.state.viewType !=='undefined' ? (
                            <Menu.Item key="20">
                                <Link to={{pathname: '/login', search: '?logout=true'}} onClick={this.logout}>
                                    <Icon type="logout" />
                                    <span>Log Out</span>
                                </Link>
                            </Menu.Item>
                        ) : (
                            <Menu.Item key="20">
                                <Link to={{pathname: '/login'}}>
                                    <Icon type="login" />
                                    <span>Log In</span>
                                </Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </div>
            </div>
        );
    }
}
