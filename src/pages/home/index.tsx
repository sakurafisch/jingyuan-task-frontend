import React, { Component } from 'react';
import './style.less';
import logoImg from 'img/logo.svg';
import { Icon, Layout, Menu, Switch } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import MenuItem from 'antd/lib/menu/MenuItem';
import { autobind } from 'core-decorators';
import { Route } from 'react-router';
import Histogram from '../chart/histogram'

interface State {
  collapsed: boolean,
}

@autobind
class Home extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { 
      collapsed: false
    }
  }

  toggleSider() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <Layout className="p-home">
        <Layout.Sider
          className="layout-sider"
          trigger={null}
          collapsible collapsed={this.state.collapsed}
        >
          <Menu
            theme="dark"
            mode="inline"
          >
            <MenuItem className="collapsed-btn" onClick={this.toggleSider}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
              <span>你好，沈阳换热站</span>
            </MenuItem>
            <MenuItem key="setting:1">表格</MenuItem>
            <MenuItem key="setting:2">柱状图</MenuItem>
            <MenuItem key="setting:3">折线图</MenuItem>

          </Menu>
        </Layout.Sider>
        {/* <Layout>
          <Layout.Content>
            <Switch>
            </Switch>
          </Layout.Content>
        </Layout> */}
      </Layout>
    )
  }
}

export default Home;
