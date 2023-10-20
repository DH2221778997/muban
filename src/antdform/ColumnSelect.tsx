import { Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'

const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Columns = styled.div`
  width: 230px;
  height: 402px;
  border: 1px solid rgb(240, 240, 240);
  display: flex;
  flex-direction: column;
`
const ColumnHeader = styled.div`
  height: 35px;
  padding: 6px 12px;
  border-bottom: 1px solid rgb(240, 240, 240);
`
const ColumnContent = styled.div`
  
`
const ColumnSelect = () => {
  return (
    <Modal
      title='添加指定机构'
      visible={true}
      onOk={() => {}}
      onCancel={() => {}}
      width={520}
    >
      <ColumnsWrapper>
        <Columns >
          <ColumnHeader>可选展示的列</ColumnHeader>
          <ColumnContent></ColumnContent>
        </Columns>
        <Columns >
          <ColumnHeader>展示的列（可拖动排序）</ColumnHeader>
          <ColumnContent></ColumnContent>
        </Columns>
      </ColumnsWrapper>
    </Modal>
  )
}

export default ColumnSelect