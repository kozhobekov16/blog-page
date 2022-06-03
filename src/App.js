import React, { useEffect, useState } from 'react';
import './App.css'
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
const App = () => {
    const [text, setText] = useState('')
    const [phone, setPhone] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState([])
    const [pending, setPending] = useState(true)
    const handleForm = (e) => {
        e.preventDefault()
        setPending(false)
        const dataUser = { text, phone, lastName }
        try {
            fetch(`http://localhost:3001/user`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataUser)
            })
                .then(() => {
                    setPending(true)
                    setText('')
                    setPhone('')
                    setLastName('')
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        try {
            fetch('http://localhost:3001/user')
                .then(resp => resp.json())
                .then(data => setUserData(data))
        } catch (e) {
            console.log(e)
        }
    }, [userData])
    const removeUser = (id) => {
        fetch(`http://localhost:3001/user/${id}`, { method: "DELETE" })
    }
    return (
        <div>
            <form onSubmit={handleForm}>
                <TextField
                    id="outlined-basic"
                    label="Имя"
                    variant="outlined"
                    type="text"
                    placeholder="Ваше имя"
                    required={true}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    style={{ marginTop: '1rem' }}
                    label="Last name"
                    variant="outlined"
                    type="text"
                    placeholder="Last name"
                    required={true}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <TextField
                    style={{ marginTop: '1rem' }}
                    type="number"
                    id="outlined-basic"
                    label="Телефон"
                    variant="outlined"
                    placeholder="Телефон номер"
                    required={true}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={!pending ? true : false}
                >
                    {!pending ? 'Отправка...' : 'Добавить'}

                </Button>
            </form>
            {userData.length ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First name: </TableCell>
                                <TableCell>Last name: </TableCell>
                                <TableCell align="right">Phone number</TableCell>
                                <TableCell align="right">Remove user</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.text}
                                    </TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">
                                        <CancelIcon
                                            onClick={() => removeUser(row.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                        </CancelIcon>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : null}
        </div>
    );
};

export default App;