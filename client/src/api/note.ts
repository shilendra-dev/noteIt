import axiosInstance from "../lib/axiosInstance";

export const createNote = async (body: { title: string }) => {
    try {
        const response = await axiosInstance.post(`/notes`, body);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}

export const getNotes = async () => {
    try {
        const response = await axiosInstance.get(`/notes`);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}

export const deleteNote = async (noteId: string) => {
    try {
        const response = await axiosInstance.delete(`/notes/${noteId}`);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}
    