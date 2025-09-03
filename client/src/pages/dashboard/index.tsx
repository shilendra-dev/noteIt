import { withAuth } from "../../lib/auth/withAuth";
import logoIcon from "../../assets/logo-ico.png";
import { useAuth } from "../../lib/auth/useAuth";
import CustomButton from "../../components/ui/atoms/CustomButton";
import Input from "../../components/ui/atoms/Input";
import { useForm } from "react-hook-form";
import { createNote } from "../../api/note";
import { getNotes } from "../../api/note";
import { deleteNote } from "../../api/note";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { Modal } from "@mui/material";

interface NoteFormValues {
  title: string;
}

interface Note {
  id: string;
  title: string;
}

function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NoteFormValues>({
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = async (data: NoteFormValues) => {
    try {
      await createNote(data);
      loadNotes();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const loadNotes = async () => {
    try {
      const resData = await getNotes();
      setNotes(resData.data.notes || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      console.log("Deleting note with ID: ", noteId);
      await deleteNote(noteId);
      loadNotes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen items-center">
      {/* Header */}
      <div className="flex w-full justify-between px-40 py-4 ">
        <div className="flex gap-2">
          <img src={logoIcon} alt="logo" />
          <h1 className="text-2xl">Dashboard</h1>
        </div>
        <button className="underline text-blue-500 font-medium">
          Sign out
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col w-4xl max-w-[80%] items-center">
        <div className="flex flex-col gap-4 shadow-xl border border-gray-200 rounded-lg mt-10 p-10 w-full">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
          <p className="text-lg">Email: {user?.email}</p>
        </div>

        {/* Create note button */}
        <div className="flex w-full mt-10">
          <CustomButton
            variant="contained"
            size="large"
            fullWidth
            onClick={() => setModalOpen(true)}
          >
            Create Note
          </CustomButton>
        </div>

        {/* Notes list */}
        <div className="mt-6 w-full">
          <h1 className="text-xl font-semibold mb-2">Notes</h1>
          <div className="space-y-2">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="flex justify-between p-4 border border-gray-200 rounded-md shadow-sm"
                >
                  <h2 className="font-medium">{note.title}</h2>
                  <Trash className="cursor-pointer hover:text-red-500" onClick={() => handleDeleteNote(note.id)}/>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notes found</p>
            )}
          </div>
        </div>

        {/* Create note form */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="flex justify-center items-center h-full">
            <div className="mt-6 w-xl max-w-md bg-gray-200 p-6 rounded-lg">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 flex flex-col gap-3"
              >
                <Input
                  id="title"
                  label="Title"
                  size="medium"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  {...register("title", { required: "Title is required" })}
                />
                <CustomButton
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Save Note
                </CustomButton>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

const ProtectedDashboardPage = withAuth(Dashboard);
export default ProtectedDashboardPage;
