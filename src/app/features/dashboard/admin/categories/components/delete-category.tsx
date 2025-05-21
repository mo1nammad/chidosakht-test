import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "../api/use-delete-category";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { AxiosError } from "axios";

type AppProps = {
  categoryId: number | string;
  name: string;
};

export const DeleteCategoryDialog = ({ categoryId, name }: AppProps) => {
  const { mutateAsync: deleteCategoryFn } = useDeleteCategory(categoryId);
  const removeFn = () =>
    toast.promise(() => deleteCategoryFn(), {
      loading: (
        <div className="flex gap-x-4 items-center">
          <p className="text-sm"> در حال پردازش</p>
          <Loader className="animate-spin size-4" />
        </div>
      ),
      success: () => "حذف دسته بندی با موفقیت انجام شد",
      error: (err: AxiosError<string>) => err.response?.data,
      position: "top-center",
      className: "flex-row-reverse! gap-x-4!",
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"}>حذف دسته بندی</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            از حذف دسته بندی <span className="text-purple-600">{name}</span>{" "}
            اطمینان دارید
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            با این کار عضویت این کاربر از این نقش باطل می شود
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>لغو</AlertDialogCancel>
          <AlertDialogAction onClick={removeFn}>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
