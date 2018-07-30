import React from 'react';
import Navigation from './Navigation';
import Globalfooter from './Globalfooter';
import '../style/layout.css';

const Layout = props => ({
    render() {
        return (
            <div>
                <Navigation/>
                <main className="container-box">{props.children}</main>
                <Globalfooter/>
            </div>
        );
    }
});

export default Layout;
