import { connect } from "react-redux";
import Chat from "./Chat";
import { changeText, sendText, sendMessage, getRooms, getMessage, removeSomeMessages, answerTo } from "../../redux/dialogsReducer";

const mapStateToProps = (state) => {
    return {
        text: state.dialogs.text,
        activeRoom: state.dialogs.activeRoom,
        socket: state.socket.socket
    }
}

const ChatContainer = connect(mapStateToProps, {changeText, sendText, sendMessage, getRooms, getMessage, removeSomeMessages, answerTo})(Chat)

export default ChatContainer;