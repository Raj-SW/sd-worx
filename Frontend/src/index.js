import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'azure-maps-control/dist/atlas.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './Home/Home';
import CarPoolingManagement from './CarpoolingManagement/CarPoolingManagement';
import UserAuthPage from './Pages/UserAuthPage';
import CreateTrip from './Pages/UserDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "car-pooling",
        element: <CarPoolingManagement />,
      },
      {
        path: "auth",
        element: <UserAuthPage/>,
      },
      {
        path:"CreateTrip",
        element: <CreateTrip/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
