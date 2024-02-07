import Image from "next/image";

// Types
import { SearchParamProps } from "@/types";

// Actions
import { getEventById } from "@/lib/actions/event.actions";

const EventDetailsPage = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);
  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          alt={`${event.title} poster.`}
          width={1000}
          height={1000}
          className="h-full min-h-[300xp] object-cover object-center"
        />
      </div>
    </section>
  );
};

export default EventDetailsPage;