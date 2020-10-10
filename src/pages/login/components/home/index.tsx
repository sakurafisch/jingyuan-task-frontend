import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router';
import { HomePageCurComponents } from '../../../../enum';
import './style.less';
import { withRouter } from "react-router";
import logoImg from 'img/logo.svg';



interface Props extends RouteComponentProps {
    changeCurComponent: (curVal: HomePageCurComponents) => void
}

class HOME extends Component<Props> {
    render() {
        const { changeCurComponent } = this.props;

        return (
            <div className="home-container">
                <img src={logoImg}></img>
                <div className="title-box">
                    <h1>你好，沈阳换热站</h1>
                </div>
                <div className="button-box">
                    <button onClick={() => changeCurComponent(HomePageCurComponents.SIGNIN)}>登录</button>
                    <button onClick={() => changeCurComponent(HomePageCurComponents.REGISTER)}>注册</button>
                </div>
            </div>
        )
    }
}

export default withRouter(HOME);