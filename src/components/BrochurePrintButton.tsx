"use client";

export function BrochurePrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
    >
      Print / Save as PDF
    </button>
  );
}
