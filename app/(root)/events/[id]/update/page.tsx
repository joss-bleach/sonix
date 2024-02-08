import { auth } from "@clerk/nextjs";

interface UpdateEventParams {
  params: {
    id: string;
  };
}

// Components
import { EventForm } from "@/components/shared/event-form";
import { getEventById } from "@/lib/actions/event.actions";

const page = async ({ params: { id } }: UpdateEventParams) => {
  const event = await getEventById(id);
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update event details
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          event={event}
          eventId={event._id}
          userId={userId}
          type="Update"
        />
      </div>
    </>
  );
};

export default page;
