import { Modal } from "@mui/material";
import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import { useForm } from "react-hook-form";

interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string }) => void;
}

export default function CreateNoteModal({ open, onClose, onSubmit }: CreateNoteModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ title: string }>({ defaultValues: { title: "" } });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-center items-center h-full px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
            <Input
              id="title"
              label="Title"
              size="medium"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title", { required: "Title is required" })}
            />
            <CustomButton type="submit" variant="contained" size="large" fullWidth>
              Save Note
            </CustomButton>
          </form>
        </div>
      </div>
    </Modal>
  );
}
