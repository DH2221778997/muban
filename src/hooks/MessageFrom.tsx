import { Form, Input, Select, Switch, Row, Col, Tooltip } from 'antd';
import { useAsyncRetryCatch } from 'hooks/useAsyncRetryCatch';
import React, { FC, useEffect, useState } from 'react';
import { getTemplateList } from 'services';
import styled from 'styled-components';
import { IWorkflowNodeFormProps } from './';
import { QuestionCircleOutlined } from '@ant-design/icons';

const SwitchLabel = styled.div`
  &::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
`;

const Question = styled(QuestionCircleOutlined)`
  cursor: pointer;
  position: relative;
  display: inline-block;
`;

export const MessageFrom: FC<IWorkflowNodeFormProps> = (props) => {
  const { usableOutput, startOutput, form, labelValidator, ...rest } = props;
  const { value: messageTemplate } = useAsyncRetryCatch(async () => {
    const res = await getTemplateList();
    return res;
  });
  const [content, setContent] = useState('');

  const messageTemplateList = messageTemplate ? messageTemplate.list : [];
  // const [currentWorkflowId, setCurrentWorkflowId] = useState<number | undefined>(undefined)

  /** 回填 */
  useEffect(() => {
    const extra = form.getFieldsValue()?.extra;
    if (!extra) return;
    form.setFieldsValue({
      ...form,
      smsTemplate: extra.smsTemplateId
        ? {
            value: extra.smsTemplateId,
            key: extra.smsTemplateId,
            label: form.getFieldsValue().branches || '',
          }
        : undefined,
      syncType: !!extra.syncType,
    });
    setContent(form.getFieldsValue()?.extra.smsContent);
  }, [form.getFieldsValue()]);

  return (
    <Form
      {...rest}
      form={form}
      onValuesChange={(changeValues, allValues) => {
        form.setFieldsValue({
          // ...form,
          // ...allValues,
          extra: {
            // ...form.getFieldsValue()?.extra,
            syncType: allValues.extra.syncType,
            smsContent: messageTemplateList.find(
              (item) => item.smsTemplateId === allValues.smsTemplate.value,
            )?.content,
            smsTemplateId: allValues.smsTemplate.value,
          },
          branches: [allValues.smsTemplate.label || '输出'],
        });
        setContent(form.getFieldsValue()?.extra.smsContent);
      }}
    >
      <Form.Item label="节点名称" name="label" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="短信模板"
        name={'smsTemplate'}
        rules={[{ required: true }]}
        preserve={false}
      >
        <Select
          labelInValue
          placeholder="请选择"
          options={messageTemplateList.map(({ smsTemplateId, name }) => ({
            value: smsTemplateId,
            label: name,
          }))}
        ></Select>
      </Form.Item>
      {content && (
        <div
          style={{
            padding: '10px 16px',
            marginTop: '-14px',
            marginBottom: '24px',
            background: '#FAFAFA',
          }}
        >
          {content}
        </div>
      )}
      <Row>
        <Col>
          <SwitchLabel>
            等待发送状态回调{' '}
            <Tooltip
              arrowPointAtCenter
              title="如需在该节点判断短信是否发送成功需开启开关，短信发送状态回调可能需要较久时间，如非强需求建议不开启。"
            >
              <Question />
            </Tooltip>{' '}
            :&nbsp;
          </SwitchLabel>
        </Col>
        <Col>
          <Form.Item
            label="等待发送状态回调"
            name={['extra', 'syncType']}
            required
            valuePropName="checked"
            noStyle
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      {/* <Form.Item
        name={['extra', 'syncType']}
        label="等待发送状态回调"
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Switch />
      </Form.Item> */}
      <Form.Item name="branches" noStyle />
      <Form.Item name="extra" noStyle />
    </Form>
  );
};
