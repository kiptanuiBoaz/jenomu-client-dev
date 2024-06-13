import axiosInstance from "./axios";
import axios from "./axios";

export const baseGet = async (url: string) => {
    const response = await axios.get(url)
    return response.data;
}


export const basePost = async (url: string, data: any) => {

    const response = await axiosInstance.post(url, data)

    return response.data;

}

export const basePatch = async (url: string, data: any) => {

    const response = await axiosInstance.patch(url, data)

    return response.data;

}

export const basePut = async (url: string, data: any) => {

    const response = await axiosInstance.put(url, data)

    return response.data;

}

export const baseDelete = async (url: string) => {

    const response = await axiosInstance.delete(url)

    return response.data;

}

export const baseUpload = async (url: string, data: any) => {
    const response = await axiosInstance.post(url, data);
    return response;
}