import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    synopsis: string;
    featuredImg: string;
    author: {
      firstName: string;
      lastName: string;
    };
    createdAt?: string;
  };
}

function BlogCard({ blog }: BlogCardProps) {
  const { id, title, synopsis, featuredImg, author, createdAt } = blog;
  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBlogs"] });
      alert("Blog deleted.");
    },
    onError: () => alert("Failed to delete blog."),
  });

  const handleDeleteBlog = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation.mutate(id);
    }
  };

  const initials = `${author.firstName[0]}${author.lastName[0]}`;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown Date";

  return (
    <Card sx={{ maxWidth: 400, borderRadius: 2, overflow: "hidden" }}>
      <CardMedia component="img" height="220" image={featuredImg} alt={title} />
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {synopsis}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar>{initials}</Avatar>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {author.firstName} {author.lastName} • {formattedDate}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/blogs/${id}`}
          variant="text"
        >
          Read More →
        </Button>


        
        <Button
          size="small"
          component={Link}
          to={`/blogs/Update/${blog.id}`}
          variant="outlined"
          color="success"
          >
            Update
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDeleteBlog(blog.id)}
            >
              Delete
            </Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
