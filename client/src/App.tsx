import React from 'react';
import Login from './pages/login/Login';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import Game from './pages/game/MultiplayerGame';
import Lobby from './pages/waitingroom/Lobby';
import ProtectedRouter from './components/ProtectedRouter';
import SinglePlayer from './pages/game/SinglePlayer';


function App() {
  return (
         <Router>
           <Switch>
             <Route exact path="/" component={Login} />
             <Route exact path="/single-game" component={SinglePlayer} />
             <ProtectedRouter exact path="/lobby" component={Lobby} />
             <ProtectedRouter exact path="/game" component={Game} />  
           </Switch>
        </Router>
  );
}

export default App;
