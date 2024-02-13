import { FunctionComponent } from "react";

import { IEvent } from "@/mongodb/database/models/event.model";

interface CollectionProps {
  data: IEvent[];
  emptyStateTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  collectionType?: "Events_Organised" | "My_Tickets" | "All_Events";
  urlParamName?: string;
}

// Components
import { EventCard } from "./event-card";
import { Pagination } from "./pagination";

export const Collection: FunctionComponent<CollectionProps> = ({
  data,
  emptyStateTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}) => {
  if (data && data.length <= 0) {
    return (
      <div className="flex-center wrpper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
        <h3 className="p-bold-20 md:h5-bold">{emptyStateTitle}</h3>
        <p className="p-regular-14">{emptyStateSubtext}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-10">
      <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {data.map((event) => {
          const hasOrderLink = collectionType === "Events_Organised";
          const hidePrice = collectionType === "My_Tickets";
          return (
            <li key={event._id} className="flex justify-center">
              <EventCard
                event={event}
                hasOrderLink={hasOrderLink}
                hidePrice={hidePrice}
              />
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          urlParamName={urlParamName!}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
