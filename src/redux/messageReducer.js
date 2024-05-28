const GET_MESSAGE_DETAILS = 'GET-MESSAGE-DETAILS';
const SWITCH_MESSAGE_REACTIONS = 'SWITCH-MESSAGE-REACTIONS';

const initialState = {
    reactionsBtn: false
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_MESSAGE_REACTIONS: 
            return {
                ...state,
               details: {...state.details, reactionsBtn: action.bool},
               reactionsBtn: action.bool
            }

        default:
            return state;
    }
}

export const getMessageDetails = (details) => ({type: GET_MESSAGE_DETAILS, details});
export const switchMessageReactions = (bool) => ({type: SWITCH_MESSAGE_REACTIONS, bool});

export default messageReducer;