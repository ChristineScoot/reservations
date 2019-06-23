import React, {Component} from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";
import {loggedIn, logout} from "../services/Authentication";

class Header extends Component {

    checkUserIsLoggedIn = () => {
        if (!loggedIn()) {
            this.props.history.push('/');
        }
    };

    constructor(props, context) {
        super(props, context);
        this.checkUserIsLoggedIn = this.checkUserIsLoggedIn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUserIsLoggedIn();
        this.state = {
            isLoggedIn: loggedIn()
        };
    }

    handleSubmit = () => {
        if (this.state.isLoggedIn) {
            logout();
        }
        this.props.history.push('/');
    };

    render() {
        return (
            <Router basename="/">
                <div>
                    <div className="header">Object reservation of club room in a dormitory
                        <div className="Switcher-Item"
                                 onClick={() => this.handleSubmit()}>Log out</div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default withRouter(Header);