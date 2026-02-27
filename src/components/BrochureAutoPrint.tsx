"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function BrochureAutoPrint() {
  const searchParams = useSearchParams();
  const shouldPrint = searchParams.get("download") === "1";

  useEffect(() => {
    if (!shouldPrint) {
      return;
    }

    const timeout = window.setTimeout(() => {
      window.print();
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [shouldPrint]);

  return null;
}
