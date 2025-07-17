import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import api from "../api/api";

function NewBlogPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    featuredImg: "",
    title: "",
    synopsis: "",
    content: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.synopsis || !form.featuredImg) {
      setError('All fields are required, including the image URL.');
      return;
    }

    try {
      await api.post('https://blogit-be-1.onrender.com/api/blogs/blogs', form);
      navigate('/blogs');
    } catch (err) {
      console.error(err);
      setError('Failed to create blog. Try again.');
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant='h4' gutterBottom>
        Create New Blog
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Paper sx={{ p: 4, mt: 2 }}>
        <TextField
          name="featuredImg"
          label="Cloudinary Image URL"
          value={form.featuredImg}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Paste your Cloudinary URL here"
        />

        {form.featuredImg && (
          <Box sx={{ mb: 2 }}>
            <img
              src={form.featuredImg}
              alt='Featured'
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Box>
        )}

        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="synopsis"
          label="Synopsis"
          value={form.synopsis}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          name="content"
          label="Content (Markdown)"
          value={form.content}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={8}
        />

        <Box sx={{ mt: 2 }}>
          <Button variant='contained' onClick={handleSubmit}>
            Submit Blog
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewBlogPage;
