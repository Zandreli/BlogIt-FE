import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import ProfilePage from './pages/ProfilePage';
import NewBlogPage from './pages/NewBlogPage';
import UpdateBlogPage from './pages/UpdateBlogPage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blogs/new" element={<NewBlogPage />} />
        <Route path="/blogs/:blogId" element={<BlogDetailsPage />} />
        <Route path="/blogs/update/:blogId" element={<UpdateBlogPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}