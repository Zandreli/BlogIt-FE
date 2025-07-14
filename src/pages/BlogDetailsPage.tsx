import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactMarkdown from "react-markdown";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  featuredImg: string;
  content: string;
  createdAt: string;
  lastUpdated: string;
  isDeleted: boolean;
  author: {
    firstName?: string;
    lastName?: string;
    username?: string;
  };
  authorId: string;
}

function BlogDetailsPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await api.get(`/blogs/${blogId}`);
        if (res.data.isDeleted) {
          setError("Blog not found.");
        } else {
          setBlog(res.data);
        }
      } catch (err) {
        console.error(err);
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [blogId]);

  const handleDelete = async () => {
    if (!blog) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/blogs/${blog.id}`);
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      setError("Failed to delete blog.");
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          component={Link}
          to="/blogs"
          startIcon={<ArrowBackIcon />}
        >
          Back to Blogs
        </Button>
      </Container>
    );
  }

  if (!blog) return null;

  const initials =
    `${blog.author?.firstName?.[0] ?? ""}${blog.author?.lastName?.[0] ?? ""}` ||
    blog.author?.username?.[0] ||
    "?";
  const createdAt = new Date(blog.createdAt).toLocaleDateString();
  const lastUpdated = new Date(blog.lastUpdated).toLocaleDateString();
  const isAuthor = currentUserId === blog.authorId;

  return (
    <Container sx={{ mt: 8 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        component={Link}
        to="/blogs"
        sx={{ mb: 2 }}
      >
        Back to Blogs
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {blog.synopsis}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar>{initials.toUpperCase()}</Avatar>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {blog.author?.firstName} {blog.author?.lastName} ({createdAt})
          </Typography>
        </Box>

        {blog.featuredImg && (
          <Box sx={{ mb: 2 }}>
            <img
              src={blog.featuredImg}
              alt={blog.title}
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Box>
        )}

        <ReactMarkdown>{blog.content}</ReactMarkdown>

        <Typography variant="caption" display="block" sx={{ mt: 4 }}>
          Last Updated: {lastUpdated}
        </Typography>

        {isAuthor && (
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              component={Link}
              to={`/blogs/update/${blog.id}`}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default BlogDetailsPage;
