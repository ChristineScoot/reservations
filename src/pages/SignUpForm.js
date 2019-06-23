import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            room: '',
            role: 'user'
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
        console.log('Form submitted:');
        console.log(this.state);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(this.state),
        };
        const request = new Request('http://localhost:3301/user/register', options);
        console.log(request);
        const response = await fetch(request);
        const status = await response.status;

        if (status === 200 || status === 201) {
            console.log(response);
            alert('SUCCESS! Now you can sign in.');        }
        else {
            console.log("error: " + status);
            alert('ERROR: Could not sign up! Try again later.');
        }
    }

    render() {
        return (
            <div className="SignForm">

                <div className="header">Object reservation of club room in a dormitory
                    <div className="Switcher">
                        <NavLink exact to="/" activeClassName="Switcher-Item-Active" className="Switcher-Item">Sign In</NavLink>
                        <NavLink to="/sign-up" activeClassName="Switcher-Item-Active" className="Switcher-Item">Sign Up</NavLink>
                    </div>
                </div>

                <form className="FormFields" onSubmit={this.handleSubmit}>
                    <div className="FormField">
                        <label className="FormField-Label" htmlFor="name">Name</label>
                        <input type="text" id="name" className="FormField-Input"
                               placeholder="Enter your name" value={this.state.name} onChange={this.handleChange}
                               name="name"/>
                    </div>
                    <div className="FormField">
                        <label className="FormField-Label" htmlFor="surname">Surname</label>
                        <input type="text" id="surname" className="FormField-Input"
                               placeholder="Enter your surname" value={this.state.surname} onChange={this.handleChange}
                               name="surname"/>
                    </div>
                    <div className="FormField">
                        <label className="FormField-Label" htmlFor="room">Room number</label>
                        <input type="text" id="room" className="FormField-Input"
                               placeholder="Enter your room" value={this.state.room} onChange={this.handleChange}
                               name="room"/>
                    </div>
                    <div className="FormField">
                        <label className="FormField-Label" htmlFor="email">Email</label>
                        <input type="email" id="email" className="FormField-Input"
                               placeholder="Enter your email address" value={this.state.email}
                               onChange={this.handleChange} name="email"/>
                    </div>
                    <div className="FormField">
                        <label className="FormField-Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField-Input"
                               placeholder="Enter your password" value={this.state.password}
                               onChange={this.handleChange}
                               name="password"/>
                        <div className="FormField">
                            <button className="FormField-Button">Sign Up</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignUpForm;