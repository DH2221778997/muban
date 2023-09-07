import React from "react";
import "./index.scss";
import { Button, Form, Input } from "antd";
const Login = () => {
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="title">系统登录</div>
        <Form>
          <Form.Item>
            <Input />
          </Form.Item>
          <Form.Item>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
