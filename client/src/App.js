import './App.css';
import Navbar from './components/Navbar/Navbar'
import MeetingPage from './components/Meeting/MeetingPage';
import Auth from './components/Authentication/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import AboutMe from './components/AboutMe/AboutMe';
import Messenger from './components/Chat/Messenger/Messenger';
import VideoChatPage from './components/VideoChat/VideoChatPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/meeting' component={MeetingPage}/>
            <Route exact path='/chat' component={Messenger}/>
            <Route exact path='/aboutme' component={AboutMe}/>
            <Route exact path='/videochat' component={VideoChatPage}/>
            <Route path='/login' render={(props) => ( <Auth isLogin={true} {...props}/>)}/>
            <Route path='/signup' render={(props) => ( <Auth isLogin={null} {...props}/>)}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
