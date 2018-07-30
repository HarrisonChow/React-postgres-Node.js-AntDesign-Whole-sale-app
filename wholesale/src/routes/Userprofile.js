import React from 'react';
import axios from "axios";
import '../style/userprofile.css';
import { Card, Icon, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

export default class Userprofile extends React.Component {
    state = {
        data: []
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
            this.redirectUserPage();

        });
    }
    redirectUserPage = () => {
        if (localStorage.user_id) {
            this.props.history.push({pathname: '/users/'+localStorage.user_id});
        } else {
            this.props.history.push({pathname: '/login'});
        }
    }

    render() {
        return (
            <div>
                <div className="profile-header"><Icon type="user" /> User Info
                    <Link to={{pathname: '/users/update/'+localStorage.user_id}}>
                        <Button icon="edit" type="primary" className="edit-btn">
                            Edit
                        </Button>
                    </Link>
                </div>

                <Card>
                    <Meta
                        title="Business Name"
                        description={this.state.data.business_name}
                    />
                    <Divider dashed />
                    <Meta
                        title="Email Address"
                        description={this.state.data.email}
                    />
                    <Divider dashed />
                    <Meta
                        title="Contact Number"
                        description={this.state.data.phone}
                    />
                    <Divider dashed />
                    <Meta
                        title="Contact Person"
                        description={this.state.data.contact_person}
                    />
                    <Divider dashed />
                    <Meta
                        title="ABN or ACN"
                        description={this.state.data.abn_acn}
                    />
                    <Divider dashed />
                    <Meta
                        title="TRN"
                        description={this.state.data.trn}
                    />
                    <Divider dashed />
                    <Meta
                        title="Address"
                        description={this.state.data.address}
                    />
                    <Divider dashed />
                    <Meta
                        title="Postcode"
                        description={this.state.data.postcode}
                    />
                </Card>
            </div>
        );
    }
}
