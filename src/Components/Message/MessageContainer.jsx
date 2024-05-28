import { connect } from "react-redux";
import Message from "./Message";
import { switchMessageReactions,  addReaction, addPressedReactions, answerTo, testRemoveMessage} from "../../redux/dialogsReducer";

const mapStateToProps = (state) => {
    return {
        reactionsBtn: state.message.reactionsBtn,
        activeRoom: state.dialogs.activeRoom,
        socket: state.socket.socket,
    }
}

const MessageContainer = connect(mapStateToProps, {switchMessageReactions, addReaction, addPressedReactions, answerTo, testRemoveMessage})(Message);

export default MessageContainer;