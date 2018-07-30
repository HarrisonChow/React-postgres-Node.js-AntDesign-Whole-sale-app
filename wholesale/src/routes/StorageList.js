import React from 'react';
import axios from "axios";
import '../style/products.css';
import {  Table} from 'antd';

export default class StorageList extends React.Component {

    state = {
        loading: true,
        data: [],
    }

    getData = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/products/stockcheck',
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



    redirectHome = () => {
        this.props.history.push('/');
    }




    render() {



        const columns = [
            {
                title: 'Product Name',
                dataIndex: 'product_name',
                key: 'product_name',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
            }
        ];


    return (
        <div>

            {this.state.data.length ? <Table className="table-container" columns={columns} dataSource={this.state.data} /> : null}

        </div>
    );
  }
}
