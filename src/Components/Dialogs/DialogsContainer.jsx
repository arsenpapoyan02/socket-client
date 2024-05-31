import { connect } from "react-redux";
import Dialogs from "./Dialogs";
import { openModal, modalCreateError } from "../../redux/sidebarReducer";
import { getRooms, changeNameText, changePasswordText, 
        createRoom, changeRoomPasswordText, switchRoom, 
        checkIsTruePasswordOfRoom, sendText, sendMessage, 
        getMessage, removeSomeMessages, switchMessageReactions,
        addReactionThunk, addReaction, addPressedReactions,
        getIP} from "../../redux/dialogsReducer";

import { getMessageDetails } from "../../redux/messageReducer";

const mapStateToProps = (state) => {
    return {
        rooms: state.dialogs.rooms,
        activeRoom: state.dialogs.activeRoom,
        modal: state.sidebar.modal,
        modalCreateErrorBool: state.sidebar.modalCreateError,
        modalNameText: state.dialogs.modalNameText,
        modalPasswordText: state.dialogs.modalPasswordText,
        roomPasswordText: state.dialogs.roomPasswordText,
        roomWithPassword: state.dialogs.roomWithPassword,
        isTruePasswordOfRoom: state.dialogs.isTruePasswordOfRoom,
        socket: state.socket.socket,
        messageReactionsBool: state.dialogs.messageReactionsBool,
        reactionsBtn: state.message.reactionsBtn,
    }
}

const DialogsContainer = connect(mapStateToProps, {openModal, getRooms, changeNameText,
    changePasswordText, createRoom, changeRoomPasswordText,
    switchRoom, checkIsTruePasswordOfRoom, sendText,
    sendMessage, getMessage, removeSomeMessages, 
    switchMessageReactions, getMessageDetails, addReactionThunk, 
    addReaction, addPressedReactions, modalCreateError, getIP})(Dialogs)

export default DialogsContainer;