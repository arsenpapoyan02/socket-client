import React from "react";
import './chat.scss';
import close from './close.png';

class Chat extends React.Component {

    render() {

        const changeText = (text) => {
            this.props.changeText(text);
        }

        const sendText = async (e) => {

            if((e.code === 'Enter' || e.code === 'NumpadEnter' || e === 'Enter') && this.props.text !== '') {
                const roomId = this.props.activeRoom.roomId;
                const userId = this.props.socket.id;
                const messages = this.props.activeRoom.messages;
                const date = new Date().toLocaleDateString('en-CA');
                
                const message = this.props.activeRoom.answerToBool ? {
                    answerTo: this.props.activeRoom.answerTo,
                    message: this.props.text
                } : this.props.text;

                console.log(userId);

                if(this.props.socket.id) {
                    this.props.socket.emit('message', {
                        id: Math.random(),
                        message: message,
                        userId: userId,
                        socketID: userId,
                        date: date,
                        reactionsBtn: false
                    })   
                }
            }
        }

        const closeAnswerTo = () => {
            this.props.answerTo(false);
        }

        return (
            <div className="chat">
                <div className="chat__inner">
                    {
                        this.props.activeRoom.answerToBool ?
                        <div className="chat__inner--answerTo">
                            <div className="chat__inner--answerTo--userInfo">
                                <h4>Answer to:</h4>
                                <h4 className="chat__inner--answerTo--username">User {this.props.activeRoom.answerTo.userId}</h4>
                                <p className="chat__inner--answerTo--text">{this.props.activeRoom.answerTo.message}</p>
                            </div>
                            <img src={close} alt="" className="chat__inner--answerTo--close" onClick={closeAnswerTo}/>
                        </div>
                        :
                        null
                    }
                    <div className="form">
                        <div className="form__chat--input">
                            <input type="text" className="chat__input" value={this.props.text} placeholder="Your text ..." onKeyDown={e => sendText(e)} onChange={e => changeText(e.target.value)}/>
                            <button type="button" className="btn" onClick={() => sendText('Enter')}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;