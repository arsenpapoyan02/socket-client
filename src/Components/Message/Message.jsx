import React from "react";
import './message.scss';
import answer from './answer.png';
import smile from './smile.png';
import like from './like.png';
import heart from './heart.png';
import dislike from './dislike.png';
import hundred from './hundred.png';

class Message extends React.Component {

    componentDidMount() {
        
    }

    render() {

        const switchMessageReactions = (e) => {
            this.props.switchMessageReactions(!this.props.details.reactionsBtn, this.props.details.id);
        }

        const addReaction = async (e) => {
            let roomId = this.props.activeRoom.roomId;
            let userId = this.props.details.userId;
            let messageId = this.props.details.id;
            let pcId = localStorage.getItem('pcID');
            let reactionId = e.target.id;

            if(reactionId.length > 1){
                reactionId = reactionId.slice(reactionId.length - 1);
            }

            let reactions = {
                byUserId: pcId,
                reaction: reactionId,
            }

            this.props.socket.emit('reaction', {
                roomId: roomId,
                userId: userId,
                messageId: messageId,
                pcId: pcId,
                reactions: reactions,
            })
        }

        let reactionsArr = [];
        let countReacts = [];
        let newReactionsArr = [];

        if(this.props.details.reactions) {

            let forLength = Object.keys(this.props.details.reactions).length;
            
            for(let i = 0; i < forLength; i++) {
                reactionsArr.push(Object.values(this.props.details.reactions)[i].reaction);
            }

            for(let i = 0; i < reactionsArr.length; i++) {
                let digit = reactionsArr[i];
                let counter = 0;
                let counterObj;
                for(let j = 0; j < reactionsArr.length; j++) {
                    if(digit === reactionsArr[j]) {
                        counter++;
                    }
                    if(j === reactionsArr.length - 1) {
                        counterObj = {counter: counter, reactionId: reactionsArr[j]}
                    }
                }
                if(counter.counter > 1) {
                    reactionsArr.splice(i, 1);   
                }
                countReacts.push(counterObj);
            }

            newReactionsArr = reactionsArr.filter((item, index) => {
                return reactionsArr.indexOf(item) === index
            });     

            // this.props.addPressedReactions(this.props.details.id, newReactionsArr, countReacts);
        }

        const answerTo = () => {
            let roomId = this.props.activeRoom.roomId;
            let userId = this.props.details.userId;
            let messageId = this.props.details.id;
            let message = typeof(this.props.details.message) === 'object' ? this.props.details.message.message : this.props.details.message ;
            let bool = true;

            this.props.answerTo(roomId, userId, message, bool);
        }

        return (
            <div className="message">
                <div className={`dialogs__inner--item ${this.props.details.reactionsBtn && this.props.details.id ? 'active' : null}`}>
                    <div className="dialogs__item--userinfo">
                        <h4 className="dialogs__item--username">User {this.props.details.userId}</h4>
                        <h6 className="dialogs__item--time">{this.props.details.date}</h6>
                        <div className={`dialogs__item--settings`}>
                            <div className="dialogs__item--settings--tool reaction" onClick={(e) => switchMessageReactions(e)} id="reaction">
                                <img src={smile} alt="" id="reaction"/>
                                <div className="dialogs__item--settings--tool--text">
                                    <p>Add reaction</p>
                                    <div className="dialogs__item--settings--tool--triangle"></div>
                                </div>
                                <div className={`dialogs__item--settings--tool--reactions`} id="reaction">
                                    <div className="item__settings--tool--reactions--images">
                                        <div className="item__settings--reactions--image" id="1" onClick={(e) => addReaction(e)}><img src={heart} alt="" width={25} id='reaction 1'/></div>
                                        <div className="item__settings--reactions--image" id="2" onClick={(e) => addReaction(e)}><img src={like} alt="" width={25} id='reaction 2'/></div>
                                        <div className="item__settings--reactions--image" id="3" onClick={(e) => addReaction(e)}><img src={hundred} alt="" width={25} id='reaction 3'/></div>
                                        <div className="item__settings--reactions--image" id="4" onClick={(e) => addReaction(e)}><img src={dislike} alt="" width={25} id='reaction 4'/></div>
                                    </div>
                                </div>
                            </div>
                            <div className="dialogs__item--settings--tool answer" onClick={answerTo}>
                                <img src={answer} alt="" />
                                <div className="dialogs__item--settings--tool--text">
                                    <p>Answer</p>
                                    <div className="dialogs__item--settings--tool--triangle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        typeof(this.props.details.message) === 'object' ?
                        <div className="dialogs__item--answerTo">
                            <div className="chat__inner--answerTo message__layer">
                                <div className="chat__inner--answerTo--userInfo">
                                    <p className="chat__inner--answerTo--username">Answered to user {this.props.details.message.answerTo.userId}</p>
                                    <p className="chat__inner--answerTo--text">{this.props.details.message.answerTo.message}</p>
                                </div>
                            </div>
                        </div> : null
                    }
                    <p className="dialogs__item--message">{typeof(this.props.details.message) === 'object' ? this.props.details.message.message : this.props.details.message}</p>
                    <div className="message__reactions">
                        {
                            this.props.details.reactions !== undefined ?
                            newReactionsArr.map(key => {
                                return (
                                        <div className="message__reactions--image" key={Math.random()}>
                                            <img src={key === '1' ? heart : key === '2' ? like : key === '3' ? hundred : dislike} alt="" />
                                            {
                                               countReacts.map(key2 => {
                                                    if(key2.reactionId === key && key2.counter > 1) {
                                                        return <p className="message__reaction--count" key={key + Math.random()}>x{key2.counter}</p>
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Message;