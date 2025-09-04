import { withAuth } from "../../lib/auth/withAuth";
import { useAuth } from "../../lib/auth/useAuth";
import { useState, useEffect } from "react";
import { createNote, getNotes, deleteNote } from "../../api/note";
import { signOut } from "../../api/auth";
import Header from "../../features/dashboard/Header";
import WelcomeCard from "../../features/dashboard/WelcomeCard";
import NotesList from "../../features/dashboard/Noteslist";
import CreateNoteModal from "../../features/dashboard/CreateNoteModal";
import CustomButton from "../../components/ui/atoms/CustomButton";

export default withAuth(function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<{ id: string; title: string }[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleCreateNote = async (data: { title: string }) => {
    try {
      await createNote(data);
      loadNotes();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header onSignOut={handleSignOut} />
      <div className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-0 items-center">
        <WelcomeCard name={user?.name} email={user?.email} />
        <div className="flex w-full mt-6 sm:mt-10">
          <CustomButton variant="contained" size="large" fullWidth onClick={() => setModalOpen(true)}>
            Create Note
          </CustomButton>
        </div>
        <NotesList notes={notes} onDelete={handleDeleteNote} />
        <CreateNoteModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateNote} />
      </div>
    </div>
  );
});