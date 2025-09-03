import type { TypedFastifyInstance } from '@/types/fastify.js';
import { createNoteAPI } from './api/create-note.api.js';
import { getNotesAPI } from './api/get-notes.api.js';
import { deleteNoteAPI } from './api/delete-note.api.js';


export default async function notesRoutes(fastify: TypedFastifyInstance) {
    await fastify.register(createNoteAPI);
    await fastify.register(getNotesAPI);
    await fastify.register(deleteNoteAPI);
}