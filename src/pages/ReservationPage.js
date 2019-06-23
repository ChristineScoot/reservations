import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import Header from '../components/Header';
import MenuContainer from "../components/MenuContainer";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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

    handleSubmit(e) {
        // console.log(this.state.from);
        // console.log(addHours(this.state.from, 2));
        // let newFrom=new Date(addHours(this.state.from, 50));
        // console.log("New from"+newFrom);
        // this.setState({
        //     // from: addHours(this.state.from, 2),
        //     from: newFrom,
        //     to: addHours(this.state.to, 2)
        // });


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

        fetch('http://localhost:3301/reservation', options)
            .then(res => res.json())
            .then(json => console.log(json.message))
            .catch(error => {
                    console.log(error.response);
                    return;
                }
            );
        this.props.history.push('/reservations');
    }

    excludeDates() {
        // let allDates = this.state.item.reservations;
        // console.log(allDates);
        // for(let date in allDates){
        // console.log(date.from);
        // this.excludedDates.push(date.from);
        // }
    }

    readObjects() {
        const headers = new Headers();
        const options = {
            method: 'GET',
            headers,
        };
        let params = new URLSearchParams(window.location.search);

        this.setState({objectId: params.get('id')});

        fetch('http://localhost:3301/object/' + this.state.objectId, options)
            .then(res => res.json())
            .then(response => this.setState({item: response}))
            .catch(error => console.error('Error:', error));
        this.setState({reservations: this.state.item.reservations});
    }

    render() {
        const objectName = this.state.item.name;

        return (
            <div>
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
