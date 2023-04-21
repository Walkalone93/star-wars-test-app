export interface Pagination {
    next: string | null;
    prev: string | null;
    currentPage: number;
    totalPages: number;
}

export interface PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}