import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import useUser from "../store/userStore";

function Navbar() {
    const user = useUser(state => state.user);
    const clearUser = useUser(state => state.clearUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
            <ImBlog size={45}/>
                <Typography variant="h6" sx={{ flexGrow: 1, background: 'linear-gradient(135deg, #1976d2 30%, #42a5f5 70%)'}}>
                    BlogIt
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
                {user ? (
                    <>
                     <Button color="inherit" component={Link} to="/profile">Profile</Button>
                     <Button color="inherit" component={Link} to="/blogs/new">New Blog</Button>
                     <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Sign Up</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}


export default Navbar;