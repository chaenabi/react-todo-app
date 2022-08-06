import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default function List({ todoData, setTodoData }) {
  const handleCompleteChange = id => {
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed
      }
      return data
    })

    setTodoData(newTodoData)
  }

  const handleClick = id => {
    let newTodoData = todoData.filter(data => data.id !== id)
    setTodoData(newTodoData)
  }

  const handleEnd = result => {
    console.log('result', result)

    if (!result.destination) return

    const newTodoData = todoData

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    // 2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderItem] = newTodoData.splice(result.source.index, 1)

    // 원하는 자리에 reorderItem을 insert 해줍니다.
    newTodoData.splice(result.destination.index, 0, reorderItem)
    setTodoData(newTodoData)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className={`${
                        snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
                      } "flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}
                    >
                      <div className="items-center">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={() => handleCompleteChange(data.id)}
                        />
                        <span
                          className={
                            data.completed ? 'line-through' : undefined
                          }
                        >
                          {data.title}
                        </span>
                      </div>
                      <div className="items-center">
                        <button
                          className="px-4 py-2 float-right"
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}