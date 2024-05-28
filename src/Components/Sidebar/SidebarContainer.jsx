import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import { openModal } from "../../redux/sidebarReducer";
import { createRoom } from "../../redux/dialogsReducer";

const mapStateToProps = (state) => {
    return {
        rooms: state.dialogs.rooms,
        modal: state.sidebar.modal
    }
}

const SidebarContainer = connect(mapStateToProps, {openModal,createRoom})(Sidebar);

export default SidebarContainer;