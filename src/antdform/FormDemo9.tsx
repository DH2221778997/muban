import { Button, Form, Input, Modal, Radio } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'


const { Item } = Form
const FormDemo9 = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [ form ] = useForm()
  return (
    <>
      <Button type='primary' onClick={() => setIsModalOpen(true)}>New Collection</Button>
      <Modal
        visible={isModalOpen}
        title='create a new collection'
        okText='创建'
        onOk={() => form.validateFields().then(res => setIsModalOpen(false))}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          layout='vertical'
          form={form}
          initialValues={{
            mode:'public'
          }}
        >
          <Item name='title' label='Title' rules={[{required:true,message:'请填写标题'}]}><Input /></Item>
          <Item name='description' label='description'><Input /></Item>
          <Item name='mode'>
            <Radio.Group >
              <Radio value='public'>Public</Radio>
              <Radio value='private'>Private</Radio>
            </Radio.Group>
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default FormDemo9