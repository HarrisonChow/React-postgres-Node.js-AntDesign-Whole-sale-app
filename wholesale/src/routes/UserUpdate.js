import React from 'react';
import axios from "axios";
import '../style/userUpdate.css';
import { Form, Input, Button, Alert } from 'antd';
const FormItem = Form.Item;

class UserUpdate extends React.Component {
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
                url: 'http://localhost:3000/users/'+this.props.match.params.id,
                data: values,
              }).then(response => {
                  this.redirectUser();
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
          url: 'http://localhost:3000/users/'+this.props.match.params.id,
          withCredentials: true,
        }).then(response => {
            this.setState({
              data: response.data,
            });
        }).catch((error) => {

        });
    }



    redirectUser = () => {
        this.props.history.push({pathname: '/users/'+localStorage.user_id});
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
            <div>
                <div id='form-update'>
                    <Form onSubmit={this.handleSubmit} className="update-form">

                        <FormItem
                          {...formItemLayout}
                          label="Business Name"
                        >
                          {getFieldDecorator('business_name', {
                            initialValue: this.state.data.business_name,
                            rules: [{ required: true, message: 'Please input your Business Name!', whitespace: true }],
                          })(
                            <Input name = 'business_name' placeholder = 'Business Name' />
                          )}
                        </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="Email"
                      >
                        {getFieldDecorator('email', {
                          initialValue: this.state.data.email,
                          rules: [{
                            type: 'email', message: 'The input is not valid Email!',
                          }, {
                            required: true, message: 'Please input your Email!',
                          }],
                        })(
                          <Input name = 'email' placeholder = 'Email' />
                        )}
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="ABN or ACN"
                      >
                        {getFieldDecorator('abn_acn', {
                            initialValue: this.state.data.abn_acn,
                          rules: [{ required: true, message: 'Please input your ABN or ACN!', whitespace: true }],
                        })(
                          <Input name = 'abn_acn' placeholder = 'ABN or ACN' />
                        )}
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="TRN"
                      >
                        {getFieldDecorator('trn', {
                            initialValue: this.state.data.trn,
                          rules: [{ required: true, message: 'Please input your TRN!', whitespace: true }],
                        })(
                          <Input name = 'trn' placeholder = 'TRN' />
                        )}
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="Phone"
                      >
                        {getFieldDecorator('phone', {
                            initialValue: this.state.data.phone,
                          rules: [{ required: true, message: 'Please input your phone!', whitespace: true }],
                        })(
                          <Input name = 'phone' placeholder = 'Phone' />
                        )}
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="Contact person"
                      >
                        {getFieldDecorator('contact_person', {
                            initialValue: this.state.data.contact_person,
                          rules: [{ required: true, message: 'Please input Contact person!', whitespace: true }],
                        })(
                          <Input name = 'contact_person' placeholder = 'Contact person' />
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="Address"
                      >
                        {getFieldDecorator('address', {
                            initialValue: this.state.data.address,
                          rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
                        })(
                          <Input name = 'address' placeholder = 'Address' />
                        )}
                      </FormItem>

                      <FormItem
                        {...formItemLayout}
                        label="Postcode"
                      >
                        {getFieldDecorator('postcode', {
                            initialValue: this.state.data.postcode,
                          rules: [{ required: true, message: 'Please input your postcode!', whitespace: true }],
                        })(
                          <Input name = 'postcode' placeholder = 'Postcode' />
                        )}
                      </FormItem>

                      <Alert message={this.state.errors} type="error" showIcon style={{ display: this.state.alert}} />

                      <FormItem>
                        <Button type="primary" htmlType="submit" className="update-btn">Update</Button>
                      </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedUserUpdate= Form.create()(UserUpdate);

export default WrappedUserUpdate;
