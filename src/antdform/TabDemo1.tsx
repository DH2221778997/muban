import { Tabs } from 'antd'
import React from 'react'

const TabDemo1 = () => {
  return (
    <Tabs>
      <Tabs.TabPane tab='Tab1' key='tab-1'>Content of Tab Pane 1</Tabs.TabPane>
      <Tabs.TabPane tab='Tab2' key='tab-2'>Content of Tab Pane 2</Tabs.TabPane>
      <Tabs.TabPane tab='Tab3' key='tab-3'>Content of Tab Pane 3</Tabs.TabPane>
    </Tabs>
  )
}

export default TabDemo1