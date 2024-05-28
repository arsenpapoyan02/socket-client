import { connect } from "react-redux";
import Header from "./Header";

const mapStateToProps = (state) => {
    return {
        room: state.dialogs.activeRoom,
    }
}

const HeaderContainer = connect(mapStateToProps, null)(Header)

export default HeaderContainer;

