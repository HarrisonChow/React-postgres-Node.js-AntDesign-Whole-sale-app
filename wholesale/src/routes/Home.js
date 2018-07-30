import React from 'react';
import Process from './Process';
import '../style/home.css';

export default class Home extends React.Component {
    componentWillMount(){
        if (localStorage.user_id) {
        } else {
            this.redirectLogin();
        }
    }
    redirectLogin = () => {
        this.props.history.push({pathname: '/login'});
    }
    render() {
        return (
            <div>
                <div className="news">
                    <h3>News</h3>
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                </div>
                <div className="container">
                    <h3>Procedure</h3>
                    <Process/>
                </div>
            </div>
        );
    }
}
