import { Drawer, Input, message, Modal } from 'antd';
import Workflow from 'components/workflow';
import { useWorkflowContext } from 'context/WorkflowContext';
import { useSave } from 'hooks/useSave';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import styled from 'styled-components';
import { FATHER_ENV, FrameEvent, WorkflowModeType } from 'types';
import qs from 'query-string';

const InputWrap = styled(Input)`
  border-color: transparent;
  &:hover {
    border-color: rgba(217, 217, 217);
  }
`;

export const WorkflowDrawer: FC = () => {
  const ref = useRef(null);
  const { dataSource, setDataSource, changedFlag } = useWorkflowContext();
  const [title, setTitle] = useState(dataSource?.name);
  const doSave = useSave();
  const handleSave = async () => {
    const str = `${dataSource!.id ? '编辑' : '新增'}成功`;
    const res = await doSave();
    if (typeof res === 'string') {
      message.error(res);
      return false;
    }
    if (res !== false) {
      message.success(str);
      setDataSource(undefined);
    }
  };
  useEffect(() => {
    !!dataSource && setTitle(dataSource?.name);
  }, [dataSource]);
  useDebounce(
    () => {
      !!dataSource && setDataSource({ name: title });
    },
    160,
     [title],
  );
  const drawerTitle =
    dataSource?.mode !== WorkflowModeType.LOG ? (
      <InputWrap
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ fontSize: 16, fontWeight: 700, width: 400, lineHeight: 1 }}
        placeholder="请输入标题"
      />
    ) : null;
  const headerStyle = drawerTitle ? { padding: '10px 16px' } : undefined;
  const handleClose = () => {
    const isIframe = !!qs.parse(window.location.search)?.iframe;

    if (isIframe) {
      window?.parent?.postMessage(FrameEvent.CLOSE_DRAWER, FATHER_ENV);
      // setDataSource(undefined);
    }
    if (dataSource?.isJustShowContent && dataSource.afterClose) {
      dataSource.afterClose();
      setDataSource(undefined);
      return;
    }
    if (dataSource?.isJustLook) {
      setDataSource(undefined);
      return;
    }
    dataSource?.mode !== WorkflowModeType.LOG && changedFlag
      ? Modal.warning({
          title: `[${title}] 还未保存`,
          content: '请确认是否保存',
          onOk: handleSave,
          onCancel: () => setDataSource(undefined),
          okText: '确定',
          cancelText: '取消',
          okCancel: true,
          centered: true,
        })
      : setDataSource(undefined);
  };

  useEffect(() => {
    if(dataSource) {
      setTimeout(() => {
        window?.parent?.postMessage(FrameEvent.OPEN_DRAWER, FATHER_ENV)
      }, 300);
    }
  }, [dataSource]);

  return (
    <Drawer
      title={drawerTitle}
      // afterVisibleChange={(visible) =>
      //   visible && window?.parent?.postMessage(FrameEvent.OPEN_DRAWER, FATHER_ENV)
      // }
      width="100%"
      visible={!!dataSource}
      onClose={handleClose}
      push={false}
      forceRender
      headerStyle={headerStyle}
      bodyStyle={{ padding: 0 }}
    >
      <Workflow ref={ref} />
    </Drawer>
  );
};
