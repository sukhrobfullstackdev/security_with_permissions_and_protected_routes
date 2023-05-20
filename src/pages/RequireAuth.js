import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    const decoded = auth?.accessToken ? auth.accessToken /*jwt_decode(auth.accessToken)*/ : undefined; // decoded backend dan kegan token bilan rolelar decode qivoganimiz
    const roles = decoded?.UserInfo?.roles || [];  // decoded ni ichidagi USerInfo da token hamda role lar bor
    return (
        roles.find(role => allowedRoles?.includes(role))
            ? <Outlet/>
            : auth?.user
            ? <Navigate to="/unauthorized" state={{from: location}} replace/>
            : <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default RequireAuth;