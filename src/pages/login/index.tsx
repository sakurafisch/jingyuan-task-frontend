import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import './style.less';
import { autobind } from 'core-decorators';
import { HomePageCurComponents } from '../../enum'
import Home from './components/home';
import Signin from './components/signin'
import Register from './components/register'

interface State {
    curComponent: HomePageCurComponents
}

@autobind
class Login extends Component<RouteComponentProps, State> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            curComponent: HomePageCurComponents.HOME
        };
    }

    changeCurComponent = (curVal: HomePageCurComponents) : void => {
        this.setState({
            curComponent: curVal
        })
    }

    showCurComponent = () => {
        const { curComponent } = this.state;

        if (curComponent === HomePageCurComponents.HOME) {
            return <Home changeCurComponent={this.changeCurComponent}></Home>
        } else {
            return (
                <div className="login-container">
                    <div>
                        { curComponent === HomePageCurComponents.SIGNIN ?
                          <Signin changeCurComponent={this.changeCurComponent} /> :
                          <Register changeCurComponent={this.changeCurComponent} />}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                { this.showCurComponent() }
            </div>
        )
    }
}

export default Login;