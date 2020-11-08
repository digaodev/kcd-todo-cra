import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import RemoveIcon from '../assets/icons/remove.svg'

const todosSeed = [{
  id: 0,
  description: '1st todo',
  completed: false
},
{
  id: 1,
  description: '2nd todo',
  completed: true
},
]

function App() {
  const [inputTodo, setInputTodo] = useState('')
  const [todos, setTodos] = useState(todosSeed)
  // const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState(null)

  const todosList = filter === null ? todos : todos.filter(todo => todo.completed === filter)

  const allLen = todos.length;
  const pendingLen = todos.filter(todo => todo.completed === false).length
  const completedLen = todos.filter(todo => todo.completed === true).length

  const isAllFilterSelected = filter === null
  const isPendingFilterSelected = filter === false
  const isCompletedFilterSelected = filter === true

  function handleAddTodo(e) {
    e.preventDefault()

    if (inputTodo === '') return;

    const newTodo = {
      id: uuidv4(),
      description: inputTodo,
      completed: false
    }
    setTodos(prevTodos => [newTodo, ...prevTodos])
    setInputTodo('')
  }

  function handleRemoveTodo(todoId) {
    const updatedTodos = todos.filter(todo => todo.id !== todoId)

    setTodos(updatedTodos)
  }

  return (
    <main className="flex items-center justify-center h-screen w-screen md:bg-purple-700">
      <section className="h-screen w-screen md:w-1/2 lg:w-1/3 md:h-auto py-10 px-6
        bg-purple-700 md:bg-gray-100 md:rounded-md">
        <form onSubmit={handleAddTodo} className="mb-8">
          <div className="flex">
            <input
              id="description" name="description" placeholder="What do you need to do today?"
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
              className="flex-1 py-3 px-4 text-gray-600 rounded-l shadow-md" />

            <button
              type="submit"
              className="font-bold text-sm text-gray-100 uppercase py-2 px-3 shadow-md rounded-r
            bg-purple-900 hover:bg-purple-800 transition-colors duration-300">Add</button>
          </div>
        </form>

        <div className="flex justify-between mb-4">
          <button className={`${isAllFilterSelected ? 'text-gray-100 md:text-purple-800 font-bold' : 'text-purple-200 md:text-purple-600'} `}
            onClick={() => setFilter(null)}
          >ALL ({allLen})</button>
          <button className={`${isPendingFilterSelected ? 'text-gray-100 md:text-purple-800 font-bold' : 'text-purple-200 md:text-purple-600'} `}
            onClick={() => setFilter(false)}
          >PENDING ({pendingLen})</button>
          <button className={`${isCompletedFilterSelected ? 'text-gray-100 md:text-purple-800 font-bold' : 'text-purple-200 md:text-purple-600'} `}
            onClick={() => setFilter(true)}
          >COMPLETED ({completedLen})</button>
        </div>

        <ul>
          {todosList.map(todo => (
            <li key={todo.id} className="flex items-center justify-between rounded px-2 py-4 mb-2 shadow-sm
                hover:bg-purple-600 md:hover:bg-purple-300 transition-colors duration-200">
              <p className={`${todo.completed ? 'line-through' : ''} text-gray-100 md:text-purple-800`}> {todo.description}</p>

              <button className="" onClick={() => handleRemoveTodo(todo.id)}>
                <img src={RemoveIcon} alt="Remove Todo" className="h-5 w-5 text-red-600" />
              </button>
            </li>
          )
          )}
        </ul>
      </section>
    </main>
  )
}

export default App
