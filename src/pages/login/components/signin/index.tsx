import React, { Component } from 'react'
import './style.less'
import { Form, Input, Button, Icon, message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FormComponentProps } from 'antd/es/form';
import { HomePageCurComponents, LoginType } from 'src/enum';
import { autobind } from 'core-decorators';
import { MESSAGE_TIME } from '../../../../const/const'
import { loginUser } from '../../../../api/modules/login'


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

            const { code, message: text } = await loginUser(values);

            const path = {
                pathname: '/home',
                state: values,
            };

            if (code === LoginType.LOGIN_SUCCESS) {
                message.success('登录成功', MESSAGE_TIME);
                this.props.history.push(path);
            } else {
                this.props.form.setFields({
                    password: {
                        value: values.password,
                        errors: [new Error(text)],
                    }
                });
                message.error('登录失败', MESSAGE_TIME);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { changeCurComponent } = this.props;

        return (
            <Form onSubmit={(e: any) => this.confirmLogin(e)} className="land-box">
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