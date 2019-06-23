import React, {Component} from 'react';
import {BrowserRouter as Router, withRouter} from "react-router-dom";


class MenuContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeItem: '',
            activeItemPosition: 0,
            activeItemColor: '',
            menuItems: [
                {text: 'Home'},
                {text: 'reservations'},
                // {text: 'Blog'},
                {text: 'Author'},
            ],
        };

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(activeItem) {
        return e => {
            e.preventDefault();

            this.setState({
                activeItem,
                activeItemPosition: document.getElementById(activeItem).offsetTop,
                activeItemColor: window.getComputedStyle(document.getElementById(activeItem)).getPropertyValue('background-color'),
            });
            this.props.history.push("/"+activeItem.toLowerCase());
        }
    }

    render() {
        const menuItems = this.state.menuItems.map(item => <MenuItem key={item.text} item={item} handleClick={this.handleClick}/>)
        return (
            <Router>
            <div className='menu-container'>
                <span className='menu-item--active'
                      style={{top: this.state.activeItemPosition, backgroundColor: this.state.activeItemColor}}/>
                {menuItems}
            </div>
            </Router>
        )
    }

}

function MenuItem(props) {
    return (
        <div
            className='menu-item'
            id={props.item.text}
            onClick={props.handleClick(props.item.text)}
        >
            {props.item.text.toUpperCase()}
        </div>
    )
}

export default withRouter(MenuContainer);