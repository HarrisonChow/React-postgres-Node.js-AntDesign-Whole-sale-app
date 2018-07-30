import React from 'react';
import axios from "axios";
import '../style/productUpdate.css';
import { Form, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;


class ProductUpdate extends React.Component {

    state = {
        confirmDirty: false,
        errors: '',
        alert: 'none',
        data: []
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            e.preventDefault();
            axios({
                method: 'patch',
                url: 'http://localhost:3000/products/'+this.props.match.params.id,
                data: values,
            }).then(response => {
                this.redirectProducts();
            }).catch(error => {
                this.setState({
                    errors: error.response.data.message,
                    alert: 'block'
                });
            setTimeout(function(){
                this.setState({alert:'none'});
            }.bind(this),5000);
            });
        }
        });
    }

  componentWillMount() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products/'+this.props.match.params.id,
        withCredentials: true,
      }).then(response => {
          this.setState({
            data: response.data,
          });
      }).catch((error) => {

      });
  }

  checkNumber = (rule, value, callback) => {
      if (parseFloat(value) === value) {
          callback();
          return;
      }
      callback('The input is not valid number!');
  }

  redirectProducts = () => {
      this.props.history.push({pathname: '/products', search: '?success=true'});
  }

  render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

    return (
        <div id='form-product-update'>
            <Form onSubmit={this.handleSubmit} className="product-update-form">

                <FormItem
                    {...formItemLayout}
                    label="Product Name"
                >
                    {getFieldDecorator('product_name', {
                        initialValue: this.state.data.product_name,
                        rules: [{ required: true, message: 'Please input your Product Name!', whitespace: true }],
                    })(
                        <Input name = 'product_name'/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Wholesale Price"
                >
                    {getFieldDecorator('wholesale_price', {
                        initialValue: this.state.data.wholesale_price,
                        rules: [
                        { validator: this.checkNumber },
                        { required: true, message: 'Please input your Wholesale Price!'}],
                    })(
                        <Input name = 'wholesale_price' />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="Quantity"
                >
                    {getFieldDecorator('quantity', {
                        initialValue: this.state.data.quantity,
                        rules: [
                            { validator: this.checkNumber },
                            { required: true, message: 'Please input your Quantity!'}
                        ],
                    })(
                        <Input name = 'quantity' placeholder = 'Quantity' onChange={this.handleNumberChange}/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Discount"
                >
                    {getFieldDecorator('discount', {
                        initialValue: this.state.data.discount,
                        rules: [
                            { validator: this.checkNumber },
                            { required: true, message: 'Please input your Discount!'}
                        ],
                    })(
                        <Input name = 'discount' placeholder = 'Discount' />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Credit"
                >
                    {getFieldDecorator('credit', {
                        initialValue: this.state.data.credit,
                        rules: [
                            { validator: this.checkNumber },
                            { required: true, message: 'Please input your Credit!'}
                        ],
                    })(
                        <Input name = 'credit' placeholder = 'Credit' />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="GST"
                >
                    {getFieldDecorator('gst', {
                        initialValue: this.state.data.gst,
                        rules: [
                            { validator: this.checkNumber },
                            { required: true, message: 'Please input your GST!'}
                        ],
                    })(
                        <Input name = 'gst' placeholder = 'GST' />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Package Size"
                >
                    {getFieldDecorator('package_size', {
                        initialValue: this.state.data.package_size|| 0,
                        rules: [
                            { validator: this.checkNumber },
                            { required: true, message: 'Please input your Package Size!'}
                        ],
                    })(
                        <Input name = 'package_size' placeholder = 'Package Size' />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="Storage Warning Number"
                >
                    {getFieldDecorator('storage_warning', {
                        initialValue: this.state.data.storage_warning || 0,
                        rules: [
                            { validator: this.checkNumber },
                            { required: true, message: 'Please input your Storage Warning Number!' }
                        ],
                    })(
                        <Input name = 'storage_warning' placeholder = 'Storage Warning Number' />
                    )}
                </FormItem>


                <Alert message={this.state.errors} type="error" showIcon style={{ display: this.state.alert}} />

                <FormItem>
                    <Link to={{pathname: '/products'}}>
                        <Button type="primary" className="product-cancel-btn">Cancel</Button>
                    </Link>
                    <Button type="primary" htmlType="submit" className="product-update-btn">Update</Button>
                </FormItem>
            </Form>
        </div>
    );
  }
}



const WrappedRegister= Form.create()(ProductUpdate);

export default WrappedRegister;
