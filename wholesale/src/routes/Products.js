import React from 'react';
import axios from "axios";
import { Button, Icon, Table, Input, Popconfirm,Alert,InputNumber, Modal } from 'antd';
import { Link } from 'react-router-dom';
import EditableCell from './EditableCell';
import '../style/products.css';

const queryString = require('query-string');

export default class Products extends React.Component {

    state = {
        loading: true,
        data: [],
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        viewType: localStorage.user_role,
        success: 'none',
        visible: false,
        confirmLoading: false,
        previewCartData: [],
        alert: "none"
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    changeQuantity = (index, record, value) => {
        var newPreviewCartData = [
            {
                "product_id": record.id,
                "key": record.key,
                "product_name": record.product_name,
                "price": record.wholesale_price - record.discount,
                "credit":record.credit,
                "quantity": value
            }
        ];

        this.state.previewCartData.map(obj =>{
            if (obj.product_id === record.key) {
                var key = this.state.previewCartData.indexOf(obj);
                this.state.previewCartData.splice(key, 1);
            }
            return obj;
        });

        this.setState({
            previewCartData : this.state.previewCartData.concat(newPreviewCartData),
        });
    }

    onCellChange =(key, dataIndex) => {
        return (value) => {
            const previewdataSource = [...this.state.previewCartData];
            const target = previewdataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = parseFloat(value,10);
                this.setState({ previewdataSource });
            }
        };
    }

    redirectUpdate = (product) => {
        var selectedId = parseInt(product.key,10);
        this.props.history.push({pathname: '/product/'+selectedId});
    }

    delete = (index,record) => {
        var deleteProductId = parseInt(record.key,10);
        axios({
            method: 'post',
            url: 'http://localhost:3000/products/'+deleteProductId,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            this.getData();
        }).catch((error) => {

        });
    }

    removeOrder = (index,record) => {
        var key = this.state.previewCartData.indexOf(record);
        this.state.previewCartData.splice(key, 1);

        this.setState({
            previewCartData : this.state.previewCartData,
        });
    }

    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.state.data.map((record,index) => {
                const match = record.product_name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span key={index}>
                            {record.product_name.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight" key={i}>{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    getData = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/products',
            withCredentials: true,
        }).then(response => {
            this.setState({
                loading: false,
                data:response.data.map(obj =>{
                    obj.key = obj.id;
                    obj.special = (obj.wholesale_price - obj.discount).toFixed(2);
                    return obj;
                })
            });
        }).catch((error) => {
            this.redirectHome();
        });
    }

    componentWillMount() {
        this.getData();
    }

    componentDidMount(){
        if (queryString.parse(this.props.location.search).success) {
            this.setState({
                success: 'block'
            });
            setTimeout(function(){
                this.setState({success:'none'});
            }.bind(this),5000);
        }
    }

    redirectHome = () => {
        this.props.history.push('/');
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    orderSubmit = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
        var values = [{"user_id": localStorage.user_id}].concat(this.state.previewCartData);
        axios({
            method: 'post',
            url: 'http://localhost:3000/order/add',
            data: values,
        }).then(response => {
        }).catch((error) => {
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {

        var action = this.state.viewType ==='admin' ? {
            title: 'Action', dataIndex: 'id',key: 'x', render: (text, record, index) =>(
                <div onClick={(e) => e.stopPropagation()}>
                    <Popconfirm title="You sure want to delete it?"
                        onConfirm = {this.delete.bind(this, index, record)}
                    >
                        <Icon type="delete" />
                    </Popconfirm>
                </div>
        )} : {
            title: <div>Add To <Icon type="shopping-cart" /></div>,
            dataIndex: 'id',
            key: 'x', render: (text, record, index) =>(
                <div>
                    <InputNumber min={0} defaultValue={0} className="productQuantity" onChange={this.changeQuantity.bind(this, index, record)} value={this.state.previewCartData.find(item => item.key === record.key) ? (this.state.previewCartData.find(item => item.key === record.key)).quantity : 0}  />
                </div>
        )};

        const columns = [
            action,
            {
                title: 'Product Name',
                dataIndex: 'product_name',
                key: 'product_name',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Search name"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>
                            Search
                        </Button>
                    </div>
                ),
                filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                },
            },

            {
                title: 'Wholesale Price',
                dataIndex: 'wholesale_price',
                key: 'wholesale_price',
            },
            {
                title: 'Discount',
                dataIndex: 'discount',
                key: 'discount',
            },
            {
                title: 'Special Price',
                dataIndex: 'special',
                key: 'special',
            },
            {
                title: 'Credit',
                dataIndex: 'credit',
                key: 'credit',
            }
        ];

        const previewdataSource = this.state.previewCartData;

        const newPreviewcolumns = [
            {
                title: 'Action',
                dataIndex: 'id',
                key: 'x', render: (text, record, index) => (
                    <Popconfirm title="You sure want to remove it?" >
                        <a onClick={this.removeOrder.bind(this, index, record)}><Icon type="delete" /></a>
                    </Popconfirm>)
            }, {
                title: 'Product Name',
                dataIndex: 'product_name',
                key: 'name',
            }, {
                title: 'Quantity',
                dataIndex: 'quantity',
                render: (text, record) => (
                    <EditableCell
                        value={text}
                        onChange={this.onCellChange(record.key, 'quantity')}
                    />
                )
            }, {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            }, {
                title: 'Credit',
                dataIndex: 'credit',
                key: 'credit',
            }
        ];

    return (
        <div>
            {this.state.viewType ==='admin'  ? (
                <Link to={{pathname: '/product/add'}}>
                    <Button icon="plus-square-o" type="primary" className="add-btn">
                        Add Product
                    </Button>
                </Link>
            ) : (
                <Button icon="plus-square-o" type="primary" onClick={this.showModal} className="view-shopping-cart-btn">
                    My Shopping Cart
                </Button>
            )}

            <Alert message="Update successful!" type="success" showIcon  style={{ display: this.state.success}}/>
            {this.state.data.length ? <Table pagination={{ pageSize: 8 }} onRow={(record) => ({
                onClick: () => {if (this.state.viewType ==='admin') {
                    this.redirectUpdate(record)
                }}
            })} className="table-container" columns={columns} dataSource={this.state.data} /> : null}

            <Modal title="Title"
                visible={this.state.visible}
                onOk={this.orderSubmit}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                okText='Confirm'
                cancelText='Continue Shopping'
            >
                <Table dataSource={previewdataSource} columns={newPreviewcolumns} />
            </Modal>
        </div>
    );
  }
}
