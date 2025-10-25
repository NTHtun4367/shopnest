import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Toaster } from "sonner";
import Protect from "./pages/protector/Protect.tsx";
import Profile from "./pages/Profile.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ProductFilter from "./pages/ProductFilter.tsx";
import IsAdmin from "./pages/protector/isAdmin.tsx";
import CreateProduct from "./pages/admin/CreateProduct.tsx";
import Panel from "./pages/admin/Panel.tsx";
import EditProduct from "./pages/admin/EditProduct.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:id",
        element: <ResetPassword />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/filter",
        element: <ProductFilter />,
      },
      {
        path: "/profile",
        element: (
          <Protect>
            <Profile />
          </Protect>
        ),
      },
      {
        path: "/admin",
        element: (
          <IsAdmin>
            <Panel />
          </IsAdmin>
        ),
        children: [
          {
            path: "/admin/create-product",
            element: <CreateProduct />,
          },
          {
            path: "/admin/edit-product/:id",
            element: <EditProduct />,
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </Provider>
  </StrictMode>
);
