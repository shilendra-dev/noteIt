import { withAuth } from "../../lib/auth/withAuth";
import logoIcon from "../../assets/logo-ico.png";
import { useAuth } from "../../lib/auth/useAuth";
import CustomButton from "../../components/ui/atoms/CustomButton";
import Input from "../../components/ui/atoms/Input";
import { useForm } from "react-hook-form";
import { createNote, getNotes, deleteNote } from "../../api/note";
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
  } = useForm<NoteFormValues>({ defaultValues: { title: "" } });

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
    <div className="flex flex-col h-screen w-screen">
      {/* Header */}
      <div className="flex justify-between sm:flex-row w-full px-6 sm:px-10 lg:px-40 py-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <img src={logoIcon} alt="logo" className="w-5 h-5 sm:w-8 sm:h-8" />
          <h1 className="text-md sm:text-2xl font-semibold">Dashboard</h1>
        </div>
        <button className="underline text-blue-500 font-medium text-sm sm:text-lg hover:cursor-pointer">
          Sign out
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-0 items-center">
        {/* Welcome Card */}
        <div className="flex flex-col gap-4 shadow-xl border border-gray-200 rounded-lg mt-6 sm:mt-10 p-6 sm:p-10 w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            Welcome, {user?.name}!
          </h1>
          <p className="text-sm sm:text-lg text-center sm:text-left">
            Email: {user?.email}
          </p>
        </div>

        {/* Create note button */}
        <div className="flex w-full mt-6 sm:mt-10">
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
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center sm:text-left">
                No notes found
              </p>
            )}
          </div>
        </div>

        {/* Create note form (Modal) */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="flex justify-center items-center h-full px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 flex flex-col"
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
