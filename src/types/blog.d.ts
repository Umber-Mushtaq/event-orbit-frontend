export interface PublicBlog {
  id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  content?: string;
  featureImage?: string;
  authorName?: string;
  authorAvatar?: string;
  readTime?: string;
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface PublicBlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PublicBlogListResponse {
  success: boolean;
  data: {
    items: PublicBlog[];
    pagination: PublicBlogPagination;
  };
}
