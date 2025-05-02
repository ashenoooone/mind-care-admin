export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type WithPaginationMeta = {
  meta: {
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
    totalItems: number;
    totalPages: number;
  };
};
