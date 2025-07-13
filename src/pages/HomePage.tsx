import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  const user = localStorage.getItem("user");

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src="/Blogs1.mp4" type="video/mp4" />
      </video>
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(4px)",
            borderRadius: 3,
            color: "#333",
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to BlogIt!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Imagine, Create, Manage and share your personal blogs easily.
          </Typography>

          <Box sx={{ mt: 4 }}>
            {!user ? (
              <>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Sign Up
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/blogs"
                variant="contained"
                color="primary"
              >
                Blogs
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default HomePage;
