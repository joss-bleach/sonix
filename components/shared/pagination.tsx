"use client";
import { FunctionComponent } from "react";

// Utils
import { formUrlQuery } from "@/lib/utils";

// Hooks
import { useRouter, useSearchParams } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number | string;
  totalPages: number;
  urlParamName: string;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  page,
  totalPages,
  urlParamName,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOnClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => handleOnClick("prev")}
        disabled={Number(page) <= 1}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => handleOnClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};
