import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import ShowObjects from "./pages/ShowObjects";
import AuthorPage from "./pages/AuthorPage";
import ReservationPage from "./pages/ReservationPage";
import MyReservationsPage from "./pages/MyReservationsPage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" exact component={SignInForm}/>
                        <Route path="/login" exact component={SignInForm}/>
                        <Route path="/sign-up" exact component={SignUpForm}/>
                        <Route path="/home" exact component={ShowObjects}/>
                        <Route path="/author" exact component={AuthorPage}/>
                        <Route path="/reserve" component={ReservationPage}/>
                        <Route path="/reservations" component={MyReservationsPage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
