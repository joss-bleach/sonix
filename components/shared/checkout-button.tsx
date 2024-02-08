"use client";
import { FunctionComponent } from "react";
import { useUser, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

// Types
import { IEvent } from "@/mongodb/database/models/event.model";

// Components
import { Button } from "@/components/ui/button";
import { Checkout } from "./checkout";

interface CheckoutButtonProps {
  event: IEvent;
}

export const CheckoutButton: FunctionComponent<CheckoutButtonProps> = ({
  event,
}) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const eventHasPassed = new Date(event.endDateTime) < new Date();

  if (eventHasPassed) {
    return (
      <p className="p-medium-16 p-2 text-[#F5624D]">This event is over.</p>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <Button asChild className="button rounded">
          <Link href="/sign-in">Get Tickets</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <Checkout event={event} userId={userId} />
      </SignedIn>
    </div>
  );
};
