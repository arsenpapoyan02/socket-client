import { connect } from "react-redux";
import App from "./App";
import { getSocket } from "../../redux/socketReducer";

const AppContainer = connect(null, {getSocket})(App);

export default AppContainer;