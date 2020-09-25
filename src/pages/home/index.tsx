import React, { PureComponent } from 'react';
import './style.less';
import logoImg from 'img/logo.svg';

class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <img src={logoImg} className="app-logo" />
        <h1>你好，沈阳换热站</h1>
      </div>
    );
  }
}

export default App;
