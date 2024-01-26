import Link from "next/link";
import Image from "next/image";

// Components
import { Button } from "@/components/ui/button";

const Home = () => {
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
            Trusted by <br />
            the best music events
          </h2>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            Search + Categories
          </div>
        </section>
      </>
    </main>
  );
};

export default Home;
