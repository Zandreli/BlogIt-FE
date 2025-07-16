import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function UpdateBlogPage() {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    featuredImg: "",
    title: "",
    synopsis: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) {
      setError("Invalid blog ID.");
      return;
    }

    async function fetchBlog() {
      try {
        const res = await api.get(`api/blogs/${blogId}`);
        setForm({
          featuredImg: res.data.featuredImg || "",
          title: res.data.title || "",
          synopsis: res.data.synopsis || "",
          content: res.data.content || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [blogId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.synopsis) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.patch(`/blogs/${blogId}`, form);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Failed to update blog.");
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Update Blog
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Paper sx={{ p: 4, mt: 2 }}>
        <TextField
          name="featuredImg"
          label="Featured Image URL"
          value={form.featuredImg}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
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
          rows={2}
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
          <Button variant="contained" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UpdateBlogPage;
