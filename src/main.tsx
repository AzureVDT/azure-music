/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import "./App.scss";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/configureStore.ts";
import { ToastContainer } from "react-toastify";
import HomeLayout from "./components/layout/HomeLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
// import { lazy } from "react";
// const HomePage = lazy(() => import("./pages/HomePage.tsx"));
// const HomeLayout = lazy(() => import("./components/layout/HomeLayout.tsx"));
// const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"));
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
    { path: "*", element: <PageNotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App>
            <RouterProvider router={router}></RouterProvider>
        </App>
        <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
    </Provider>
);
