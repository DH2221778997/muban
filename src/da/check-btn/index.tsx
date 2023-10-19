import React, { FC } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { xor } from 'lodash';
interface IOption {
  value: string | number;
  label: string;
}
interface CheckboxButtonProps {
  options: IOption[];
  value?: (string|number)[];
  onChange?: (newCheckedValues: (string | number)[]) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    background: rgb(247, 247, 251);
    width: 100px;
    height: 32px;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.checked {
      background: rgb(230, 244, 255);
      color: rgb(3, 100, 255);
    }
  }
`

const CheckboxButton: FC<CheckboxButtonProps> = ({options,value:checkedValues = [],onChange}) => {
  const handleChange = (val) => {
    const newCheckedValues = xor(checkedValues,[val])
    onChange?.(newCheckedValues)
  }
  return (
    <Wrapper>
      {
        options.map(({value,label}, index) => (<div key={index} 
                                          className={classNames({'checked': checkedValues.includes(value)})}
                                          onClick={ e => handleChange(value)}>
          {label}
        </div>))
      }
    </Wrapper>
  )
}

export default CheckboxButton