import React from 'react';
import axios from "axios";
import '../style/products.css';
import { Button, Icon, Table, Input, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {
  state = {
    loading: true,
    data: [],
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    viewType: localStorage.user_role,
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  redirectUpdate = (product) => {
      var selectedId = parseInt(product.key);
      this.props.history.push({pathname: '/products', search: '?id='+selectedId});
  }

  delete = (index,record) => {
      var deleteProductId = parseInt(record.key);
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


  redirectHome = () => {
      this.props.history.push('/');
  }

  render() {
      const columns = [{
            title: 'Action', dataIndex: 'id',key: 'x', render: (text, record, index) =>
            (<Popconfirm title="You sure want to delete it?" >
                <a onClick={this.delete.bind(this, index, record)}><Icon type="delete" /></a>
            </Popconfirm>)},{
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
                <Button type="primary" onClick={this.onSearch}>Search</Button>
              </div>
            ),
            filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
              this.setState({
                filterDropdownVisible: visible,
              }, () => this.searchInput && this.searchInput.focus());
            },
          }, {
            title: 'Wholesale Price',
            dataIndex: 'wholesale_price',
            key: 'wholesale_price',
          }, {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
          }, {
            title: 'Special Price',
            dataIndex: 'special',
            key: 'special',
          }, {
            title: 'Credit',
            dataIndex: 'credit',
            key: 'credit',
        }];


    return (
        <div>
            {this.state.viewType ==='admin'  ? (
                <Link to={{pathname: '/product/add'}}>
                    <Button icon="plus-square-o" type="primary" className="add-btn">
                        Add Product
                    </Button>
                </Link>

            ) : (
                ''
            )}



            {this.state.data.length ? <Table onRow={(record) => ({
              onClick: () => {this.redirectUpdate(record)}
            })} className="table-container" columns={columns} dataSource={this.state.data} /> : null}
        </div>
    );
  }
}
