import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getItems = (count:number) => new Array(count).fill(0).map((_,index) => ({
  id: `item-${index}`,
  content: `item ${index}`
}))

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const GRID = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? 'pink' : 'grey',
  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: GRID,
  width: 250
})

const DndDemo1 = () => {
  const [items, setItems] = useState(getItems(10))

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )
    setItems(newItems)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {
          (provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {
                items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {
                      (provided,snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )
                    }
                  </Draggable>
                ))
              }
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default DndDemo1