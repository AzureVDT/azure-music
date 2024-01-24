/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./App.scss";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/configureStore.ts";
import { ToastContainer } from "react-toastify";
import DashboardPage from "./pages/DashboardPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import LayoutDashboard from "./layout/LayoutDashboard.tsx";
import "swiper/swiper-bundle.css";
import "react-toastify/dist/ReactToastify.css";
import AlbumPage from "./pages/AlbumPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AuthProvider } from "./contexts/auth-context.tsx";
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
                <RouterProvider router={router}></RouterProvider>
            </App>
            <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
        </AuthProvider>
    </Provider>
);
