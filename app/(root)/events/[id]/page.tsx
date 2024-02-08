import Image from "next/image";
import { Calendar, Link, MapPin } from "lucide-react";

import { formatDateTime } from "@/lib/utils";

// Types
import { SearchParamProps } from "@/types";

// Actions
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";

// Components
import { Collection } from "@/components/shared/collection";
import { CheckoutButton } from "@/components/shared/checkout-button";

const page = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt={`${event.title} poster.`}
            width={1000}
            priority
            height={1000}
            className="h-full max-h-[70dvh] min-h-[300xp] object-cover object-center md:max-h-dvh"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "Free" : `£${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  Organised by{" "}
                  <span className="text-primary-500">
                    {event.organiser.firstName + " " + event.organiser.lastName}
                  </span>
                </p>
              </div>
            </div>
            <CheckoutButton event={event} />
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 md:gap-3">
                <Calendar size={24} className="text-[#F5624D]" />
                <div className="p-medium-16 flex flex-wrap items-center">
                  <p>{formatDateTime(event.startDateTime).dateOnly}</p>
                  <p className="ml-1">
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <span className="mx-1">-</span>
                  <p>{formatDateTime(event.endDateTime).dateOnly}</p>
                  <p className="ml-1">
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <MapPin size={24} className="text-[#F5624D]" />
                <p className="p-medium-16 ml-1">{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">Event details</p>
              <p className="p-medium-16">{event.description}</p>
              {event.url && (
                <p className="p-medium-16 flex items-center truncate text-primary-500">
                  <Link size={18} className="mr-1 text-primary-500" />
                  {event.url}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <Collection
          data={relatedEvents?.data}
          emptyStateTitle="No events found"
          emptyStateSubtext="There are no similar events at the moment. Come back again later."
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default page;
