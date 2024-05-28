const GET_SOCKET = 'GET-SOCKET'; 

const initialState = {
    socket: null
}

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SOCKET:
            // debugger;
            return {
                ...state,
                socket: action.socket
            }

        default:
            return state;
    }
}

export const getSocket = (socket) => ({type: GET_SOCKET, socket})

export default socketReducer;