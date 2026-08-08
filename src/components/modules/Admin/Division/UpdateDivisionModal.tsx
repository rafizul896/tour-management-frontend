import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUpdateDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Pencil } from "lucide-react";

interface Division {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

interface UpdateDivisionModalProps {
  division: Division;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateDivisionModal({
  division,
  open,
  onOpenChange,
}: UpdateDivisionModalProps) {
  const [image, setImage] = useState<File | null | string>(
    division?.thumbnail || null,
  );
  const [updateDivision] = useUpdateDivisionMutation();

  const form = useForm({
    defaultValues: {
      name: division.name,
      description: division.description || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    if (image) {
      formData.append("file", image);
    }

    try {
      const res = await updateDivision({
        id: division._id,
        data: formData,
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Division Updated");
      }
      onOpenChange(false);
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            id="update-division"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <SingleImageUploader
            initialImage={image as string}
            onChange={setImage}
          />
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="update-division">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
