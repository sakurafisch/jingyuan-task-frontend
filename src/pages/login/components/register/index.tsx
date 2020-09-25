// import { FormComponentProps } from 'antd/lib/form'
import { autobind } from 'core-decorators'
import React, { Component } from 'react'
import { RouteChildrenProps, withRouter } from 'react-router'
import { checkEmail, registerEmail } from 'src/api/modules/login'
import { HomePageCurComponents } from 'src/enum'
import { FormComponentProps } from 'antd/es/form'
import { Form, Input, Button, Icon, message} from 'antd'
import { MESSAGE_TIME } from 'src/const/const'

interface Props extends RouteChildrenProps, FormComponentProps {
    changeCurComponent: (curVal: HomePageCurComponents) => void
}

const registerEmailRule: object[] = [
    {
        type: 'email',
        message: '邮箱格式不正确',
    }, {
        required: true,
        message: '邮箱不能为空',
    }, {
        validator: async (rule: any, value: string, callback: any) => {
            const isEmailOk = (await checkEmail(value)).result.emailAvailable;
            if (!isEmailOk) {
                callback('该邮箱已经注册过了');
            } else {
                callback();
            }
        }
    }
];


@autobind
class Register extends Component<Props, any> {
    confirmRegister(e: any) {
        e.preventDefault();

        this.props.form.validateFields(async (err, values) => {
            if (err) {
                message.error('注册失败', MESSAGE_TIME);
                return;
            }

            const res: number = (await registerEmail(values)).code;
            if (res === 0) {
                message.success('注册成功', MESSAGE_TIME);
                this.props.history.push('/login');
            } else {
                message.error('注册失败', MESSAGE_TIME);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { changeCurComponent } = this.props;

        return (
            <Form onSubmit={(e: any) => this.confirmRegister(e)} className="land-box">
                <Form.Item>
                    {getFieldDecorator('email', {
                        validateFirst: true,
                        validateTrigger: 'onBlur',
                        rules: registerEmailRule
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
                        rules: [{ required: true, message: '密码不能为空' }],
                    })(
                        <Input.Password 
                            prefix={<Icon type="lock" />}
                            placeholder="请输入密码"
                            allowClear
                        />
                    )}
                </Form.Item>
                <Button className="land-login-btn" htmlType="submit">注册</Button>
                <div className="land-footer">
                    <span
                        className="land-footer-item land-footer-item-hover"
                    >
                        返回上层
                    </span>
                </div>
            </Form>
        );
    }
}

export default withRouter(Form.create<Props>({})((Register)));