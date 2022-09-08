import {Navigate} from "react-router-dom";
import lang from 'lodash/lang';
import {useAuth} from "../../hooks/auth/useAuth";


export const ProtectedRoute = ({children}) => {

    const {user} = useAuth();

    if (lang.isEmpty(user)) {
        // user is not authenticated
        return <Navigate to="/"/>;
    }
    return children;
};