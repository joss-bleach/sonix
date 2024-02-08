import Link from "next/link";
import { auth } from "@clerk/nextjs";

// Actions
import { getEventsByUser } from "@/lib/actions/event.actions";

// Components
import { Button } from "@/components/ui/button";
import { Collection } from "@/components/shared/collection";

const page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organisedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Your upcoming events
          </h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">View events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        {/* <Collection
          data={events?.data}
          emptyStateTitle="No upcoming events"
          emptyStateSubtext="You currently have no upcoming events."
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        /> */}
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Events you&apos;ve organised
          </h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/events/create/">Create an event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={organisedEvents?.data}
          emptyStateTitle="No created events"
          emptyStateSubtext="You have not created any events."
          collectionType="Events_Organised"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default page;
