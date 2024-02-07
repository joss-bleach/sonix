import { FunctionComponent } from "react";
import Link from "next/link";
import { ChevronRight, Pencil } from "lucide-react";
import { auth } from "@clerk/nextjs";

import { IEvent } from "@/mongodb/database/models/event.model";
import { formatDateTime } from "@/lib/utils";

interface EventCardProps {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
}

export const EventCard: FunctionComponent<EventCardProps> = ({
  event,
  hasOrderLink,
  hidePrice,
}) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventOrganiser = userId === event.organiser._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />
      {isEventOrganiser && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded bg-white p-3 text-grey-500 shadow-sm transition-all">
          <Link href={`events/${event._id}/update`}>
            <Pencil size={18} />
          </Link>
        </div>
      )}
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        <div className="flex gap-2">
          {!hidePrice && (
            <span className="p-semibold-14 text-green-60 w-min rounded bg-green-100 px-4 py-1">
              {event.isFree ? "Free" : `£${event.price}`}
            </span>
          )}
          <p className="p-semibold-15 rounded bg-grey-500/10 px-4 py-1 text-grey-500">
            {event.category.name}
          </p>
        </div>
        <p className="p-medium-16 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organiser.firstName + " " + event.organiser.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="flex flex-row items-center gap-1 text-primary-500">
                Order details
                <ChevronRight size={18} />
              </p>
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};
