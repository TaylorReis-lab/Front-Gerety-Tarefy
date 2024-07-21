import React, { useState } from 'react'
import axios from 'axios'

function AddTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post('/api/tasks', { title, description, status: 'pendente' })
      .then((response) => {
        console.log(response)
        setTitle('')
        setDescription('')
      })
      .catch((error) => console.error(error))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default AddTask
