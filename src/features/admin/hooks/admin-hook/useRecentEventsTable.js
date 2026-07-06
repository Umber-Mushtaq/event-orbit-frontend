import { useEffect, useMemo, useState } from "react";

export const useRecentEventsTable = (
  rows = [],
  externalQuery = "",
  pageSize = 5,
  queryOverride = "",
) => {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const effectiveQuery = queryOverride || query;

  useEffect(() => {
    setPage(1);
  }, [externalQuery, effectiveQuery, rows]);

  const filteredRows = useMemo(() => {
    const normalized = `${externalQuery} ${effectiveQuery}`.trim().toLowerCase();
    const filtered = rows.filter((row) => {
      if (!normalized) return true;
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(normalized),
      );
    });

    return [...filtered].sort((left, right) => {
      const a = String(left[sortKey]).toLowerCase();
      const b = String(right[sortKey]).toLowerCase();

      if (a < b) return sortDirection === "asc" ? -1 : 1;
      if (a > b) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [externalQuery, query, queryOverride, rows, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  const setSort = (key) => {
    setPage(1);
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  };

  const goToPage = (nextPage) => {
    const safePage = Math.min(totalPages, Math.max(1, nextPage));
    setPage(safePage);
  };

  return {
    query,
    setQuery,
    sortKey,
    sortDirection,
    setSort,
    page,
    totalPages,
    pagedRows,
    goToPage,
  };
};
