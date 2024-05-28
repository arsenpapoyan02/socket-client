import React from "react";
import './sidebar.scss';
import RoomsContainer from "../Rooms/RoomsContainer";

class Sidebar extends React.Component {
    render() {

        const openModal = () => {
            const createRoom = 'create';
            this.props.openModal(createRoom);
        }

        return (
            <div className="sidebar">
                <div className="sidebar__inner">
                    <h2 className="sidebar__inner--title">Rooms</h2>
                    <RoomsContainer/>
                    <button className="createNewRoom" onClick={openModal}>Create room</button>
                </div>
            </div>
        )
    }
}

export default Sidebar;