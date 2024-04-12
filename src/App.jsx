import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: "ducharse" },
  { id: 2, text: "desayunar" },
  { id: 3, text: "trabajar" },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  const handleDragEnd =(result) =>{
    if(!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [reorderedItem] = copyArray.splice(startIndex, 1);

    copyArray.splice(endIndex, 0, reorderedItem);
    setTodos(copyArray)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1>Todo app</h1>
        <Droppable droppableId="todos" >
          {(droppableProvider) => (
            <ul
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {todos.map((todo, index) => (
                <Draggable
                  index={index}
                  key={todo.id}
                  draggableId={`${todo.id}`}
                >
                  {(draggeableProvider) => (
                    <li
                      ref={draggeableProvider.innerRef}
                      {...draggeableProvider.dragHandleProps}
                      {...draggeableProvider.draggableProps}
                    >
                      {todo.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default App;
