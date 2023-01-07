import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Modal from "./pages/modal";

import PageNotFound from "./pages/error-page";
import MainPage from "./pages/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "modalA",
    element: <Modal title="Modal A" />,
  },
  {
    path: "modalA/:allcontacts",
    element: <Modal title="Modal A" />,
  },
  {
    path: "modalB",
    element: <Modal title="Modal B" />,
  },
  {
    path: "modalB/:uscontacts",
    element: <Modal title="Modal B" />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
