import React from 'react';
import axios from "axios";
import '../style/products.css';
import { Table, Alert } from 'antd';


export default class MyOrders extends React.Component {

    state = {
        loading: true,
        data: [],
        viewType: localStorage.user_role,
        success: 'none',
        alert: "none",
    }

    getData = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/orders/'+this.props.match.params.id,
            withCredentials: true,
        }).then(response => {
            var allResults = response.data;

            var combineResut = [];

            allResults.forEach(function(ele, index) {
                var existing = combineResut.filter(function(v) {
                    return v.order_id === ele.order_id;
                });


                if (existing.length) {
                    var existingIndex = combineResut.indexOf(existing[0]);
                    combineResut[existingIndex].credit = combineResut[existingIndex].credit+ele.credit*ele.order_quantity;
                    combineResut[existingIndex].wholesale_price = combineResut[existingIndex].wholesale_price+ele.wholesale_price*ele.order_quantity;
                    combineResut[existingIndex].discount = combineResut[existingIndex].discount+ele.discount*ele.order_quantity;

                    combineResut[existingIndex].total = combineResut[existingIndex].wholesale_price - combineResut[existingIndex].discount;

                    combineResut[existingIndex].products =
                    combineResut[existingIndex].products.concat(','+ele.product_name).concat(' X '+ ele.order_quantity);
                } else {
                    ele.credit = ele.credit * ele.order_quantity;
                    ele.wholesale_price = ele.wholesale_price * ele.order_quantity;
                    ele.discount = ele.discount * ele.order_quantity;
                    ele.products = ele.product_name.concat(' X '+ ele.order_quantity);
                    combineResut.push(ele);
                }
            });

            this.setState({
                loading: false,
                data:combineResut.map(obj =>{
                    obj.key = obj.id+Math.random() * 100;
                    return obj;
                })
            });

        }).catch((error) => {
        });
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const columns = [
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'x',
                render: (text, record, index) =>{
                    if (text === "new") {
                        return <div>Pending</div>
                    } else {
                        return <div>Deliveried</div>
                    }

                }
            },
            {
                title: 'Order Number',
                dataIndex: 'order_id',
                key: 'order_id',
            },
            {
                title: 'Products',
                dataIndex: 'products',
                key: 'products',
                render: (text, row, index) => {
                    text = text.split(',');
                    var listText=[];
                    text.forEach(function(ele, index) {
                        listText.push(<p key={index}>{ele}</p>)
                    })
                    return <div key={index}>{listText}</div>
                }
            },
            {
                title: 'Total Discount',
                dataIndex: 'discount',
                key: 'discount',
            },
            {
                title: 'Total Price',
                dataIndex: 'total',
                key: 'total',
            },
            {
                title: 'Credit',
                dataIndex: 'credit',
                key: 'credit',
            }
        ];

    return (
        <div>

            <Alert message="Order status updated!" type="success" showIcon  style={{ display: this.state.success}}/>
            {this.state.data.length ? <Table className="table-container" columns={columns} dataSource={this.state.data} /> : null}

        </div>
    );
  }
}
