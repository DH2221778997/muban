import { Collapse } from 'antd';
import Box from 'components/base/Box';
import { useWorkflowContext } from 'context/WorkflowContext';
import React, { FC } from 'react';
import {
  workflowNodeMap,
  WorkflowNodeType,
  WorkflowOutputType,
  FetchRegisterNodeResponseParams,
} from 'types';
import { uuid } from 'utils/common';
import { CaretRightOutlined } from '@ant-design/icons';
import CustomNodeHooks from '../hooks/CustomNodeHooks';
import {
  ConditionSolid,
  EndSolid,
  IcRemote,
  IcTimeSvg,
  Morenodes,
  OutboundSolid,
  SetUpSolid,
  StartSolid,
} from '@indata/icon-aegis-bap';
import { TemplateWrapper } from 'topology-byfe';
import { IcSubworkflow } from '../styled';
import NewNodeListModal from '../modal/NodeListModal';
import { CostomNodeContext } from '../hooks/CostomNodeContext';
import { SERVICE_ICON } from '../modal/NodeFrom';
import styled from 'styled-components';

const MorenodesIcon = styled(Morenodes)`
  font-size: 20px;
  margin-right: 8px;
  height: 28px;
  & g path:nth-child(2) {
    fill: #2f82f8 !important;
  }
`;

interface IProps {
  title: string;
  list: WorkflowNodeType[];
}

export const SideBar: FC = () => {
  const { dataSource, setCustomNodeExtra } = useWorkflowContext();
  const DATA_SOURCE: IProps[] = [
    {
      title: '基础节点',
      list: [WorkflowNodeType.JUDGE, WorkflowNodeType.SET_PARAMS, WorkflowNodeType.TIME],
    },
    {
      title: '服务节点',
      list: [
        WorkflowNodeType.AI_CALL,
        WorkflowNodeType.MESSAGE,
        WorkflowNodeType.REMOTE_SEARCH,
        WorkflowNodeType.SUB_WORKFLOW,
        WorkflowNodeType.END,
      ],
    },
  ];
  // extra: 自定义节点的参数不确定 key 值得
  const generatorNodeData = (nodeType: WorkflowNodeType, extra?: any) => {
    if (extra) {
      setCustomNodeExtra(extra.extra);
    } else {
      setCustomNodeExtra({});
    }
    const generatorLabel = () => {
      if (dataSource) {
        let preFix = workflowNodeMap[nodeType];
        // 如果是注册节点，就返回注册节点的名称，作为 label
        if (extra && nodeType === WorkflowNodeType.REGISTER) {
          //首先找到 node
          preFix = extra.name;
        }

        const labelList = dataSource.nodes.map((item) => item.label);
        let index = 1;
        let nextLabel = `${preFix}${index}节点`;
        // eslint-disable-next-line no-loop-func
        while (labelList.some((label) => label === nextLabel)) {
          index++;
          nextLabel = `${preFix}${index}节点`;
        }
        return nextLabel;
      }
    };

    const generatorCustomData = () => {
      switch (nodeType) {
        case WorkflowNodeType.JUDGE: {
          return {
            branches: ['默认'],
            judgeOutput: [],
          };
        }
        case WorkflowNodeType.AI_CALL: {
          return {
            branches: ['请选择'],
            aiCallOutput: [
              { label: '通话编号', type: WorkflowOutputType.TEXT },
              { label: '外呼时间', type: WorkflowOutputType.TEXT },
              {
                label: '通话状态',
                type: WorkflowOutputType.SELECT,
                enums: [
                  '已接听',
                  '拒接',
                  '无法接通',
                  '主叫号码不可用',
                  '空号',
                  '关机',
                  '占线',
                  '停机',
                  '未接',
                  '主叫欠费',
                  '呼损',
                  '黑名单',
                  '天盾拦截',
                  '线路盲区',
                  '呼叫次数超出限制',
                  '账号无效',
                  '呼出拦截',
                  '虚拟线路可选线路为空',
                ],
              },
              { label: '外呼时长', type: WorkflowOutputType.TEXT },
              { label: '通话轮次', type: WorkflowOutputType.TEXT },
              { label: '已拨打次数', type: WorkflowOutputType.TEXT },
              {
                label: '意向标签',
                type: WorkflowOutputType.SELECT,
                enums: [
                  'A级(较强)',
                  'B级(一般)',
                  'C级(很少)',
                  'D级(需筛选)',
                  'E级(需要再次跟进)',
                  'F级(无需跟进)',
                ],
              },
              { label: '通话标签', type: WorkflowOutputType.TEXT },
            ],
          };
        }
        case WorkflowNodeType.MESSAGE: {
          return {
            branches: ['输出'],
            output: [
              {
                label: '发送状态',
                type: 3,
                enums: ['提交成功', '发送成功', '发送失败'],
              },
            ],
          };
        }
        case WorkflowNodeType.SET_PARAMS: {
          return {
            branches: ['输出'],
          };
        }
        case WorkflowNodeType.END: {
          return {
            branches: ['工作流结束'],
          };
        }
        case WorkflowNodeType.SUB_WORKFLOW: {
          return {
            branches: ['请选择工作流'],
          };
        }
        case WorkflowNodeType.REMOTE_SEARCH: {
          return {
            branches: ['请配置远程查询'],
          };
        }
        case WorkflowNodeType.TIME: {
          return {
            branches: ['请配置时间条件'],
          };
        }
        case WorkflowNodeType.REGISTER: {
          return {
            branches: ['请配置'],
            customNodeExtra: extra,
          };
        }
        default: {
          return {};
        }
      }
    };

    return {
      id: uuid(),
      label: generatorLabel(),
      nodeType,
      ...generatorCustomData(),
    };
  };

  // 样式在这里定
  const renderIcon = (nodeType: WorkflowNodeType) => {
    switch (nodeType) {
      case WorkflowNodeType.START: {
        return <StartSolid />;
      }
      case WorkflowNodeType.JUDGE: {
        return <ConditionSolid />;
      }
      case WorkflowNodeType.AI_CALL: {
        return <OutboundSolid />;
      }
      case WorkflowNodeType.REMOTE_SEARCH: {
        return <IcRemote />;
      }
      case WorkflowNodeType.TIME: {
        return <IcTimeSvg />;
      }
      case WorkflowNodeType.SET_PARAMS: {
        return <SetUpSolid />;
      }
      case WorkflowNodeType.END: {
        return <EndSolid />;
      }
      case WorkflowNodeType.SUB_WORKFLOW: {
        return <IcSubworkflow style={{ color: '#3370ff' }} />;
      }
      default: {
        return null;
      }
    }
  };

  const { nodeList, reflesh } = CustomNodeHooks();

  return (
    <Box
      display="flex"
      flexDirection="column"
      p="10px"
      width={180}
      style={{ marginTop: 40, marginBottom: 20 }}
    >
      <Collapse
        bordered={false}
        ghost
        expandIcon={({ isActive }) => (
          <CaretRightOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} rotate={isActive ? 90 : 0} />
        )}
        defaultActiveKey={['基础节点', '服务节点']}
        // collapsible="disabled"
      >
        {DATA_SOURCE.map(({ title, list }) => (
          <Collapse.Panel key={title} header={title} forceRender>
            {list.map((nodeType) => (
              <TemplateWrapper key={nodeType} generator={() => generatorNodeData(nodeType)}>
                <Box height={28} display="flex" alignItems="center">
                  <Box fontSize={20} lineHeight={1} mr={1}>
                    {renderIcon(nodeType)}
                  </Box>
                  {workflowNodeMap[nodeType]}
                </Box>
              </TemplateWrapper>
            ))}
          </Collapse.Panel>
        ))}
      </Collapse>

      <Collapse
        bordered={false}
        ghost
        expandIcon={({ isActive }) => (
          <CaretRightOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} rotate={isActive ? 90 : 0} />
        )}
        defaultActiveKey={['自定义节点']}
        // collapsible="disabled"
      >
        <Collapse.Panel key={'自定义节点'} header={'自定义节点'} forceRender>
          {nodeList.map(({ id, name, icon }: FetchRegisterNodeResponseParams, i) => (
            <TemplateWrapper
              key={id}
              generator={() => generatorNodeData(WorkflowNodeType.REGISTER, nodeList[i])}
            >
              <Box height={28} display="flex" alignItems="center">
                <Box fontSize={20} lineHeight={1} mr={1}>
                  {SERVICE_ICON[icon as string]}
                </Box>
                {name}
              </Box>
            </TemplateWrapper>
          ))}
        </Collapse.Panel>
      </Collapse>

      <Box
        style={{ backgroundColor: '#fff' }}
        display="flex"
        p="10px"
        alignItems="center"
        width={180}
        position="fixed"
        bottom="0"
      >
        <MorenodesIcon />
        <a onClick={NewNodeListModal['showModal']} style={{ color: '#2F82F8' }}>
          更多节点
        </a>
      </Box>
      {/* 新增节点 */}
      <CostomNodeContext.Provider value={{ nodeList, reflesh }}>
        <NewNodeListModal />
      </CostomNodeContext.Provider>
    </Box>
  );
};
