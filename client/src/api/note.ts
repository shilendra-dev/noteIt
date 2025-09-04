import { apiCall } from "../utils/apiCall";

export const createNote = async (body: { title: string }) => {
    const data = await apiCall<{ id: string; title: string }>("post", "/notes", body);
    return data;
}

export const getNotes = async () => {
    const result = await apiCall<{ data: { notes: { id: string; userId: string; title: string }[]; message: string; } }>("get", "/notes");
    if (result.success) {
        const notes = result.data.data.notes;
        return notes;
    } else {
        console.error(result.error);
        return [];
    }
}

export const deleteNote = async (noteId: string) => {
    const data = await apiCall<{ message: string }>("delete", `/notes/${noteId}`);
    return data;
}