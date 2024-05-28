import { connect } from "react-redux";
import Rooms from "./Rooms";
import { getRoomsThunk, switchRoom, activeRoomWithPassword } from "../../redux/dialogsReducer";
import { openModal } from "../../redux/sidebarReducer";

const mapStateToProps = (state) => {
    return {
        rooms: state.dialogs.rooms,
        activeRoom: state.dialogs.activeRoom,
        roomWithPassword: state.dialogs.roomWithPassword
    }
}

const RoomsContainer = connect(mapStateToProps, {switchRoom,getRoomsThunk, openModal, activeRoomWithPassword})(Rooms);

export default RoomsContainer;