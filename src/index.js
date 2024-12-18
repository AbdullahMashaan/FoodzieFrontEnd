import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
// import Profile from "./components/Profile";
import Recipes from "./components/Recipes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Ingredients from "./components/Ingredients";
import RecipeDetails from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/recipes",
    element: (
      <>
        <Header />
        <Recipes />
        <Footer />
      </>
    ),
  },
  {
    path: "/recipes/add",
    element: (
      <>
        <Header />
        <AddRecipe />
        <Footer />
      </>
    ),
  },
  {
    path: "/recipes/edit/:id",
    element: (
      <>
        <Header />
        <EditRecipe />
        <Footer />
      </>
    ),
  },
  {
    path: "/recipes/:id",
    element: (
      <>
        <Header />
        <RecipeDetails />
        <Footer />
      </>
    ),
  },
  {
    path: "/categories",
    element: (
      <>
        <Header />
        <Categories />
        <Footer />
      </>
    ),
  },
  {
    path: "/ingredients",
    element: (
      <>
        <Header />
        <Ingredients />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
