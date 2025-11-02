import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main.tsx";
import Home from "./pages/common/Home.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";
import ProductDetails from "./pages/products/ProductDetails.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { Toaster } from "sonner";
import Protect from "./pages/protector/Protect.tsx";
import Profile from "./pages/common/Profile.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ProductFilter from "./pages/products/ProductFilter.tsx";
import IsAdmin from "./pages/protector/isAdmin.tsx";
import CreateProduct from "./pages/admin/CreateProduct.tsx";
import Panel from "./pages/admin/Panel.tsx";
import EditProduct from "./pages/admin/EditProduct.tsx";
import ProductManagement from "./pages/admin/ProductManagement.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import UserManagement from "./pages/admin/UserManagement.tsx";
import { PersistGate } from "redux-persist/integration/react";
import ConfirmOrder from "./pages/order/ConfirmOrder.tsx";
import Cancelled from "./pages/order/Cancelled.tsx";
import OrderManagement from "./pages/admin/OrderManagement.tsx";
import OrderTablePage from "./pages/order/OrderTablePage.tsx";

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
          {
            path: "/admin/manage-products",
            element: <ProductManagement />,
          },
          {
            path: "/admin/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/admin/manage-orders",
            element: <OrderManagement />,
          },
          {
            path: "/admin/manage-users",
            element: <UserManagement />,
          },
        ],
      },
      {
        path: "/order-success",
        element: <ConfirmOrder />,
      },
      {
        path: "/order-cancelled",
        element: <Cancelled />,
      },
      {
        path: "/orders",
        element: <OrderTablePage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </PersistGate>
    </Provider>
  </StrictMode>
);
