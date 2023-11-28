import axios from "axios";

const axiosNormal = axios.create({
    baseURL: 'https://inventi-sync-server.vercel.app',
})

const useAxiosNormal = () => {
    return axiosNormal;
};

export default useAxiosNormal;