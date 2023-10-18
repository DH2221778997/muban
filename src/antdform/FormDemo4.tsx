import { Button, Form, Input } from 'antd';
import React from 'react';

const FormDemo4: React.FC = () => (
  <Form
    name="wrap"
    labelCol={{ flex: '100px' }}
    labelAlign="left"
    wrapperCol={{ flex: 1 }}
    labelWrap
    colon={false}
  >
    <Form.Item label="正常标签文案" name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label="超长标签文案超长标签文案" name="password" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label=" ">
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default FormDemo4;