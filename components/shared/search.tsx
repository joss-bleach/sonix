"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

// Hooks
import { useRouter, useSearchParams } from "next/navigation";

// Components
import { Input } from "@/components/ui/input";

interface SearchProps {
  placeholder?: string;
}

export const Search: FunctionComponent<SearchProps> = ({
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded bg-grey-50 px-4 py-2">
      <SearchIcon size={24} className="text-grey-500" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 placholder:text-grey-500 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};
