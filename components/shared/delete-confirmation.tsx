"use client";

import { FunctionComponent, useTransition } from "react";
import { Trash } from "lucide-react";

import { usePathname } from "next/navigation";

interface DeleteConfirmationProps {
  eventId: string;
}

// Components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Actions
import { deleteEvent } from "@/lib/actions/event.actions";

export const DeleteConfirmation: FunctionComponent<DeleteConfirmationProps> = ({
  eventId,
}) => {
  let [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash size={18} />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this event?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            You won&apos;t be able to undo this.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteEvent({ eventId, path: pathname });
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
