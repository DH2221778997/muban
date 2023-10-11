import { Form } from 'antd';
import { FormInstance, FormProps } from 'antd/lib/form';
import { FormDrawer } from 'components/base/FormDrawer';
import { useWorkflowContext } from 'context/WorkflowContext';
import React, { FC, useEffect } from 'react';
import {
  IOutPut,
  IRequestItems,
  IValidatorProps,
  IWorkflowFeNodeItem,
  IWorkflowNodeOutputItem,
  IWorkflowNodeSetParamsOutputItem,
  RegisterFormValue,
  RemoteSearchFormValue,
  SmarterJudgeType,
  workflowNodeMap,
  WorkflowNodeType,
  MessageFormValue,
} from 'types';
import { findParentNodeIds } from 'utils/workflow';

import { AiCallForm } from './AiCallForm';
import { ExecuteForm } from './ExecuteForm';
import { JudgeForm } from './JudgeForm';
import { SetParamsForm } from './SetParamsForm';
import { StartForm } from './StartForm';
import { SubWorkflowForm } from './SubWorkflowForm';
import { RemoteSearchForm } from './RemoteSearchForm';
import { TimeForm } from './TimeForm';
import { RegisterForm } from './RegisterForm';
import { MessageFrom } from './MessageFrom';

// import moment from 'antd/node_modules/moment';
import moment from 'moment';
import { registerNodeExtraToBackEnd, registerNodeOutputToBackEnd } from './utils/workfolwData';

export interface IWorkflowNodeFormProps extends FormProps {
  form: FormInstance;
  startOutput: IWorkflowNodeOutputItem[];
  usableOutput: IWorkflowFeNodeItem[];
  labelValidator: IValidatorProps;
  setParamsOutput?: IWorkflowNodeSetParamsOutputItem[];
  customNodeExtra?: any;
  output?: IOutPut[];
}

export const NodeEditForm: FC = () => {
  const [form] = Form.useForm();
  const {
    formValue,
    setFormValue,
    dataSource,
    setDataSource,
    labelValidator,
  } = useWorkflowContext();

  /** 得到默认的form表单的数据，用于form值的写入，这个函数用于兼容原逻辑，建议逻辑区分节点数据 */
  const getDefaultFormValue = (value) => {
    const {
      label,
      branches,
      callParams,
      workflowParams,
      themeId,
      startOutput,
      judgeOutput,
      aiCallOutput,
      setParamsOutput,
      smsTemplate,
      syncType,
    } = value;
    const compatibleJudgeOutput = judgeOutput?.map(({ children, ...output }) => {
      const compatibleChildren = children.map((child) => {
        const { label, ...otherInfo } = child;
        return {
          label: Array.isArray(label)
            ? { nodeValue: label, judgeType: SmarterJudgeType.DID_NOT_COMPACT }
            : label,
          ...otherInfo,
        };
      });
      return {
        children: compatibleChildren,
        ...output,
      };
    });
    return {
      label,
      branches,
      callParams,
      themeId,
      startOutput,
      judgeOutput: compatibleJudgeOutput,
      workflowParams,
      aiCallOutput,
      setParamsOutput,
      smsTemplate,
      syncType,
    };
  };

  /** 得到远程查询节点的表单的默认数据，用于填入form,这个地方，需要兼容后端传递的值和前端临时存储的值 */
  const getFormValueForRemoteSearch = (value) => {
    // 如果是新增的节点, 肯定没有extra值，这个时候需要填写一些默认值返回
    if (!value.extra) {
      value.extra = {
        requestMethod: 'POST',
        timeout: '2',
      };
      value.frontParams = {
        paramType: 'QUERY',
        isAppSecret: false,
      };
      return value;
    }
    // 如果是body，就直接返回
    if (value.extra.paramType === 'BODY') {
      return value;
    }
    // 如果是Query的情况，而且对应的值是数组，不需要转
    if (Array.isArray(value.extra.requestItems)) {
      return value;
    }
    /** 临时的查询参数json转对象的字段 */
    let tempValue = {};
    /** 临时的查询参数对象转数组的字段 */
    let tempValueList: IRequestItems[] = [];
    try {
      tempValue = JSON.parse(value.extra.requestItems);
    } catch (error) {
      console.error(error);
    }
    // 这个地方反向恢复数据
    if (Object.keys(tempValue).length > 0) {
      // 将后端给的查询参数的json转为前端表单需要的数组格式
      tempValueList = value.frontParams.frontOutPut;
    }
    value.extra.requestItems = tempValueList;
    value.extra.resultItems = value.frontParams.resultItems;
    console.log('远程查询节点的formValue', value);
    return value;
  };

  /** 得到远程查询节点的表单的默认数据，用于填入form,这个地方，需要兼容后端传递的值和前端临时存储的值 */
  const getFormValueForTime = (value) => {
    // 时间的moment格式传给后端会变成字符串，需要转一下格式
    if (
      value.frontParams &&
      value.frontParams.executeTime &&
      typeof value.frontParams.executeTime === 'string'
    ) {
      value.frontParams.executeTime = moment(value.frontParams.executeTime, 'HH:mm:ss');
    }
    return value;
  };

  const getFormValueForMessage = (value) => {
    if (!value.extra) {
      value.extra = {
        smsContent: '',
        smsTemplateId: null,
        syncType: 0,
      };
    }
    return value;
  };

  const getFormValueForRegister = (value) => {
    //从接口获取，或者第一次新增的地方取
    value.frontParams = value.customNodeExtra || value.frontParams;
    // if (value.extra) {
    //   let replaceParamsArray = [...Object.entries(value?.extra?.replaceParams || {})];
    //   const newReplaceParams = {};
    //   replaceParamsArray.forEach(([name, value = '']: any) => {
    //     if(typeof value !== 'string') {
    //       newReplaceParams[name] = {
    //         nodeValue: value,
    //       };
    //     }else{
    //       newReplaceParams[name] = {
    //         nodeValue: value.replace('${','').replace('}','').split('_'),
    //       };
    //     };

    //   });
    //   value.extra.replaceParams = newReplaceParams;

    //   console.log(Object.entries(value?.extra?.replaceParams || {}));
    // }

    return value;
  };

  /** 根据节点的不同，进行不同数据的过滤 */
  const filterFormValueByNodeType = (type) => {
    switch (type) {
      case WorkflowNodeType.REMOTE_SEARCH:
        return getFormValueForRemoteSearch;
      case WorkflowNodeType.TIME:
        return getFormValueForTime;
      case WorkflowNodeType.REGISTER:
        return getFormValueForRegister;
      case WorkflowNodeType.MESSAGE:
        return getFormValueForMessage;
      default:
        /** 处理以前的逻辑 */
        return getDefaultFormValue;
    }
  };
  /** 默认写入form的数据，但是需要根据节点类型的不同，进行不同的值的写入 */
  useEffect(() => {
    if (!!formValue) {
      /** 根据节点类型执行不同的函数 */
      const value = filterFormValueByNodeType(formValue.nodeType)(formValue);
      /** 填充表单的值 */
      form.setFieldsValue(value);
    } else {
      form.resetFields();
    }
  }, [filterFormValueByNodeType, form, formValue]);

  const renderForm = () => {
    if (!dataSource) {
      return null;
    }
    // startOutput: 开始节点的output 和 usableOutput: 节点之前可用的output list
    const startOutput = dataSource.nodes[0].startOutput as IWorkflowNodeOutputItem[];
    // 得到所有的节点的变量
    const usableOutput = findParentNodeIds(formValue!.id, dataSource.lines)
      .map((itemId) =>
        dataSource.nodes.find(({ id, nodeType }) => {
          return (
            id === itemId &&
            (nodeType === WorkflowNodeType.START ||
              nodeType === WorkflowNodeType.AI_CALL ||
              nodeType === WorkflowNodeType.REGISTER)
          );
        }),
      )
      .filter((item) => item !== undefined) as IWorkflowFeNodeItem[];

    const commonProps = {
      form,
      startOutput,
      usableOutput: usableOutput,
      layout: 'vertical' as 'vertical',
      labelValidator: labelValidator!,
      options,
      // 新增的自定义节点从 customNodeExtra 中取
      customNodeExtra: formValue?.customNodeExtra
        ? formValue.customNodeExtra
        : formValue?.frontParams || {},
    };

    switch (formValue!.nodeType) {
      case WorkflowNodeType.START: {
        return <StartForm {...commonProps} />;
      }
      case WorkflowNodeType.JUDGE: {
        return <JudgeForm {...commonProps} />;
      }
      case WorkflowNodeType.AI_CALL: {
        return <AiCallForm {...commonProps} />;
      }
      case WorkflowNodeType.SET_PARAMS: {
        return <SetParamsForm {...commonProps} setParamsOutput={formValue?.setParamsOutput} />;
      }
      case WorkflowNodeType.SUB_WORKFLOW: {
        return <SubWorkflowForm {...commonProps} />;
      }
      case WorkflowNodeType.REMOTE_SEARCH: {
        return <RemoteSearchForm {...commonProps} />;
      }
      case WorkflowNodeType.TIME: {
        return <TimeForm {...commonProps} />;
      }
      case WorkflowNodeType.REGISTER: {
        return <RegisterForm {...commonProps} />;
      }
      case WorkflowNodeType.MESSAGE: {
        return <MessageFrom {...commonProps} />;
      }
      // 暂时不支持编辑
      // case WorkflowNodeType.END: {
      //   return <EndForm {...commonProps} key="EndForm" />;
      // }
      default: {
        return;
      }
    }
  };

  /**
   * TODO: 需要进一步拆分不同节点类型的filter函数
   * 提交表单前处理值的默认函数，可用于处理大部分逻辑
   * @param values form返回的数据，写any是因为这个函数兼容了很多节点的类型和数据，需要进一步拆分
   * @returns
   */
  const filterFormValueForNormal = (values: any) => {
    const {
      label,
      branches,
      callParams,
      themeId,
      startOutput,
      judgeOutput,
      aiCallOutput,
      setParamsOutput,
      workflowParams,
      smsTemplate,
      syncType,
      wxIdList,
      hello,
    } = values;
    return dataSource!.nodes.map((item) => {
      if (item.id === formValue?.id) {
        console.log(item);
        return {
          ...item,
          label,
          branches,
          callParams,
          themeId,
          startOutput,
          judgeOutput,
          aiCallOutput,
          setParamsOutput,
          workflowParams,
          smsTemplate,
          syncType,
        };
      }
      return item;
    });
  };

  /**
   * 提交http节点的表单时，数据处理的函数
   */
  const filterValueForRemoteSearch = (values: RemoteSearchFormValue) => {
    return dataSource!.nodes.map((item) => {
      if (item.id === formValue?.id) {
        item.extra.ignoreError = Number(item.extra.ignoreError);
        return {
          ...item,
          ...values,
        };
      }
      return item;
    });
  };

  const filterValueForTime = (values: RemoteSearchFormValue) => {
    return dataSource!.nodes.map((item) => {
      if (item.id === formValue?.id) {
        return {
          ...item,
          ...values,
        };
      }
      return item;
    });
  };

  /**
   * 提交自定义节点的表单时，数据处理的函数
   */
  const filterValueForRegister = (values: RegisterFormValue) => {
    return dataSource!.nodes.map((item) => {
      if (item.id === formValue?.id) {
        // 转换后端需要的 extra.replaceParams
        values.extra.replaceParams = registerNodeExtraToBackEnd({ ...values.extra.replaceParams });
        return {
          ...item,
          ...values,
        };
      }
      return item;
    });
  };

  const filterValueForMessage = (values: MessageFormValue) => {
    return dataSource!.nodes.map((item) => {
      if (item.id === formValue?.id) {
        item.label = values.label;
        item.extra.smsContent = values.extra?.smsContent;
        item.extra.smsTemplateId = values.extra?.smsTemplateId;
        item.extra.syncType = values.extra?.syncType ? 1 : 0;
        item.branches = [values.smsTemplate?.label || '输出'];
        return {
          ...values,
          ...item,
        };
      }
      return item;
    });
  };

  /** 提交表单时，根据节点类型的不同来区别不同的form值处理函数 */
  const filterValueByFormType = () => {
    switch (formValue?.nodeType) {
      case WorkflowNodeType.REMOTE_SEARCH:
        return filterValueForRemoteSearch;
      case WorkflowNodeType.TIME:
        return filterValueForTime;
      case WorkflowNodeType.REGISTER:
        return filterValueForRegister;
      case WorkflowNodeType.MESSAGE:
        return filterValueForMessage;
      default:
        return filterFormValueForNormal;
    }
  };

  /**
   * 提交节点表单，更新整个DataSource
   */
  const handleOk = () => {
    form.validateFields().then((values) => {
      /** 得到新的node数据 */
      const nodes = filterValueByFormType()(values);
      console.log(nodes, '得到新的node数据');
      setDataSource({
        ...dataSource!,
        //@ts-ignore
        nodes,
        isJustShowContent: false,
      });
      setFormValue(undefined);
    });
  };

  const handleCancel = () => {
    setFormValue(undefined);
  };

  const title = formValue?.nodeType ? `${workflowNodeMap[formValue?.nodeType]}节点` : '';
  return (
    <FormDrawer
      title={title}
      visible={!!formValue?.id}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      // getContainer={() => document.querySelector('.byai-topology') || document.body}
    >
      {!!formValue?.id && renderForm()}
    </FormDrawer>
  );
};

export { ExecuteForm };
