import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import api from "../api/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
            return 'All fields are required.';
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return 'Invalid email format.';
        }
        if (formData.password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            console.error("Registration failed:", error)
            setError(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                       label="First Name"
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleChange}
                       fullWidth
                       margin="normal"
                       />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        />
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        />

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default RegisterPage;