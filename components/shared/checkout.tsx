import { FunctionComponent, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

// Types
import { IEvent } from "@/mongodb/database/models/event.model";

// Components
import { Button } from "@/components/ui/button";

// Actions
import { checkoutOrder } from "@/lib/actions/order.actions";

interface CheckoutProps {
  event: IEvent;
  userId: string;
}

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const Checkout: FunctionComponent<CheckoutProps> = ({
  event,
  userId,
}) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast.message("Purchase successful", {
        description: `You're going to ${event.title}!`,
      });
    }

    if (query.get("canceled")) {
      toast.error("Purchase unsuccessful. Please try again.");
    }
  }, []);

  const handleOnCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={handleOnCheckout} method="post">
      <Button type="submit" role="link" className="button sm:w-fit">
        {event.isFree ? "Get tickets" : "Buy tickets"}
      </Button>
    </form>
  );
};
