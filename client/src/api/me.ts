import axiosInstance from "../lib/axiosInstance";

export const me = async () => {
    try {
        const response = await axiosInstance.get(`/auth/me`);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}