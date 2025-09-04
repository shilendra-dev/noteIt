import { Trash } from "lucide-react";

interface Note {
  id: string;
  title: string;
}

interface NotesListProps {
  notes: Note[];
  onDelete: (noteId: string) => void;
}

export default function NotesList({ notes, onDelete }: NotesListProps) {
  return (
    <div className="mt-6 w-full">
      <h1 className="text-lg sm:text-xl font-semibold mb-2">Notes</h1>
      <div className="space-y-2">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-md shadow-sm"
            >
              <h2 className="font-medium">{note.title}</h2>
              <Trash
                className="cursor-pointer hover:text-red-500"
                onClick={() => onDelete(note.id)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center sm:text-left">No notes found</p>
        )}
      </div>
    </div>
  );
}
