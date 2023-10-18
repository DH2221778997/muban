import { TimePicker, Button, Row, Col, Popconfirm } from 'antd'
import { useList } from 'react-use'
import { DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const TIME_FORMAT = 'HH:mm'

const becomeDayjsObj = (time:string) => { return dayjs(time,TIME_FORMAT)}
const MOCK_DATA = [[becomeDayjsObj('09:21'),becomeDayjsObj('15:06')],
[becomeDayjsObj('08:21'),becomeDayjsObj('16:06')],
[becomeDayjsObj('04:31'),becomeDayjsObj('12:06')],
[becomeDayjsObj('12:21'),becomeDayjsObj('18:06')]]
const { RangePicker } = TimePicker

const AddForm = (props) => {
  
  const {value = [[]], onChange} = props
  const [list,{removeAt,insertAt,updateAt}] = useList(MOCK_DATA)


  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {
        list.length === 0 && (
          <Row  gutter={8} >
            <Col><RangePicker  allowClear format={TIME_FORMAT} onChange={(values) => updateAt(0,values)}/></Col>
            <Col><Button type='default' onClick={() => insertAt(list.length,[])} disabled={list.length >= 10}>+ 增加时间段</Button></Col>
          </Row> //这里还有点问题
        )
      }
      {list.map((it,index) => {
        if (index === 0) {
          return (
          <Row key={index} gutter={8} style={{marginBottom:'8px'}}>
            <Col><RangePicker value={it as [Dayjs,Dayjs]} onChange={(values) => {updateAt(index,values);onChange(prev => prev.map((it,idx) => index === idx ? values : it))}}  allowClear format={TIME_FORMAT}/></Col>
            <Col><Button type='default' onClick={() => {insertAt(list.length,[]);onChange(prev => ([...prev,[]]))}} disabled={list.length >= 10}>+ 增加时间段</Button></Col>
          </Row>
          )
        }
        return (
        <Row gutter={8} style={{marginBottom:'8px'}}>
          <Col><RangePicker value={it as [Dayjs,Dayjs]} onChange={(values) => {updateAt(index,values);onChange(prev => prev.map((it,idx) => index === idx ? values : it))}} allowClear format={TIME_FORMAT}/></Col>
          <Col style={{display:'flex',alignItems:'center'}}>
            <Popconfirm title={'确定要删除吗？'} onConfirm={() => {removeAt(index);onChange(prev => prev.filter((it,idx) => idx === index))}}>
              <DeleteOutlined style={{color:'rgba(10, 15, 44, 0.45)'}}/>  
            </Popconfirm>
          </Col>
        </Row>
        )
      })}
      
      
    </div>
  )
}

export default AddForm