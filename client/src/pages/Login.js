import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import '../css/login.css';
import axios from 'axios';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = `http://localhost:3001/users/login`;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, { login, password });
            if (response.status === 200) {
            const token = response.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            document.cookie = `session_data=${token}; path=/;`;
            } 
            else {
                alert('Failed to log in. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to log in. Please try again.');
        }
        setLogin('');
        setPassword('');
    };

    return (
        <Box width="50%">
            <Grid container className="stack">
                <Box className="formBox">
                    <form>
                        <Stack direction="column">
                            <Stack direction="row" alignItems="center">
                                <Typography variant="h5" mr="20px" fontWeight="600">LOGIN</Typography>
                                <TextField
                                    label="Login"
                                    fullWidth
                                    margin="normal"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    InputProps={{
                                    style: {
                                        background: 'white',
                                        border: 'none',
                                        height: '40px',
                                        borderRadius: '20px',
                                    },
                                    }}
                                />
                                </Stack>
                                <Stack direction="row" alignItems="center">
                                <Typography variant="h5" mr="20px" fontWeight="600">HASŁO</Typography>
                                <TextField
                                    label="Hasło"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                    style: {
                                        background: 'white',
                                        border: 'none',
                                        height: '40px',
                                        borderRadius: '20px',
                                    },
                                    }}
                                />
                                </Stack>
                                <Box display="flex" justifyContent="flex-end">                        
                                    <button  type="submit" className="loginButton" onClick={handleLogin}>
                                        LOGOWANIE
                                    </button>
                                </Box>
                            </Stack>
                    </form>
                </Box>
            </Grid>
        </Box>
    );
};

export default Login;
