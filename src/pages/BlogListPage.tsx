import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import api from '../api/api';
import BlogCard from '../components/BlogCard';

interface Blog {
    id: string;
    title: string;
    synopsis: string;
    featuredImg: string;
    author: {
        firstName: string;
        lastName: string;
    };
}

function BlogListPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await api.get('/api/blogs');
                setBlogs(res.data.blogs);
            } catch (err) {
                console.error('Failed to fetch blogs:', err);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Latest Blogs
            </Typography>
            <Grid container spacing={4}>
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id}>
                            <BlogCard blog={blog} />
                        </Grid>
                    ))
                ) : (
                    <Grid size={{ xs: 12}} >
                        <Typography variant="body1">No blogs found.</Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default BlogListPage;