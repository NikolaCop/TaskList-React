import React, { useState, useRef, useEffect } from 'react';
import TodoList from'./TodoList';
import uuidv4 from 'uuid';


const LOCAL_STORAGE_KEY= 'todoApp.todos'
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');


//THIS IS SAVING TO LOCAL STORAGE, IN ORDER TO KEEP A CONSISTENT DISPLAY UPON REFRESH.
useEffect(() => { 
localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos] )


//THIS MAKES IT DRAW TO THE PAGE ON REFRESH
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem
  (LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
}, [])

//CHECKBOX
function toggleTodo(id) {
const newTodos = [...todos]
const todo = newTodos.find(todo => todo.id === id)
todo.complete = !todo.complete
setTodos(newTodos)
}


// THIS ADDS A TO-DO
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
      setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name:name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button>Clear Complete</button>
    <div>0 left to do</div>
    </> 
       )
}


export default App;
