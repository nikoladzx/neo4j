import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MemberList from './Members/MemberList.tsx';
import EmployeeList from './Employees/EmployeeList.tsx';
import Header from './Header/Header.tsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
},
{
  path: '/members',
  element: <MemberList/>,
},
{
  path: '/employees/:cafename',
  element: <EmployeeList/>,
},
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
<RouterProvider router={router}/>
  </React.StrictMode>,
)
