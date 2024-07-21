import React, { useEffect, useState } from 'react'
import { getTasks } from '../services/api'

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks().then((response) => setTasks(response.data))
  }, [])

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
