import React, { useState, useEffect } from 'react'
import { Card, Input, Button } from '@mui/material'
import './App.css'
const App = () => {
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState([''])
  const [pending, setPending] = useState(false)
  useEffect(() => {
    fetch('http://localhost:8000/user')
      .then(resp => resp.json())
      .then(data => setUser(data))
  }, [user])
  const requestUser = (e) => {
    e.preventDefault()
    const dataUser = { text, email }
    setPending(true)
    fetch(`http://localhost:8000/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser)
    })
      .then(() => {
        setPending(false)
      })
  }
  const deleteUser = (id) => {
    fetch(`http://localhost:8000/user/${id}`, { method: "DELETE" })
      .then(() => console.log('delete'))
  }
  return (
    <div className='App'>
      <div>
        <Card sx={{ maxWidth: 545 }}>
          <form onSubmit={requestUser}>
            <Input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Type your name" />
            <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Type your email" />
            <button>{!pending ? 'Send' : 'Send...'}</button>
          </form>
        </Card>
        <div>
          {user.map(item => (
            <ul key={item.id}>
              <li style={{ display: 'flex', gap: '14px' }}>
                <h1>
                  {item.name}
                </h1>
                <h1>{item.email}</h1>
                <button onClick={() => deleteUser(item.id)}>Delete me</button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App