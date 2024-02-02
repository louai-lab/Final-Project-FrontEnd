import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL:`${process.env.REACT_APP_BACKEND}`,
    withCredentials: true
})

export default axiosInstance
