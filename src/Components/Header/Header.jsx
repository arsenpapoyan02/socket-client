import React from "react";
import './header.scss';

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="header__inner">
                    <h2 className="header__inner--room--name">Room {this.props.room.name === '' ? `№ ${this.props.room.roomId}` : this.props.room.name}</h2>
                </div>
            </header>
        )
    }
}

export default Header;