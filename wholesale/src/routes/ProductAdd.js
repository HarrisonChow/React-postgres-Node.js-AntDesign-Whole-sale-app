import React from 'react';
import axios from "axios";
import { Form, Input, Button, Alert, Col, Row } from 'antd';
import '../style/productadd.css';

const FormItem = Form.Item;

class ProductAdd extends React.Component {
    state = {
        confirmDirty: false,
        errors: '',
        alert: 'none',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                e.preventDefault();
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/product/add',
                    data: values,
                }).then(response => {
                    this.redirectProducts();
                }).catch(error => {
                });
            }
        });
    }

    redirectProducts = () => {
        this.props.history.push({pathname: '/products'});
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };

    return (
            <div id='form-product-add'>
                <Form onSubmit={this.handleSubmit} className="product-add-form">

                    <FormItem
                        {...formItemLayout}
                    >
                        {getFieldDecorator('product_name', {
                            rules: [{ required: true, message: 'Please input your Product Name!', whitespace: true }],
                        })(
                            <Input name = 'product_name' placeholder = 'Product Name' />
                        )}
                    </FormItem>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('wholesale_price', {
                                    rules: [{ required: true, message: 'Please input your Wholesale Price!', whitespace: true }],
                                })(
                                    <Input name = 'wholesale_price' placeholder = 'Wholesale Price' />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('quantity', {
                                    rules: [{ required: true, message: 'Please input your Quantity!', whitespace: true }],
                                })(
                                    <Input name = 'quantity' placeholder = 'Quantity' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('discount', {
                                    rules: [{ required: true, message: 'Please input your Discount!', whitespace: true }],
                                })(
                                    <Input name = 'discount' placeholder = 'Discount' />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('credit', {
                                    rules: [{ required: true, message: 'Please input your Credit!', whitespace: true }],
                                })(
                                    <Input name = 'credit' placeholder = 'Credit' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('gst', {
                                    rules: [{ required: true, message: 'Please input your GST!', whitespace: true }],
                                })(
                                    <Input name = 'gst' placeholder = 'GST' />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('package_size', {
                                    rules: [{ required: true, message: 'Please input your Package Size!', whitespace: true }],
                                })(
                                    <Input name = 'package_size' placeholder = 'Package Size' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem
                    {...formItemLayout}
                    >
                        {getFieldDecorator('storage_warning', {
                            rules: [{ required: true, message: 'Please input your Storage Warning Number!', whitespace: true }],
                        })(
                            <Input name = 'storage_warning' placeholder = 'Storage Warning Number' />
                        )}
                    </FormItem>

                    <Alert message={this.state.errors} type="error" showIcon style={{ display: this.state.alert}} />

                    <FormItem>
                        <Button type="primary" htmlType="submit" className="product-add-btn">Add</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedRegister= Form.create()(ProductAdd);

export default WrappedRegister;
