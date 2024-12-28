import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const axiosInstance = axios.create({
    baseURL: 'https://service-review-system-server.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {

    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axiosInstance.interceptors.response.use(response=>{
            return response;
        }, error=>{
            if(error.status === 401 || error.status === 403){
               logOut()
               .then(()=>{
                navigate('/login')
               })
               .catch(error=>{
                toast.error(error.message)
               })
            }
            return Promise.reject(error);
        })

    },[])

    return axiosInstance
};

export default useAxiosSecure;