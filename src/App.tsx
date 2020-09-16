import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './style.less';
import Home from 'pages/home';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home}></Route>
        <Route path="/home" component={Home}></Route>
      </Router>
    );
  }
}

export default App;
