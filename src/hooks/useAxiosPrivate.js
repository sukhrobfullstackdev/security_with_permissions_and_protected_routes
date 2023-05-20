import {axiosPrivate} from '../api/axios';
import {useEffect} from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import {useLocation, useNavigate} from "react-router-dom";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            async (error) => await Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // navigate('/login', {state: {from: location}, replace: true})
                    // mani fikrim token exired bosa srazu /login ga otish kere
                    return axiosPrivate(prevRequest);
                }

                await Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);
    return axiosPrivate;
};

export default useAxiosPrivate;