import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Container, TextField, Button, Typography, Box } from "@mui/material"
import useUser from '../store/userStore';

function LoginPage() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await api.post('http:localhost:3000/api/auth/login', {
                email: emailOrUsername,
                password
            });
            useUser.getState().setUser(res.data.user, res.data.token);
            navigate('/blogs')
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed, please check your credentials");
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email or Username"
                        margin="normal"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2}}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default LoginPage;