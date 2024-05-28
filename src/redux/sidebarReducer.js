const OPEN_MODAL = 'OPEN-MODAL';
const MODAL_CREATE_ERROR = 'MODAL-CREATE-ERROR';

let initialState = {
    modal: false,
    modalCreateError: null
};

let sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                // modal: !state.modal
                modal: action.modal,
                modalCreateError: false,
            }
        case MODAL_CREATE_ERROR:
            return {
                ...state,
                modalCreateError: action.bool
            }
        default:
            return state;
    }
}

export const openModal = (modal) => ({type: OPEN_MODAL, modal});
export const modalCreateError = (bool) => ({type: MODAL_CREATE_ERROR, bool});

export default sidebarReducer;