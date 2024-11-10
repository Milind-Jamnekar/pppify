"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/server/actions/products";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteProductAlertDialogContent({
  id,
}: {
  id: string;
}) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  return (
    <AlertDialogContent className="border-destructive">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            disabled={isDeletePending}
            isloading={isDeletePending}
            onClick={() => {
              startDeleteTransition(async () => {
                const data = await deleteProduct(id);
                if (data.message) {
                  if (data.error) {
                    toast.error("Error while deleting product");
                  } else {
                    toast.success("Product deleted successfully");
                  }
                }
              });
            }}
            variant="destructive"
          >
            Continue
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
