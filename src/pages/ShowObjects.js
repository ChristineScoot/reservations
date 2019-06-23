import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MenuContainer from "../components/MenuContainer";
import Header from "../components/Header";

class ShowObjects extends Component {
    constructor() {
        super();
        this.state = {
            itemList: []
        };
        this.readObjects = this.readObjects.bind(this);
        this.readObjects()
    }

    readObjects() {
        const headers = new Headers();
        const options = {
            method: 'GET',
            headers,
        };

        fetch('http://localhost:3301/object', options)
            .then(res => res.json())
            .then(response => this.setState({itemList: response}))
            .catch(error => console.error('Error:', error));
    }
    sortByName = () => {
        const { itemList } = this.state;
        itemList.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        this.setState({ itemList })
    };
    render() {
        const objects=this.state.itemList.map(item => (
            <Link key={item._id} className="objectLinks" to={"/reserve/?id="+item._id}><li>{item.name}</li></Link>
        ));
        return (
            <div>
                <Header/>
                <MenuContainer/>
                <div className="content">
                    <h1>Objects:</h1>
                    <ul>
                        {objects}
                    </ul>
                    <button className="sorting-button" onClick={this.sortByName}>sort by name</button>
                </div>
            </div>
        )
    }

}



export default ShowObjects;