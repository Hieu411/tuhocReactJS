import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../components/authentication/LoginPage";
import RegisterPage from "../components/authentication/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import CrudPage from "../pages/crud_Page";

import "../index.css";

import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";

const routes = createBrowserRouter([
  // Authentication Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <div>Forgot Password</div> },
    ],
  },

  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "crud", element: <CrudPage /> },
    ],
  },

  // User Routes
  {
    path: "/user",
    element: <MainLayout />,
    children: [
      { path: "profile", element: <div>User Profile</div> },
      { path: "profile/:id", element: <div>User Dashboard</div> },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <div>Admin Home</div> },
      { path: "dashboard", element: <div>Admin Dashboard</div> },
    ],
  },

  // 404 Page
  { path: "*", element: <NotFoundPage /> },
]);

export default routes;
