export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type WithPagination = {
  meta: {
    currentPage: number;
    nextPage: number;
    prevPage: number;
    totalItems: number;
    totalPages: number;
  };
};
