import React from "react";
import './dialogs.scss';
import close from './close.png';
import MessageContainer from "../Message/MessageContainer";

class Dialogs extends React.Component {
    
    componentDidMount() {
        
        console.log(this.props.socket.id)
    }

    render() {

        if(localStorage.getItem('userID') !== this.props.socket.id ) {
            this.props.socket.on('response', async (data) => {
                if(localStorage.getItem('userID') === data.userId) {
                    this.props.sendMessage(data.message, this.props.activeRoom.roomId, data.id, data.userId, null, data.reactionsBtn);
                    console.log(data);
                }
                setTimeout( async () => {
                    await this.props.getMessage(this.props.activeRoom.roomId, data.id, data.userId);
                    const roomMessagesLength = Object.keys(this.props.activeRoom.messages).length;
                    if(roomMessagesLength > 100) {
                        removeMessages();
                    }
                }, 220);
            })
            this.props.socket.on('res', async (data) => {
                if(localStorage.getItem('pcID') === data.pcId) {
                    await this.props.addReactionThunk(data.roomId, data.userId, data.messageId, data.pcId, data.reactions);
                }
                this.props.addReaction(data.messageId, data.pcId, data.reactions);
            })
        }

        document.addEventListener('click', (e) => {
            if(e.target.id !== 'reaction' && this.props.reactionsBtn) {
                this.props.switchMessageReactions(false);
            }
        })
        
        const removeMessages = () => {
            let messages = this.props.activeRoom.messages;
            let roomId = this.props.activeRoom.roomId;
            this.props.removeSomeMessages(roomId, messages);
        }

        const closeModal = (e) => {
            if(e.target.offsetParent.className !== 'modal__inner' || e.target.className === 'modal__close') {
                this.props.openModal();
                this.props.changeNameText('');
                this.props.changePasswordText('');
                this.props.changeRoomPasswordText('');
                this.props.checkIsTruePasswordOfRoom(null);
            }
            else {
                e.stopPropagation();
            }
        }

        const changeInputNameText = (text) => {
            this.props.changeNameText(text);
        }

        const changeInputPasswordText = (text) => {
            this.props.changePasswordText(text);
        }

        const createRoom = async () => {
            const pcId = localStorage.getItem('pcID');
            const maxRoomIds = this.props.rooms.length - 1;
            const roomName = this.props.modalNameText;
            const roomPassword = this.props.modalPasswordText;
            let isTherePcId = false;
            this.props.rooms.map(async key => {
                if(key.pcId === pcId) return isTherePcId = true;
            })
            if(!isTherePcId) {
                await this.props.createRoom(maxRoomIds + 1, roomName, roomPassword, pcId);
                this.props.openModal();
            } 
            else {
                this.props.modalCreateError(true);
            }
        }

        const changeInputRoomPasswordText = (text) => {
            this.props.changeRoomPasswordText(text);
        }

        const joinRoom = () => {
            if(this.props.roomPasswordText === this.props.roomWithPassword.password) {
                this.props.switchRoom(this.props.roomWithPassword);
                this.props.openModal();
                this.props.checkIsTruePasswordOfRoom(true);
            }
            else {
                this.props.checkIsTruePasswordOfRoom(false);
            }
        }

        return (
            <div className="dialogs">
                <div className="dialogs__inner">
                    {
                        this.props.activeRoom.messages !== undefined ? Object.values(this.props.activeRoom.messages).reverse().map(key => {
                            return (
                                <MessageContainer key={key.id ? key.id : Math.random()}
                                        details={key}
                                        socketId={this.props.socket.id}
                                        />
                            )
                        }) : null
                    }
                    <div className={`modal ${this.props.modal === 'create' ? 'active' : null}`} onClick={closeModal}>
                        <div className="modal__inner">
                            <img src={close} alt="" className="modal__close"/>
                            <h1 className="modal__title">Create new room</h1>
                            <div className="modal_form">
                                <div className="modal__form--item">
                                    <label>Name of the new room</label>
                                    <input type="text" placeholder="Name" value={this.props.modalNameText} onChange={(e) => changeInputNameText(e.target.value)}/>
                                </div>
                                <div className="modal__form--item">
                                    <label>Password of the new room (not necessery)</label>
                                    <input type="password" placeholder="Password" value={this.props.modalPasswordText} onChange={(e) => changeInputPasswordText(e.target.value)}/>
                                </div>
                                {
                                    this.props.modalCreateErrorBool ?
                                    <p className="modalError">You have created room.</p>
                                    :
                                    null
                                }
                                <button className="modal__btn" onClick={createRoom}>Create room</button>
                            </div>
                        </div>
                    </div>
                    <div className={`modal ${this.props.modal === 'password' ? 'active' : null}`} onClick={closeModal}>
                        <div className="modal__inner">
                            <img src={close} alt="" className="modal__close"/>
                            <h1 className="modal__title">Please fill the correct password</h1>
                            <div className="modal_form">
                                <div className="modal__form--item">
                                    <label>Name of room: {this.props.roomWithPassword.name}</label>
                                    <input type="password" placeholder="Password" value={this.props.roomPasswordText} onChange={e => changeInputRoomPasswordText(e.target.value)}/>
                                    <label className={`wrongPassword ${!this.props.isTruePasswordOfRoom && this.props.isTruePasswordOfRoom != null ? 'active' : null}`}>Wrong password!</label>
                                </div>
                                <button className="modal__btn" onClick={joinRoom}>Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dialogs;