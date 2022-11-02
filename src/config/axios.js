import axios from "axios";
import { baseurl } from "../utils/apiurls";

export const axiosInstance = axios.create({
    baseURL: baseurl
})