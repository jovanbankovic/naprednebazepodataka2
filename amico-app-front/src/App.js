import './App.css';
import React from 'react';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Home from './components/home';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Route path="/home" component={Home} />
      <Route exact path="/register" component={Register} /> 
      <Route exact path="/" component={Login} />   
  </Router> 
  );
}
export default App;
