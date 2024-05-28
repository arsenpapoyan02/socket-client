import { connect } from "react-redux";
import Main from "./Main";

const mapStateToProps = (state) => ({
    socket: state.socket.socket
})

const MainContainer = connect(mapStateToProps, {})(Main);
export default MainContainer