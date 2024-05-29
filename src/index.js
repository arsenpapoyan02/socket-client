import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppContainer from './Components/App/AppContainer';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import socketIO from 'socket.io-client';

let socket = socketIO('https://socket-server-qp0w.onrender.com', {
    autoConnect: true
});
const root = ReactDOM.createRoot(document.getElementById('root'));
socket.connect();

// setTimeout(() => {
//   localStorage.setItem('userID', socket.id); 
//   if(!localStorage.getItem('pcID')) {
//     localStorage.setItem('pcID', socket.id);
//   }
// }, 220);

root.render(
// <React.StrictMode> 
  <Provider store={store}>
    <AppContainer socket={socket}/>
  </Provider>
/* </React.StrictMode> */
);
  
reportWebVitals();


