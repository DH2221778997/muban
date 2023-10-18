import { Button, DatePicker, Form, Input, Select, Space, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';

const { Item } = Form;

const FormDemo2 = () => {
  const [form] = useForm()


  const onSelectChange = (value:string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({note:'hello,man'});
        break
      case 'female':
        form.setFieldsValue({note:'hi,lady'});
        break
      case 'other':
        form.setFieldsValue({note:'hi,there'})
    }
   }

  return (
    <Form labelCol={{ span: 8 }} form={form}>
      <Item name='birth' label='Date of birth'>
        <Item noStyle><DatePicker /></Item>
        <Item noStyle><Switch /></Item>
      </Item>
      <Item name='note' label='Note' rules={[{required:true,message:'请输入性别'}]}>
        <Input />
      </Item>
      <Item name='gender' label='Gender' rules={[{required:true,message:'请输入性别'}]}>
        <Select
          placeholder='选择选项'
          onChange={onSelectChange}
          options={[
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' },
            { label: 'other', value: 'other' },
          ]}
        ></Select>
      </Item>
      <Item label='aaa' noStyle shouldUpdate={
        (prev,cur) => prev.gender !== cur.gender
      }>
        {
          ({getFieldValue}) => 
            getFieldValue('gender') !== 'other' 
            ? null
            : (
              <Item label='Customize-gender' name='customizegender' rules={[{required:true,message:'请输入customize'}]}>
                <Input />
              </Item>
            )
        }
      </Item>
      <Item wrapperCol={{offset:8}}>
        <Space>
          <Button type='primary' htmlType='submit'>submit</Button>
          <Button type='default' onClick={() => form.resetFields()}>reset</Button>
          <Button type='link' onClick={() => form.setFieldsValue({note:'hi,man',gender:'male'})}>fill form</Button>
        </Space>
      </Item>
    </Form>
  );
};

export default FormDemo2;
