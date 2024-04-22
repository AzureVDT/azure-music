/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import "swiper/swiper-bundle.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.scss";
import { AuthProvider } from "./contexts/auth-context.tsx";
import "./App.scss";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/configureStore.ts";
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";
const DashboardPage = React.lazy(() => import("./pages/DashboardPage.tsx"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage.tsx"));
const LoginPage = React.lazy(() => import("./pages/LoginPage.tsx"));
const AlbumPage = React.lazy(() => import("./pages/AlbumPage.tsx"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound.tsx"));
const LayoutDashboard = React.lazy(
    () => import("./layout/LayoutDashboard.tsx")
);

const router = createBrowserRouter([
    {
        element: <LayoutDashboard />,
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
            {
                path: "/album/:slug/:id",
                element: <AlbumPage />,
            },
        ],
    },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <PageNotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <AuthProvider value={null}>
            <App>
                <Suspense fallback={<div>Loading...</div>}>
                    <RouterProvider router={router}></RouterProvider>
                </Suspense>
            </App>
            <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
        </AuthProvider>
    </Provider>
);
