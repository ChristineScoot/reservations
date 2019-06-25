import React, {Component} from 'react';

import Header from '../components/Header';
import MenuContainer from "../components/MenuContainer";
import addHours from "date-fns/addHours";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'

class ArchivePage extends Component {
    constructor() {
        super();
        this.state = {
            itemList: [],
            search: ''
        };
        this.readObjects = this.readObjects.bind(this);
        this.readObjects();
    }

    async readObjects() {
        const headers = new Headers();
        const options = {
            method: 'GET',
            headers,
        };
        let token = localStorage.getItem("token");
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);

        await fetch('http://localhost:3301/user', options)
            .then(res => res.json())
            .then(response => {
                this.setState({itemList: response});
            })
            .catch(error => console.error('Error:', error));
    }

    sortByName = () => {
        const {itemList} = this.state;
        itemList.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        this.setState({itemList})
    };

    sortByDate = () => {
        const {itemList} = this.state;
        itemList.sort(function (a, b) {
            if (a.from < b.from) return -1;
            else if (a.from > b.from) return 1;
            else return 0;
        }).reverse();
        this.setState({itemList})
    };

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0, 20)});
    }

    render() {
        const handleDelete = (objectId, reservId) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    //DELETE
                    const headers = new Headers();
                    const options = {
                        method: 'DELETE',
                        headers,
                    };
                    let token = localStorage.getItem("token");
                    headers.append('Content-Type', 'application/json');
                    headers.append('Authorization', 'Bearer ' + token);
                    fetch('http://localhost:3301/reservation/' + objectId + "/" + reservId, options)
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error));
                    this.readObjects();

                    Swal.fire(
                        'Deleted!',
                        'Your reservation has been deleted.',
                        'success'
                    )
                }
            })
        };
        let filteredItemList = this.state.itemList.filter(
            (item) => {
                return item.name.toLowerCase().indexOf(this.state.search) !== -1;
            }
        );
        const objects = filteredItemList.map(item => {
                if (new Date(item.from)<new Date()) {
                    return <div key={item.reservationId}>
                        <li><b>{item.name.toUpperCase()}</b>, {addHours(new Date(item.from), 2).toUTCString().substr(0, 22)}
                        </li>
                    </div>
                }
            }
        );

        return (
            <div className="pages">
                <Header/>
                <MenuContainer/>
                <div className="content">
                    <h1>My past reservations</h1>

                    <ul className="objects">
                        {objects}
                    </ul>
                    <div>
                        <input className="search" type="text" value={this.state.search}
                               onChange={this.updateSearch.bind(this)}
                               placeholder="Search"/>
                        <img className="search-img" src={require("./searchIcon.png")} width="30px"/>
                    </div>
                    <button className="sorting-button" onClick={this.sortByName}>sort by name</button>
                    <button className="sorting-button" onClick={this.sortByDate}>sort by date</button>

                </div>
            </div>
        );
    }
}

export default ArchivePage;
