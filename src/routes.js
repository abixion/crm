import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import {ProtectedRoute} from "./components/auth/ProtectedRoute";

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: '/admin',
            element: <ProtectedRoute><DashboardLayout/></ProtectedRoute>,
            children: [
                {path: '', element: <DashboardApp/>},
                {path: 'dashboard', element: <DashboardApp/>},
                {path: 'user', element: <User/>},
            ],
        },
        {
            path: 'login',
            element: <Login/>,
        },
        {
            path: 'register',
            element: <Register/>,
        },
        {
            path: '/',
            element: <LogoOnlyLayout/>,
            children: [
                {path: '/', element: <Login/>},
                {path: '404', element: <NotFound/>},
                {path: '*', element: <Navigate to="/404"/>},
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
