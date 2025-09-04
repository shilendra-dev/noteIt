import { Modal, IconButton } from "@mui/material";
import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string }) => void;
}

export default function CreateNoteModal({
  open,
  onClose,
  onSubmit,
}: CreateNoteModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ title: string }>({ defaultValues: { title: "" } });

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <div className="flex justify-center items-center h-full px-4">
        <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-xl font-semibold">Create Note</h1>
                <IconButton onClick={onClose} size="small">
                  <X className="text-gray-500 cursor-pointer" />
                </IconButton>
              </div>

              <p className="text-sm text-gray-500">
                Please enter a title for your note
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <Input
                id="title"
                label="Note Title"
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
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
