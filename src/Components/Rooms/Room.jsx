import React from "react";
import './rooms.scss';
import lock from './lock.png';

class Room extends React.Component {

    render() {

        const activateRoom = () => {
            const passwordRoom = 'password';
            let activatedRoom = this.props.room;

            if(this.props.room.password != '' && this.props.activeRoom.roomId !== this.props.room.roomId) {
                this.props.openModal(passwordRoom);
                this.props.activeRoomWithPassword(activatedRoom);
            }
            else {
                this.props.switchRoom(activatedRoom);
                localStorage.setItem('roomId', activatedRoom.roomId);
            }
        }     

        return (
            <div className={`room ${this.props.activeRoom.roomId === this.props.room.roomId ? 'active' : null}`} onClick={activateRoom}>
                <div className="room__inner">
                    <div className="room__item">
                        <h3 className="room__item--title">Room  {this.props.room.name != '' ? this.props.room.name : `№ ${this.props.room.roomId}`}</h3>
                        {this.props.room.password != '' ? <img src={lock} alt="" /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Room;