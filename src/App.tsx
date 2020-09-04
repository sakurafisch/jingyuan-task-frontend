import React, { PureComponent } from 'react';
import { Button } from 'antd';
import './style.less';
import logoImg from '@img/logo.svg';
// import 'antd/dist/antd.css';

class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <img src={logoImg} className="app-logo" />
        <h1>Hello React Scaffold</h1>
        <h2>DangoSky</h2>
        <Button type="primary">Click</Button>
      </div>
    );
  }
}

export default App;
