import React, { Component } from 'react';
import './style.less';
import logoImg from 'img/logo.svg';
import { Icon, Layout, Menu} from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';
import { autobind } from 'core-decorators';
import { siderMenu, menuComponent } from '../../const/sideMenu';

const { Sider } = Layout;

interface State {
  collapsed: boolean,
  curMenu: string
}

@autobind
class Home extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { 
      collapsed: false,
      curMenu: siderMenu[0].key
    }
  }

  toggleSider() {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  changeCurMenu(curVal: string) {
    this.setState({
      curMenu: curVal
    });
  };

  createMenuItem(menu: any) {
    const { match } = this.props;

    if (menu.children) {
      const menuItems = (menu.children).map((item: any) => (
        <Menu.Item key={item.key} onClick={e => this.changeCurMenu(e.key)}>
          <Link to={`${match.url}/${item.path}`}>
            <Icon type={item.icon} />
            <span>{item.text}</span>
          </Link>
        </Menu.Item>
      ));

      return (
        <Menu.SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.text}</span>
            </span>
          }
        >
          {menuItems}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={menu.key} onClick={e => this.changeCurMenu(e.key)}>
          <Link to={`${match.url}/${menu.path}`}>
            <Icon type={menu.icon} />
            <span>{menu.text}</span>
          </Link>
        </Menu.Item>
      );
    }
  }

  createSider() {
    return siderMenu.map(item =>
      this.createMenuItem(item)
    );
  }

  render() {
    const { match } = this.props;
    const { curMenu } = this.state;

    return (
      <Layout className="p-home">
        <Sider
          className="layout-sider"
          trigger={null}
          collapsible collapsed={this.state.collapsed}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={[`${siderMenu[0].key}`]}
            defaultSelectedKeys={[`${curMenu}`]}
          >
            <MenuItem className="collapsed-btn" onClick={this.toggleSider}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
              <span>Paper Stack</span>
            </MenuItem>

            {this.createSider()}
          </Menu>
        </Sider>

        <Layout>
          <Layout.Content>
            <Switch>
              <Route path={`${match.url}/:id?`} component={menuComponent[curMenu]}/>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }

  // render() {
  //   return (
  //     <Layout className="p-home">
  //       <Layout.Sider
  //         className="layout-sider"
  //         trigger={null}
  //         collapsible collapsed={this.state.collapsed}
  //       >
  //         <Menu
  //           theme="dark"
  //           mode="inline"
  //         >
  //           <MenuItem className="collapsed-btn" onClick={this.toggleSider}>
  //             <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
  //             <span>你好，沈阳换热站</span>
  //           </MenuItem>
  //           <MenuItem key="setting:1">表格</MenuItem>
  //           <MenuItem key="setting:2">柱状图</MenuItem>
  //           <MenuItem key="setting:3">折线图</MenuItem>

  //         </Menu>
  //       </Layout.Sider>
  //       <Layout>
  //         <Layout.Content>
  //           <Switch>
  //             <Route path="/home/histogram" component={Histogram}></Route>
  //           </Switch>
  //         </Layout.Content>
  //       </Layout>
  //     </Layout>
  //   )
  // }
}

export default Home;
