import React, { Component } from 'react'
import './style.less'
import { Form, Input, Button, Icon, message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FormComponentProps } from 'antd/es/form';
import { HomePageCurComponents, LoginType } from 'src/enum';
import { autobind } from 'core-decorators';
import { MESSAGE_TIME } from '../../../../const/const'
import axios from 'axios';
import logoImg from 'img/logo.svg';


interface Props extends FormComponentProps, RouteComponentProps {
    changeCurComponent: (curVal: HomePageCurComponents) => void
}

const loginEmailRules: object[] = [
    {
        type: 'email',
        message: '邮箱格式不正确',
    },
    {
        required: true,
        message: '邮箱不能为空'
    }
];

@autobind
class Signin extends Component<Props, any> {
    confirmLogin(e: any) {
        e.preventDefault();

        this.props.form.validateFields(async (err, values) => {
            if (err) {
                message.error('登录失败', MESSAGE_TIME);
                return;
            }

            const response = await axios({
                baseURL: 'http://127.0.0.1:5000/',
                method: 'get',
                auth: {
                    username: values.email.split('@')[0],
                    password: values.password
                }
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded',
                //     'Authorization': 'Basic ' + btoa(values.email.split('@')[0] + ':' + values.password),
                //     // 通过 Authorization 传递 base64 编码后的用户名密码
                //   },
            }).then(response => {
                return response.data;
              }).catch(error => {
                console.log(error);
                message.error('登录失败', MESSAGE_TIME);
                if (error.response) {
                  return Promise.reject(error.response.data);
                }
                return Promise.reject(error);
              });

            console.log(response);
            console.log(response);  
              
            if (response.code = 1) {
                message.success('登录成功', MESSAGE_TIME);
                this.props.history.push({
                    pathname: '/home',
                    state: values,
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { changeCurComponent } = this.props;

        return (

            <Form onSubmit={(e: any) => this.confirmLogin(e)} className="land-box">
                <div  className="react-logo-container">
                    <img src={logoImg} />
                </div>
                <Form.Item>
                    {getFieldDecorator('email', {
                        validateFirst: true,
                        validateTrigger: 'onBlur',
                        rules: loginEmailRules
                    })(
                        <Input 
                            prefix={<Icon type="user" />}
                            placeholder="请输入邮箱"
                            allowClear
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        validateFirst: true,
                        rules: [{ required: true, message: '密码不能为空'}],
                    })(
                        <Input.Password 
                            prefix={<Icon type="lock" />}
                            placeholder="请输入密码"
                            allowClear
                        />
                    )}
                </Form.Item>
                <Button className="land-login-btn" htmlType="submit">登录</Button>
                <div className="land-footer">
                    <span
                        className="land-footer-item land-footer-item-hover"
                        onClick={() => changeCurComponent(HomePageCurComponents.HOME)}
                    >
                        返回上层
                    </span>
                    <span className="land-footer-item land-footer-item-hover">忘记密码</span>
                </div>
            </Form>
        )
    }
}



export default withRouter(Form.create<Props>({})(Signin));