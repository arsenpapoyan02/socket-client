import './App.css';
import SidebarContainer from '../Sidebar/SidebarContainer';
import HeaderContainer from '../Header/HeaderContainer';
import MainContainer from '../Main/MainContainer';

function App(props) {

  props.getSocket(props.socket);
  console.log(props.socket.id);
  
  return (
    <div className="App">
      <SidebarContainer />
      <HeaderContainer />
      <MainContainer />
    </div>
  );
}

export default App;
