import React, { PureComponent } from 'react';
import './style.less';
import logoImg from '@img/logo.png';

class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <img src={logoImg} alt=""/>
        <h1>Hello React Scaffold</h1>
        <h2>DangoSky</h2>
      </div>
    );
  }
}

export default App;
