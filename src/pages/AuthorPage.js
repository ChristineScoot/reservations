import React, { Component } from 'react';

import Header from '../components/Header';
import MenuContainer from "../components/MenuContainer";

class AuthorPage extends Component {
    render() {
        return (
            <div className="pages">
                <Header />
                <MenuContainer/>
                <div className="content">
                    <h1>Creator</h1>
                    Created by: Christine Scott <br/>
                    © Copyright 2019, Christine Scott. All Rights Reserved
                </div>
            </div>
        );
    }
}

export default AuthorPage;
