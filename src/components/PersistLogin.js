import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
const PersistLogin = () => {
    const [loading, setLoading] = useState(true);
    const [persist] = useLocalStorage('persist', false);
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (e) {
                console.log(e);
            } finally {
                isMounted && setLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
        return () => isMounted = false;
    }, []);
    return (
        <>
            {!persist ? <Outlet/> : loading ? <p>Loading...!</p> : <Outlet/>}
        </>
    );
};

export default PersistLogin;