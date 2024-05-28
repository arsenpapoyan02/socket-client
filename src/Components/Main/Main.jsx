import React from "react";
import './main.scss';
import ChatContainer from '../Chat/ChatContainer';
import DialogsContainer from "../Dialogs/DialogsContainer";

class Main extends React.Component {
    
    render() {

        return(
            <div className="main">
                <div className="main__inner">
                    <DialogsContainer />
                    <ChatContainer />
                </div>
            </div>
        )
    }
}

export default Main;