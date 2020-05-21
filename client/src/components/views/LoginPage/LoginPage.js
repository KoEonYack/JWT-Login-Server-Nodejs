import React, { useState } from 'react'
import Axios from 'axios'
import { userDispatch, useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
// import { Button, Input, Form, checkbox } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        // console.log('Email', Email);
        // console.log('Password', Password);

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error˝')
                }
            })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems:'center'
            , width: "100%", height: "100vh" 
        }}>

            {/* <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <Input 
                    type="email" 
                    value={Email} 
                    onChange={onEmailHandler} 
                    placeholder="Enter your email"
                />
                

                <label>Password</label>
                <Input
                    type="password" 
                    value={Password} 
                    onChange={onPasswordHandler} 
                    placeholder="Enter your Password"
                />
                 */}

                <Form 
                    style={{ display: 'flex', flexDirection: 'column' }}
                    onSubmit={onSubmitHandler}
                >

                    <Form.Item required>
                        <Input                         
                            label="Email"
                            value={Email} 
                            onChange={onEmailHandler} 
                            placeholder="Enter your email"
                            rules={[
                                {
                                  required: true,
                                  message: 'Please input your username!',
                                },
                              ]}
                        />
                    </Form.Item>

                    <Form.Item required>
                        <Input
                            label="Password"
                            type="password" 
                            value={Password} 
                            onChange={onPasswordHandler} 
                            placeholder="Enter your Password"
                            rules={[
                                {
                                  required: true,
                                  message: 'Please input your username!',
                                },
                            ]}
                        />

                    </Form.Item>
                
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <br />
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>

            {/* </form> */}
        </div>
    )
}

export default LoginPage
