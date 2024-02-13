import Link from "next/link";
import Image from "next/image";

// Types
import { SearchParamProps } from "@/types";

// Actions
import { getAllEvents } from "@/lib/actions/event.actions";

// Components
import { Button } from "@/components/ui/button";
import { Collection } from "@/components/shared/collection";
import { Search } from "@/components/shared/search";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: page,
    limit: 6,
  });

  return (
    <main>
      <>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex flex-col justify-center gap-8">
              <h1 className="h1-bold">
                Create share, and experience extraordinary music events
              </h1>
              <p className="p-regular-20 md:p-regular-24">
                View our range of events to sell and secure tickets to diverse
                music experiences worldwide, all in one place.
              </p>
              <Button className="w-full rounded sm:w-fit" asChild size="lg">
                <Link href="#events">Explore</Link>
              </Button>
            </div>
            <Image
              src="/assets/images/hero.png"
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
              alt="A girl dancing."
              width={1000}
              height={1000}
              priority
            />
          </div>
        </section>
        <section
          id="events"
          className="wrapper my-8 flex flex-col gap-8 md:gap-12"
        >
          <h2 className="h2-bold">
            Experience <br />
            the best music events
          </h2>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search placeholder="Search events" />
          </div>
          <Collection
            data={events?.data}
            emptyStateTitle="No events found"
            emptyStateSubtext="There are no events at the moment. Come back again later."
            collectionType="All_Events"
            limit={6}
            page={1}
            totalPages={2}
          />
        </section>
      </>
    </main>
  );
};

export default Home;
