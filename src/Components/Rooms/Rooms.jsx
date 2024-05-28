import React from "react";
import './rooms.scss';
import Room from "./Room";

class Rooms extends React.Component {

    componentDidMount() {
        this.props.getRoomsThunk();
    }

    render() {

        // const lastRoom = localStorage.getItem('roomId');

        // this.props.rooms.map(key => {
        //     if(key.roomId == lastRoom) {
        //         this.props.switchRoom(key)
        //     }
        // })

        return (
            <div className="rooms">
                <div className="rooms__inner">
                    {
                        this.props.rooms.map(key => {
                            return <Room key={key.roomId}
                                        room={key}
                                        activeRoom={this.props.activeRoom}
                                        switchRoom={this.props.switchRoom}
                                        openModal={this.props.openModal} 
                                        roomWithPassword={this.props.roomWithPassword}
                                        activeRoomWithPassword={this.props.activeRoomWithPassword}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Rooms;