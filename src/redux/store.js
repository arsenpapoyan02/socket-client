import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import sidebarReducer from "./sidebarReducer";
import dialogsReducer from "./dialogsReducer";
import socketReducer from "./socketReducer";
import messageReducer from "./messageReducer";

let reducers = combineReducers({
    sidebar: sidebarReducer,
    dialogs: dialogsReducer,
    message: messageReducer,
    socket: socketReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;