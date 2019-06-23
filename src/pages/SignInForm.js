import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import 'sweetalert2/dist/sweetalert2.min.css'
import {loggedIn} from "../services/Authentication";

class SignInForm extends Component {
    checkUserIsLoggedIn = () => {
        if (loggedIn()) {
            this.props.history.push('/home');
        }
    };

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            show: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(this.state),
        };

        await fetch('http://localhost:3301/user/login', options)
            .then(res => res.json())
            .then(json => {
                    localStorage.setItem('message', json.message);
                    if (localStorage.getItem('message') === "Auth failed") {
                        this.setState({show: true})
                    } else {
                        this.props.history.push('/home');
                        localStorage.setItem('token', json.token);
                    }
                }
            )
            .catch(error => {
                    console.log(error.response);
                }
            );
    }

    render() {
        this.checkUserIsLoggedIn();
        return (
            <div className="SignInForm">
                <div className="header">Object reservation of club room in a dormitory
                    <div className="Switcher">
                        <NavLink exact to="/" activeClassName="Switcher-Item-Active"
                                 className="Switcher-Item">Sign In</NavLink>
                        <NavLink to="/sign-up" activeClassName="Switcher-Item-Active" className="Switcher-Item">Sign
                            Up</NavLink>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField-Label" htmlFor="email">Email</label>
                        <input type="email" id="email" className="FormField-Input"
                               placeholder="Enter your email address"
                               value={this.state.email} onChange={this.handleChange} name="email"/>
                    </div>
                    <div className="FormField">
                        <label className="FormField-Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField-Input"
                               placeholder="Enter your password"
                               value={this.state.password} onChange={this.handleChange} name="password"/>
                        <div className="FormField">
                            <button className="FormField-Button">Log In</button>
                            <a href="/sign-up" className="FormField-Link">Not yet a member?</a>
                        </div>
                    </div>
                    <SweetAlert
                        type="error"
                        show={this.state.show}
                        title="Error"
                        text="Wrong email or password!"
                        onConfirm={() => {
                            this.setState({show: false});
                        }}
                    />
                </form>
            </div>
        )
    }
}

export default SignInForm;