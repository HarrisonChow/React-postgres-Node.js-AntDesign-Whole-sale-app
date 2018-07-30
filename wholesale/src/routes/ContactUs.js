import React from 'react';
import '../style/contactus.css';
import { Card } from 'antd';
const { Meta } = Card;

export default class ContactUs extends React.Component {

    render() {
        return (
            <Card
                hoverable
                className="contactUs"
                cover={<img alt="example" src="http://www.curlstone.com/sites/default/files/contact-us-banner.jpg" />}
            >
                <Meta
                  title="Contact Us"
                  description="www.xxxxx.com"
                />
                <div className="additional">
                  <p className="price">Phone: 02 2321 2351</p>
                  <p>Email: customer@xxxxx.com </p>
                </div>
          </Card>
        );
    }
}
