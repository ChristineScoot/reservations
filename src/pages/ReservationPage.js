import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import Header from '../components/Header';
import MenuContainer from "../components/MenuContainer";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'

class ReservationPage extends Component {
    constructor() {
        super();
        let date = new Date();
        date.setHours(date.getHours() + 1);// + Math.round(date.getMinutes() / 60));
        date.setMinutes(0);
        this.state = {
            from: date,
            to: null,
            item: "",
            objectId: "",
            reservations: [{"from": 10}, {"from": 11}],
            excludedDates: []
        };

        this.handleChangeFrom = date => {
            // let utcOffsetMinute = Date.prototype.getTimezoneOffset();//moment().utcOffset();
            // let data=new Date(date);
            // data.add(utcOffsetMinute, 'minutes').utc();
            this.setState({
                from: date,
                to: date
            });
        };
        this.handleChangeTo = date => {
            this.setState({
                to: date
            });
        };
        this.readObjects = this.readObjects.bind(this);
        this.excludeDates = this.excludeDates.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.readObjects();
    }

    async handleSubmit(e) {
        this.setState({
            from: this.state.from,
            to: this.state.to
        });

        e.preventDefault();
        const headers = new Headers();
        let token = localStorage.getItem("token");
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(this.state),
        };

        await fetch('http://localhost:3301/reservation', options)
            .then(res => {
                // res.json()
                if (res.status === 400) {
                    Swal.fire(
                        'Error',
                        "Cannot reserve for some reason.",
                        'error'
                    );
                } else {
                    this.props.history.push('/reservations');
                }
            })
            .catch(error => {
                    console.log(error.response);
                }
            );
    }

    excludeDates() {
        console.log(this.state.item.reservations);
        for (let res in this.state.item.reservations) {
            if (!this.state.item.reservations[res]) break
            console.log(addHours(this.state.item.reservations[res].from, 2));
            // addHours(new Date(item.from), 2).toUTCString()
        }
        let dateFrom = setHours(setMinutes(new Date(), 0), 17);
        let dateTo = this.state.reservations;
        // let allDates = this.state.item.reservations;
        // console.log(allDates);
        // for(let date in allDates){
        // console.log(date.from);
        // this.excludedDates.push(date.from);
        // }
    }

    async readObjects() {
        const headers = new Headers();
        const options = {
            method: 'GET',
            headers,
        };
        let params = new URLSearchParams(window.location.search);
        this.state.objectId = params.get('id');
        await fetch('http://localhost:3301/object/' + this.state.objectId, options)
            .then(res => res.json())
            .then(response => this.setState({item: response}))
            .catch(error => console.error('Error:', error));
        this.setState({reservations: this.state.item.reservations});
    }

    render() {
        const objectName = this.state.item.name;
        this.excludeDates();
        return (
            <div className="pages">
                <Header/>
                <MenuContainer/>
                <div className="content">
                    <h1>Book: {objectName}</h1>
                    <label>From: </label>
                    {/*{this.excludeDates()}*/}

                    <DatePicker
                        selected={this.state.from}
                        onChange={this.handleChangeFrom}
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 5)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        className="picker"
                        timeIntervals={60}
                        dateFormat="d MMMM yyyy, HH:mm"
                        timeCaption="Time"
                        placeholderText="Choose date and time"
                        // excludeTimes={[
                        //     setHours(setMinutes(new Date(), 0), 17),
                        //     setHours(setMinutes(new Date(), 30), 18),
                        //     setHours(setMinutes(new Date(), 30), 19),
                        //     setHours(setMinutes(new Date(), 30), 17)
                        // ]}
                    /><br/>
                    <label>To: </label>

                    <DatePicker
                        selected={this.state.to}
                        onChange={this.handleChangeTo}
                        minDate={this.state.from}
                        maxDate={addDays(this.state.from, (this.state.from.getHours() + 2 < 2 ? 1 : 0))}
                        minTime={setHours(setMinutes(new Date(), 0), this.state.from.getHours() + 1)}
                        maxTime={setHours(setMinutes(new Date(), 0), this.state.from.getHours() + 2)}
                        // minTime={setHours(setMinutes(new Date(), 0), 17)}
                        // maxTime={setHours(setMinutes(new Date(), 30), 20)}

                        // maxTime={setHours(setMinutes(this.state.dateFrom, 30), 20)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        className="picker"
                        timeIntervals={60}
                        dateFormat="d MMMM yyyy, HH:mm"
                        timeCaption="Time"
                        placeholderText="Choose date and time"
                        // excludeTimes={[
                        //     setHours(setMinutes(new Date(), 0), 17),
                        //     setHours(setMinutes(new Date(), 30), 18),
                        //     setHours(setMinutes(new Date(), 30), 19),
                        //     setHours(setMinutes(new Date(), 30), 17)
                        // ]}
                    /><br/>
                    <button type="button" disabled={!this.state.to} className="button"
                            onClick={this.handleSubmit}>Book
                    </button>
                </div>
            </div>
        );
    }
}

export default ReservationPage;
