import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  total: number;
  perPage: number;
  current: number;
  onChange: (page: number) => void;
  maxButtons?: number;
};

const range = (start: number, end: number) => {
  const out = [] as number[];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  current,
  onChange,
  maxButtons = 5,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages === 1) return null;

  const handle = (p: number) => {
    const page = Math.max(1, Math.min(totalPages, p));
    if (page !== current) onChange(page);
  };

  // determine page window
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);

  const pages = range(start, end);

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        onClick={() => handle(current - 1)}
        disabled={current === 1}
        className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => handle(1)}
            className="h-9 min-w-[36px] rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700"
          >
            1
          </button>
          {start > 2 && <span className="px-2 text-sm text-slate-500">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handle(p)}
          aria-current={p === current ? "page" : undefined}
          className={`h-9 min-w-[36px] rounded-md border px-3 text-sm ${
            p === current
              ? "bg-[#004e27] text-white border-[#004e27]"
              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-sm text-slate-500">…</span>
          )}
          <button
            onClick={() => handle(totalPages)}
            className="h-9 min-w-[36px] rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handle(current + 1)}
        disabled={current === totalPages}
        className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
