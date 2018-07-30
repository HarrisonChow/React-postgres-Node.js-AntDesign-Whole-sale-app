import React from 'react';
import { Steps, Icon } from 'antd';
const Step = Steps.Step;

export default class Process extends React.Component {
    render() {
        return (
            <Steps direction="vertical" size="small" current={4}>
                <Step title="Register & Login" icon={<Icon type="user" />} description="This is a description." />
                <Step title="Order online" icon={<Icon type="shopping-cart" />}  description="This is a description." />
                <Step title="Pay & Rebate" icon={<Icon type="red-envelope" />} description="This is a description." />
                <Step title="Delivery" icon={<Icon type="car" />} description="This is a description." />
            </Steps>
        )
    }
}
