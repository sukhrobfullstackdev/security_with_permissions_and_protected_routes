import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();
    return async () => {
         setAuth({});
         try {
             const response = await axios("/logout", {
                 withCredentials: true
             });
         } catch (e) {
             console.log(e);
         }
     };
};

export default useLogout;