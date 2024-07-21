import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskId, setTaskId] = useState('')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    creationDate: '',
    dueDate: '',
    status: '',
  })

  useEffect(() => {
    getAllTasks()
  }, [])

  const getAllTasks = async () => {
    const response = await axios.get('http://localhost:8080/tasks')
    const sortedTasks = response.data.sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate),
    )
    setTasks(sortedTasks)
  }

  const createTask = async () => {
    const response = await axios.post('http://localhost:8080/tasks', newTask)
    setNewTask({
      title: '',
      description: '',
      creationDate: '',
      dueDate: '',
      status: '',
    })
    setTasks([response.data, ...tasks])
  }

  const updateTask = async () => {
    if (!taskId) {
      alert('Por favor, insira o ID da tarefa a ser atualizada.')
      return
    }
    const response = await axios.put(`http://localhost:8080/tasks/${taskId}`, newTask)
    setTaskId('')
    setNewTask({
      title: '',
      description: '',
      creationDate: '',
      dueDate: '',
      status: '',
    })
    setTasks([
      response.data,
      ...tasks.filter((task) => task.id !== response.data.id),
    ])
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/tasks/${id}`)
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        Gerenciador de Tarefas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            type="number"
            label="Id"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            label="Título"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Data de Criação"
            InputLabelProps={{ shrink: true }}
            value={newTask.creationDate}
            onChange={(e) =>
              setNewTask({ ...newTask, creationDate: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Data de Vencimento"
            InputLabelProps={{ shrink: true }}
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <MenuItem value="Pendente">Pendente</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={createTask}>
            Adicionar Tarefa
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={updateTask}
            style={{ marginLeft: 8 }}
          >
            Atualizar Tarefa
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body1">
                  Identificação: <strong>{task.id}</strong>
                </Typography>
                <Typography variant="body1">{task.description}</Typography>
                <Typography variant="body2">
                  Data de Criação: {task.creationDate}
                </Typography>
                <Typography variant="body2">
                  Data de Vencimento: {task.dueDate}
                </Typography>
                <Typography variant="body2">Status: {task.status}</Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  Deletar
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default App
