export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface PaginatedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
