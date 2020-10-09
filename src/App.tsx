import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './style.less';
import Home from 'pages/home';
import Login from 'pages/login'

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
      </Router>
    );
  }
}

export default App;
