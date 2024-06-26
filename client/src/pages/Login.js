import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { useAuth } from '../components/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = `http://localhost:3001/users/login`;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, { login, password });
            if (response.status === 200) {
                const token = response.data.token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                document.cookie = `session_data=${token}; path=/; SameSite=None; Secure`;
                setAuth(true);
                navigate('/');
            } 
            else {
                const notify = () => toast("Logowanie nieudane, spróbuj ponownie");
                notify();
                
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const notify = () => toast("Dane logowania nie mogą być puste");
                notify();
            }
            else if(error.response && error.response.status === 404){
                const notify = () => toast("Nie znaleziono użytkownika");
                notify();
            }
            else if(error.response && error.response.status === 401){
                const notify = () => toast("Podano nieprawidłowe dane logowania");
                notify();
            } 
            else{
                console.error('Error:', error);
                const notify = () => toast("Logowanie nieudane, spróbuj ponownie");
                notify();
            }
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
