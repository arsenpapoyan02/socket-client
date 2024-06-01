import {usersAPI} from './api.js';
const SWITCH_ROOM = 'SWITCH-ROOM';
const CHANGE_TEXT = 'CHANGE-TEXT';
const SEND_TEXT = 'SEND-TEXT';
const GET_ROOMS = 'GET-ROOMS';
const CHANGE_NAME_TEXT = 'CHANGE-NAME-TEXT';
const CHANGE_PASSWORD_TEXT = 'CHANGE-PASSWORD-TEXT';
const CHANGE_ROOM_PASSWORD_TEXT = 'CHANGE-ROOM-PASSWORD-TEXT';
const ACTIVE_ROOM_WITH_PASSWORD = 'ACTIVE-ROOM-WITH-PASSWORD';
const CHECK_IS_TRUE_PASSWORD_OF_ROOM = 'CHECK-IS-TRUE-PASSWORD-OF-ROOM';
const REMOVE_MESSAGES = 'REMOVE-MESSAGES';
const SWITCH_MESSAGE_REACTIONS = 'SWITCH-MESSAGE-REACTIONS';
const ADD_REACTION = 'ADD_REACTION';
const ADD_PRESSED_REACTIONS = 'ADD-PRESSED-REACTIONS';
const ANSWER_TO = 'ANSWER-TO';

const initialState = {
    rooms: [],
    activeRoom: [],
    text: '',
    modalNameText: '',
    modalPasswordText: '',
    roomPasswordText: '',
    roomWithPassword: {},
    isTruePasswordOfRoom: null,
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_ROOM: {
            return {
                ...state,
                activeRoom: action.activatedRoom,
                roomPasswordText: ''
            }
        }
        case CHANGE_TEXT: 
        // debugger;
            return {
                ...state,
                text: action.text
            }
        case SEND_TEXT:
            // debugger;
            return {
                ...state,
                text: '',
                activeRoom: {...state.activeRoom, messages: {...state.activeRoom.messages, [action.lastMessageKey]: {id: action.id, userId: action.userId, message: action.message, reactionsBtn: false}},},
                rooms: state.rooms.map(key => {
                    if(key.roomId === action.roomId) {
                        return {...key, messages: {...key.messages, [action.lastMessageKey]: {message: action.message, id: action.id, userId: action.userId}}}
                    }
                    return key
                })
            }
        case SWITCH_MESSAGE_REACTIONS: 
        // debugger;
            return {
                ...state,
                ...state.activeRoom.messages,
                ...(Object.values(state.activeRoom.messages).map(key => {
                    if(key.id === action.id && key.id !== undefined) {
                        key.reactionsBtn = action.bool
                    }
                })),
                activeRoom: {...state.activeRoom, messages: {...(Object.values(state.activeRoom.messages).map(key => {
                    if(action.id === key.id) {
                        return {...key, reactionsBtn: action.bool}
                    }
                    else if(action.id === undefined) {
                        return {...key, reactionsBtn: false}
                    }
                    else {
                        return {...key, reactionsBtn: false}
                    }
                }))}}
            }
        case ADD_REACTION: 
            return {
                ...state,
                ...state.activeRoom.messages,
                activeRoom: {...state.activeRoom, messages: {...(Object.values(state.activeRoom.messages).map(key => {
                    if(action.id === key.id) {
                        return {...key, reactions: {...key.reactions, [action.pcId]: action.reactions}}
                    }
                    else {
                        return {...key};
                    }   
                }))}}
            }
        case ADD_PRESSED_REACTIONS: 
            return {
                ...state,
                ...state.activeRoom.messages,
                activeRoom: {...state.activeRoom, messages: {...(Object.values(state.activeRoom.messages).map(key => {
                    if(action.id === key.id) {
                        return {...key, pressedReactions: action.pressedReactions, countReacts: action.countReacts}
                    }
                    else {
                        return {...key};
                    }   
                }))}}
            }
        case ANSWER_TO:
            return {
                ...state,
                activeRoom: {...state.activeRoom, answerToBool: action.bool, answerTo: {userId: action.userId, message: action.message}}
            }
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.obj,
                activeRoom: action.obj[1]
            }
        case CHANGE_NAME_TEXT:
            return {
                ...state,
                modalNameText: action.text
            }
        case CHANGE_PASSWORD_TEXT:
            return {
                ...state,
                modalPasswordText: action.text
            }
        case CHANGE_ROOM_PASSWORD_TEXT:
            return {
                ...state,
                roomPasswordText: action.text
            }
        case ACTIVE_ROOM_WITH_PASSWORD:
            return {
                ...state,
                roomWithPassword: action.obj
            }
        case CHECK_IS_TRUE_PASSWORD_OF_ROOM:
            return {
                ...state,
                isTruePasswordOfRoom: action.bool
            }
        case REMOVE_MESSAGES:
            
            return {
                ...state,
                ...state.activeRoom.messages,
                ...(delete state.activeRoom.messages[Object.keys(state.activeRoom.messages)[0]])
            }
        default:
            return state;
    }
}

export const switchRoom = (activatedRoom) => ({type: SWITCH_ROOM, activatedRoom});
export const changeText = (text) => ({type: CHANGE_TEXT, text});
export const sendText = (lastMessageKey, message, id, roomId, userId) => ({type: SEND_TEXT, message, lastMessageKey, id, roomId, userId});
export const getRooms = (obj) => ({type: GET_ROOMS, obj: obj});
export const changeNameText = (text) => ({type: CHANGE_NAME_TEXT, text});
export const changePasswordText = (text) => ({type: CHANGE_PASSWORD_TEXT, text});
export const changeRoomPasswordText = (text) => ({type: CHANGE_ROOM_PASSWORD_TEXT, text});
export const activeRoomWithPassword = (obj) => ({type: ACTIVE_ROOM_WITH_PASSWORD, obj})
export const checkIsTruePasswordOfRoom = (bool) => ({type: CHECK_IS_TRUE_PASSWORD_OF_ROOM, bool})
export const removeMessagesFromUI = () => ({type: REMOVE_MESSAGES});
export const switchMessageReactions = (bool, id) => ({type: SWITCH_MESSAGE_REACTIONS, bool, id});
export const addReaction = (id, pcId, reactions) => ({type: ADD_REACTION, id, pcId, reactions});
export const addPressedReactions = (id, pressedReactions, countReacts) => ({type: ADD_PRESSED_REACTIONS, id, pressedReactions, countReacts});
export const answerTo = (roomId, userId, message, bool) => ({type: ANSWER_TO, roomId, userId, message, bool});
export const testRemoveMessage = (roomId, userId) => (dispatch) => {
    return usersAPI.testRemoveMessage(roomId, userId)
    // .then(res => console.log)
}

export const addReactionThunk = (roomId, userId, id, pcId, reactions) => (dispatch) => {
    return usersAPI.addReaction(roomId,  userId, id, pcId, reactions)
    .then(res => {
        dispatch(addReaction(id, pcId, reactions));
    })
    .catch(err => console.log(err));

}

export const sendMessage = (message, roomId, id, userId, date, reactionsBtn) => (dispatch) => {
    // debugger;
    return usersAPI.sendMessage(message, roomId, id, userId, date, reactionsBtn);
}

export const getMessage = (roomId, id, userId) => (dispatch) => {
    // debugger;
    return usersAPI.getMessage(roomId)
    .then(res => {
        let lastMessageKey = Object.keys(res.val().messages)[Object.keys(res.val().messages).length - 1];
        let lastMessage = Object.values(res.val().messages)[Object.keys(res.val().messages).length - 1];
        dispatch(sendText(lastMessageKey, lastMessage.message, id, roomId, userId));
        dispatch(answerTo(false));
    })
}

export const getRoomsThunk = () => (dispatch) => {
    return usersAPI.getRooms()
    .then(res => dispatch(getRooms(res.val())));
}

export const createRoom = (roomId, name, password, pcId) => (dispatch) => {
    return usersAPI.createRoom(roomId, name, password, pcId)
    .then(() => dispatch(getRoomsThunk()));
}
export const removeSomeMessages = (roomId, messages) => (dispatch) => {
    return usersAPI.removeMessages(roomId, messages)
    .then(() => dispatch(removeMessagesFromUI()))
    .catch(err => {
        console.log(err);
    })
} 

export const getIP = (roomId, pcID) => (dispatch) => {
    console.log(roomId);
    return usersAPI.getIP(roomId, pcID)
}  

export default dialogsReducer;