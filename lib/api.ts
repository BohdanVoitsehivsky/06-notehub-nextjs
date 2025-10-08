import axios from "axios"
import type {  CreateNoteRequest, Note } from "@/types/note";
export type NoteFormValues = Pick<Note, "title" | "content" | "tag">;
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const API_URL = "https://notehub-public.goit.study/api/"


const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization:`Bearer ${token}`
    }
})

export interface FetchNotesResponse {

    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(page: number, perPage: number, search: string): Promise<FetchNotesResponse> {
    const{data} = await instance.get<FetchNotesResponse>("/notes", {
        params: {
          page,
          perPage,
          search  
        },
    });
 
    
    
    return data;

    
} 
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await instance.get<Note>(`/notes/${id}`);
  return response.data;
};

export async function createNote(note: NoteFormValues): Promise<Note> {
    const response = await instance.post<Note>("notes", {
        title: note.title,
        content: note.content,
        tag: note.tag,
    })
    return response.data;
    
}

export const updateNote = async (
  id: string,
  noteData: CreateNoteRequest
): Promise<Note> => {
  const response = await instance.patch<Note>(
    `/notes/${id}`,
    noteData
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const {data} = await instance.delete<Note>(`/notes/${id}`);
    return data
}

